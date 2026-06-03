const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
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
  
  // Application ID (auto-generated)
  applicationId: {
    type: DataTypes.STRING,
    unique: true
  },
  
  // Student Information
  student: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  
  // Guardian Information
  guardian: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  
  // Application Status
  status: {
    type: DataTypes.ENUM('pending', 'under_review', 'approved', 'rejected', 'waitlisted'),
    defaultValue: 'pending'
  },
  
  // Documents
  documents: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  
  // Payment Information
  payment: {
    type: DataTypes.JSON,
    defaultValue: {
      feeAmount: null,
      paymentStatus: 'pending',
      paymentMethod: null,
      transactionId: null,
      paidAmount: 0,
      paymentDate: null
    }
  },
  
  // Review Information
  review: {
    type: DataTypes.JSON,
    defaultValue: {
      reviewedBy: null,
      reviewedAt: null,
      notes: null,
      score: null,
      interviewScheduled: null,
      interviewNotes: null
    }
  },
  
  // Additional Information
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  source: {
    type: DataTypes.STRING,
    defaultValue: 'website'
  },
  
  submittedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  
  // Academic Year
  academicYear: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // Foreign keys
  reviewedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'applications',
  hooks: {
    beforeCreate: async (application) => {
      if (!application.applicationId) {
        const year = new Date().getFullYear();
        const count = await Application.count({
          where: {
            schoolId: application.schoolId,
            academicYear: application.academicYear
          }
        });
        
        application.applicationId = `APP${year}${String(count + 1).padStart(4, '0')}`;
      }
      
      if (!application.academicYear) {
        const year = new Date().getFullYear();
        application.academicYear = `${year}/${year + 1}`;
      }
    }
  }
});

// Instance methods
Application.prototype.updateStatus = async function(newStatus, reviewerId, notes) {
  const updateData = {
    status: newStatus,
    review: {
      ...this.review,
      reviewedBy: reviewerId,
      reviewedAt: new Date(),
      notes: notes || this.review.notes
    }
  };
  
  return this.update(updateData);
};

// Virtual for student age
Application.prototype.getStudentAge = function() {
  if (!this.student.dateOfBirth) return null;
  
  const today = new Date();
  const birthDate = new Date(this.student.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

module.exports = Application;