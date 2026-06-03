const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pricing = sequelize.define('Pricing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  // School reference
  schoolId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'schools',
      key: 'id'
    }
  },
  
  // Academic Year
  academicYear: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  // Fee Structure
  feeStructure: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  
  // General Settings
  settings: {
    type: DataTypes.JSON,
    defaultValue: {
      currency: 'NGN',
      currencySymbol: '₦',
      paymentMethods: [],
      refundPolicy: {
        enabled: false,
        conditions: null,
        refundablePercentage: 0,
        processingFee: 0
      },
      showOnWebsite: true,
      publicNote: null,
      lastUpdated: null
    }
  },
  
  // Audit Trail
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  
  lastUpdatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  
  // Version Control
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  
  previousVersions: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  tableName: 'pricing',
  hooks: {
    beforeCreate: (pricing) => {
      if (!pricing.academicYear) {
        const year = new Date().getFullYear();
        pricing.academicYear = `${year}/${year + 1}`;
      }
    },
    beforeUpdate: (pricing) => {
      if (pricing.changed()) {
        // Store previous version
        const previousVersions = pricing.previousVersions || [];
        previousVersions.push({
          version: pricing.version,
          data: pricing.dataValues,
          updatedAt: new Date(),
          updatedBy: pricing.lastUpdatedBy
        });
        
        pricing.previousVersions = previousVersions;
        pricing.version += 1;
        
        if (pricing.settings) {
          pricing.settings = {
            ...pricing.settings,
            lastUpdated: new Date()
          };
        }
      }
    }
  }
});

// Instance methods
Pricing.prototype.calculateFee = function(level, type, gender = 'boys', discounts = []) {
  const feeItem = this.feeStructure.find(f => 
    f.program.level === level && 
    f.program.type === type && 
    f.status === 'active'
  );
  
  if (!feeItem) return null;
  
  // Calculate base fee
  let totalFee = Object.entries(feeItem.fees).reduce((sum, [key, value]) => {
    if (key === 'genderDifferential') return sum;
    if (typeof value === 'number') return sum + value;
    return sum;
  }, 0);
  
  // Add gender differential
  totalFee += feeItem.fees.genderDifferential?.[gender] || 0;
  
  // Apply discounts
  let discountAmount = 0;
  discounts.forEach(discount => {
    if (discount.isPercentage) {
      discountAmount += (totalFee * discount.value) / 100;
    } else {
      discountAmount += discount.value;
    }
  });
  
  return {
    baseFee: totalFee,
    discountAmount,
    finalFee: totalFee - discountAmount,
    breakdown: feeItem.fees,
    paymentTerms: feeItem.paymentTerms
  };
};

Pricing.prototype.getInstallmentSchedule = function(level, type, totalAmount) {
  const feeItem = this.feeStructure.find(f => 
    f.program.level === level && 
    f.program.type === type && 
    f.status === 'active'
  );
  
  if (!feeItem || !feeItem.paymentTerms.installments.allowed) {
    return null;
  }
  
  const { numberOfInstallments, installmentSchedule } = feeItem.paymentTerms.installments;
  
  if (installmentSchedule && installmentSchedule.length > 0) {
    return installmentSchedule.map(inst => ({
      ...inst,
      amount: inst.percentage ? (totalAmount * inst.percentage) / 100 : inst.amount
    }));
  }
  
  // Generate equal installments if no custom schedule
  const installmentAmount = Math.round(totalAmount / numberOfInstallments);
  const schedule = [];
  
  for (let i = 1; i <= numberOfInstallments; i++) {
    schedule.push({
      installmentNumber: i,
      amount: i === numberOfInstallments ? 
        totalAmount - (installmentAmount * (numberOfInstallments - 1)) : // Adjust last installment for rounding
        installmentAmount,
      percentage: Math.round((installmentAmount / totalAmount) * 100)
    });
  }
  
  return schedule;
};

module.exports = Pricing;