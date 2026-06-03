const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Statistic = sequelize.define('Statistic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isIn: [['students_enrolled', 'years_experience', 'programs_offered', 'graduates_annually', 'teachers', 'facilities']]
    }
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'display_order'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'updated_by',
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  tableName: 'statistics',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      fields: ['key'],
      unique: true
    },
    {
      fields: ['display_order']
    },
    {
      fields: ['is_active']
    }
  ]
});

module.exports = Statistic;