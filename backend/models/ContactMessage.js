const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactMessage = sequelize.define('ContactMessage', {
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
  
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  subject: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  
  status: {
    type: DataTypes.ENUM('new', 'read', 'replied', 'archived'),
    defaultValue: 'new'
  },
  
  priority: {
    type: DataTypes.ENUM('low', 'normal', 'high', 'urgent'),
    defaultValue: 'normal'
  },
  
  category: {
    type: DataTypes.ENUM('general', 'admission', 'complaint', 'suggestion', 'technical', 'other'),
    defaultValue: 'general'
  },
  
  source: {
    type: DataTypes.ENUM('website', 'email', 'phone', 'walk-in'),
    defaultValue: 'website'
  },
  
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  userAgent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  // Response tracking
  responses: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  
  // Admin notes
  adminNotes: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  
  // Assignment
  assignedTo: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  
  assignedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  
  // Resolution
  resolvedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  
  resolutionNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'contact_messages'
});

module.exports = ContactMessage;