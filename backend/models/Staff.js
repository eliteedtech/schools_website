const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Staff = sequelize.define('Staff', {
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
  
  // Personal Information
  personalInfo: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  
  // Contact Information
  contact: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  
  // Professional Information
  professional: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  
  // Media
  media: {
    type: DataTypes.JSON,
    defaultValue: {
      profileImage: null,
      documents: []
    }
  },
  
  // Display Settings
  displaySettings: {
    type: DataTypes.JSON,
    defaultValue: {
      showOnWebsite: true,
      showContact: false,
      displayOrder: 0,
      featured: false,
      bio: null,
      achievements: []
    }
  },
  
  // Status
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended', 'terminated'),
    defaultValue: 'active'
  },
  
  // Performance (optional)
  performance: {
    type: DataTypes.JSON,
    defaultValue: {
      ratings: [],
      trainings: []
    }
  },
  
  // System Information
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
  }
}, {
  tableName: 'staff',
  hooks: {
    beforeCreate: async (staff) => {
      if (!staff.professional.employeeId) {
        const year = new Date().getFullYear();
        const count = await Staff.count({
          where: { schoolId: staff.schoolId }
        });
        
        staff.professional = {
          ...staff.professional,
          employeeId: `EMP${year}${String(count + 1).padStart(4, '0')}`
        };
      }
    }
  }
});

// Virtual for full name
Staff.prototype.getFullName = function() {
  const { firstName, middleName, lastName, title } = this.personalInfo;
  let name = '';
  
  if (title) name += `${title} `;
  name += firstName;
  if (middleName) name += ` ${middleName}`;
  name += ` ${lastName}`;
  
  return name.trim();
};

// Virtual for years of service
Staff.prototype.getYearsOfService = function() {
  if (!this.professional.dateOfJoining) return 0;
  
  const endDate = this.professional.dateOfLeaving || new Date();
  const startDate = new Date(this.professional.dateOfJoining);
  const diffTime = Math.abs(endDate - startDate);
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
  
  return diffYears;
};

// Instance methods
Staff.prototype.updateStatus = async function(newStatus, updatedBy) {
  return this.update({
    status: newStatus,
    lastUpdatedBy: updatedBy
  });
};

module.exports = Staff;