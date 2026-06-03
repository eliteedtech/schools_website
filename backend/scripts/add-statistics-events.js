const { sequelize, User, Statistic, Event } = require('../models');
require('dotenv').config();

const addStatisticsAndEvents = async () => {
  try {
    console.log('🌱 Adding Statistics and Events...');

    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Get admin user
    const admin = await User.findOne({ where: { email: 'admin@dkgacademy.com' } });
    if (!admin) {
      console.log('❌ Admin user not found');
      return;
    }

    // Create Statistics (only if they don't exist)
    const statistics = [
      {
        key: 'students_enrolled',
        value: '500+',
        label: 'Students',
        description: 'Enrolled across all programs',
        displayOrder: 1
      },
      {
        key: 'years_experience',
        value: '15+',
        label: 'Years Experience',
        description: 'Of educational excellence',
        displayOrder: 2
      },
      {
        key: 'programs_offered',
        value: '6+',
        label: 'Programs',
        description: 'Comprehensive curriculum',
        displayOrder: 3
      },
      {
        key: 'graduates_annually',
        value: '50+',
        label: 'Graduates',
        description: 'Success stories annually',
        displayOrder: 4
      }
    ];

    for (const statData of statistics) {
      const [stat, created] = await Statistic.findOrCreate({
        where: { key: statData.key },
        defaults: statData
      });
      if (created) {
        console.log(`✅ Created statistic: ${statData.key}`);
      } else {
        console.log(`ℹ️  Statistic already exists: ${statData.key}`);
      }
    }

    // Create Events/Announcements (only if they don't exist)
    const events = [
      {
        title: '2025/2026 Session e-Application Form',
        description: 'Get your application form for the upcoming academic session',
        status: 'NOW ON SALE',
        priority: 'high',
        startDate: new Date('2025-03-01'),
        endDate: new Date('2025-06-30'),
        isPublished: true,
        displayOrder: 1,
        createdBy: admin.id
      },
      {
        title: '2024/2025 Session Registration',
        description: 'Registration for current session is still ongoing',
        status: 'ONGOING',
        priority: 'high',
        startDate: new Date('2024-09-01'),
        endDate: new Date('2025-02-28'),
        isPublished: true,
        displayOrder: 2,
        createdBy: admin.id
      },
      {
        title: 'Employment Opportunities',
        description: 'Academic Staff, NYSC Corps Members and IT Students needed',
        status: 'AVAILABLE',
        priority: 'medium',
        startDate: new Date('2025-01-15'),
        isPublished: true,
        displayOrder: 3,
        createdBy: admin.id
      }
    ];

    for (const eventData of events) {
      const [event, created] = await Event.findOrCreate({
        where: { title: eventData.title },
        defaults: eventData
      });
      if (created) {
        console.log(`✅ Created event: ${eventData.title}`);
      } else {
        console.log(`ℹ️  Event already exists: ${eventData.title}`);
      }
    }

    console.log('\n✅ Statistics and Events added successfully!');
    console.log('\n📊 Summary:');
    console.log(`📊 Statistics: ${await Statistic.count()}`);
    console.log(`📅 Events: ${await Event.count()}`);

  } catch (error) {
    console.error('❌ Error adding data:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the function
addStatisticsAndEvents();