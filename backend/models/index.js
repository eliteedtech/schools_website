const sequelize = require('../config/database');
const User = require('./User');
const School = require('./School');
const Gallery = require('./Gallery');
const ContactMessage = require('./ContactMessage');
const Event = require('./Event');
const Achievement = require('./Achievement');
const Statistic = require('./Statistic');

// Define associations
User.hasMany(Gallery, { foreignKey: 'uploaded_by', as: 'uploadedGallery' });
Gallery.belongsTo(User, { foreignKey: 'uploaded_by', as: 'uploader' });

User.hasMany(ContactMessage, { foreignKey: 'assigned_to', as: 'assignedMessages' });
ContactMessage.belongsTo(User, { foreignKey: 'assigned_to', as: 'assignee' });

User.hasMany(Event, { foreignKey: 'created_by', as: 'createdEvents' });
Event.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

User.hasMany(Achievement, { foreignKey: 'created_by', as: 'createdAchievements' });
Achievement.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

User.hasMany(Statistic, { foreignKey: 'updated_by', as: 'updatedStatistics' });
Statistic.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

module.exports = {
  sequelize,
  User,
  School,
  Gallery,
  ContactMessage,
  Event,
  Achievement,
  Statistic
};