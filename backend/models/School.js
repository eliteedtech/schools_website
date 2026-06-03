const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const School = sequelize.define('School', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isLowercase: true
    }
  },
  domain: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  
  // Basic Information
  basicInfo: {
    type: DataTypes.JSON,
    defaultValue: {
      fullName: null,
      motto: null,
      description: null,
      address: null,
      phone: null,
      email: null,
      website: null,
      establishedYear: null
    }
  },

  // Theme Configuration
  theme: {
    type: DataTypes.JSON,
    defaultValue: {
      primaryColor: '#1e3a8a',
      secondaryColor: '#fbbf24',
      accentColor: '#ffffff',
      backgroundColor: '#f9fafb',
      textColor: '#1f2937',
      fontFamily: 'Inter, sans-serif',
      headingFont: 'Inter, sans-serif',
      borderRadius: '0.5rem',
      spacing: 'normal',
      customCSS: null
    }
  },

  // Branding
  branding: {
    type: DataTypes.JSON,
    defaultValue: {
      logo: null,
      favicon: null,
      headerLogo: null,
      footerLogo: null,
      socialMedia: {
        facebook: null,
        twitter: null,
        instagram: null,
        linkedin: null,
        youtube: null
      }
    }
  },

  // Content Sections
  content: {
    type: DataTypes.JSON,
    defaultValue: {
      hero: {
        title: null,
        subtitle: null,
        description: null,
        backgroundImage: null,
        ctaText: null,
        ctaLink: null
      },
      about: {
        title: null,
        description: null,
        mission: null,
        vision: null,
        values: [],
        principalMessage: null,
        principalName: null,
        principalImage: null
      },
      programs: [],
      stats: [],
      testimonials: [],
      events: []
    }
  },

  // Settings
  settings: {
    type: DataTypes.JSON,
    defaultValue: {
      isActive: true,
      allowRegistrations: true,
      maintenanceMode: false,
      seo: {
        title: null,
        description: null,
        keywords: [],
        ogImage: null
      },
      contactEmail: null,
      adminEmail: null,
      features: {
        gallery: true,
        applications: true,
        results: true,
        events: true,
        testimonials: true
      }
    }
  },

  // Template Information
  templateId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'schools',
      key: 'id'
    }
  },
  isTemplate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  
  // Ownership
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  
  // Subscription (for future use)
  subscription: {
    type: DataTypes.JSON,
    defaultValue: {
      plan: 'free',
      expiresAt: null,
      isActive: true
    }
  }
}, {
  tableName: 'schools',
  hooks: {
    beforeCreate: (school) => {
      if (!school.slug && school.name) {
        school.slug = school.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
      }
    },
    beforeUpdate: (school) => {
      if (school.changed('name') && !school.slug) {
        school.slug = school.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
      }
    }
  }
});

// Virtual for full URL
School.prototype.getUrl = function() {
  return this.domain || `${this.slug}.schoolcms.com`;
};

module.exports = School;