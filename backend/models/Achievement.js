const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Achievement = sequelize.define('Achievement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  achievementDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'achievement_date'
  },
  category: {
    type: DataTypes.ENUM('academic', 'sports', 'competition', 'recognition', 'award', 'other'),
    defaultValue: 'academic'
  },
  studentName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'student_name'
  },
  studentClass: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'student_class'
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true // e.g., "1st Place", "Winner", "Participant"
  },
  competition: {
    type: DataTypes.STRING,
    allowNull: true // Name of competition/event
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'image_url'
  },
  certificateUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'certificate_url'
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_published'
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_featured'
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'created_by',
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  tableName: 'achievements',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      fields: ['achievement_date']
    },
    {
      fields: ['category']
    },
    {
      fields: ['is_published']
    },
    {
      fields: ['is_featured']
    }
  ]
});

module.exports = Achievement;