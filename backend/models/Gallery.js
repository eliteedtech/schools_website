const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gallery = sequelize.define('Gallery', {
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
  
  // Media Information
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  // Media Type
  type: {
    type: DataTypes.ENUM('image', 'video'),
    allowNull: false
  },
  
  // File Information
  media: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  
  // Thumbnail (for videos)
  thumbnail: {
    type: DataTypes.JSON,
    allowNull: true
  },
  
  // Categorization
  category: {
    type: DataTypes.ENUM('events', 'facilities', 'students', 'staff', 'activities', 'graduation', 'sports', 'cultural', 'academic', 'other'),
    defaultValue: 'other'
  },
  
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  
  // Event Information (if applicable)
  event: {
    type: DataTypes.JSON,
    allowNull: true
  },
  
  // Display Settings
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  
  showOnHomepage: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  
  // Status
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    defaultValue: 'published'
  },
  
  // Metadata
  uploadedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  
  // SEO
  altText: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  caption: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  // Analytics
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  
  // Comments (optional feature)
  comments: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  tableName: 'gallery'
});

// Instance methods
Gallery.prototype.incrementViews = async function() {
  return this.increment('views');
};

Gallery.prototype.toggleLike = async function(increment = true) {
  if (increment) {
    return this.increment('likes');
  } else {
    return this.decrement('likes');
  }
};

// Virtual for file size in human readable format
Gallery.prototype.getSizeFormatted = function() {
  if (!this.media.size) return null;
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(this.media.size) / Math.log(1024));
  return Math.round(this.media.size / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

module.exports = Gallery;