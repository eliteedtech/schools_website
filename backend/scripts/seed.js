const { sequelize, User, School, Application, Gallery, Staff, Pricing, ContactMessage, Event, Statistic } = require('../models');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Sync database (recreate tables)
    await sequelize.sync({ alter: true });
    console.log('🗑️  Database tables synchronized');

    // Create Super Admin
    const superAdmin = await User.create({
      name: 'Super Admin',
      email: 'superadmin@schoolcms.com',
      password: 'password123',
      role: 'super_admin',
      emailVerified: true,
      profile: {
        position: 'System Administrator',
        bio: 'System super administrator with full access to all schools and features.'
      }
    });
    console.log('👤 Created Super Admin');

    // Create Dr. Kabiru Gwarzo Academy (based on your existing website)
    const gwarzoAcademy = await School.create({
      name: 'Dr. Kabiru Gwarzo Academy',
      slug: 'dr-kabiru-gwarzo-academy',
      basicInfo: {
        fullName: 'Dr. Kabiru Gwarzo Academy & Tahfeez',
        motto: 'Strive for Excellence',
        description: 'A reputable educational institution committed to nurturing young minds through quality education, strong moral values, and academic excellence.',
        address: 'No.296 Layin Road Safety, Maikalwa Naibawa Zaria Road, Kumbotso LGA, Kano-Nigeria',
        phone: '+234 XXX XXX XXXX',
        email: 'info@dkgacademy.com',
        website: 'https://dkgacademy.com',
        establishedYear: 2010
      },
      theme: {
        primaryColor: '#1e3a8a',
        secondaryColor: '#fbbf24',
        accentColor: '#ffffff',
        backgroundColor: '#f9fafb',
        textColor: '#1f2937',
        fontFamily: 'Inter, sans-serif',
        headingFont: 'Inter, sans-serif',
        borderRadius: '0.5rem',
        spacing: 'normal'
      },
      branding: {
        logo: '/assets/school.png',
        socialMedia: {
          facebook: 'https://facebook.com/dkgacademy',
          twitter: 'https://twitter.com/dkgacademy',
          instagram: 'https://instagram.com/dkgacademy'
        }
      },
      content: {
        hero: {
          title: 'Welcome to Dr. Kabiru Gwarzo Academy',
          subtitle: '& Tahfeez - "Strive for Excellence"',
          description: 'Building knowledge, discipline, and excellence for a brighter future.',
          backgroundImage: '/assets/hero-bg.jpg',
          ctaText: 'Apply Now',
          ctaLink: '/apply'
        },
        about: {
          title: 'About Our School',
          description: 'We are committed to nurturing the mind, body, and spirit of every student through holistic education.',
          mission: 'To provide quality education that develops well-rounded individuals who excel academically while maintaining strong moral foundations.',
          vision: 'To be a leading educational institution that produces future leaders with strong Islamic values and academic excellence.',
          values: [
            'Excellence in Education',
            'Islamic Values Integration',
            'Innovation and Technology',
            'Character Development',
            'Community Service'
          ],
          principalMessage: 'At Dr. Kabiru Gwarzo Academy, we are committed to nurturing young minds through a perfect blend of modern education and Islamic values.',
          principalName: 'Adamu Muhammad Alkali',
          principalImage: '/assets/principal.png'
        },
        programs: [
          {
            name: 'Pre-Nursery',
            description: 'Foundation building for young learners',
            icon: '👶',
            levels: ['Pre-Nursery 1', 'Pre-Nursery 2'],
            schedule: 'Mon-Thu: 7:30am-12:30pm, Fri: 7:30am-12:00pm',
            features: ['Play-based learning', 'Basic literacy', 'Social skills development']
          },
          {
            name: 'Primary School',
            description: 'Comprehensive primary education',
            icon: '📚',
            levels: ['Primary 1-5'],
            schedule: 'Mon-Thu: 7:30am-1:15pm, Fri: 7:30am-12:00pm',
            features: ['Core subjects', 'Islamic studies', 'Extracurricular activities']
          },
          {
            name: 'Junior Secondary',
            description: 'Preparing students for senior secondary',
            icon: '🎓',
            levels: ['JSS 1-3'],
            schedule: 'Mon-Thu: 7:30am-1:15pm, Fri: 7:30am-12:00pm',
            features: ['Broad curriculum', 'Career guidance', 'Leadership development']
          },
          {
            name: 'Senior Secondary',
            description: 'Specialized streams for university preparation',
            icon: '🔬',
            levels: ['SS 1-3'],
            schedule: 'Mon-Thu: 7:30am-1:15pm, Fri: 7:30am-12:00pm',
            features: ['Science stream', 'Arts stream', 'Commercial stream']
          },
          {
            name: 'Islamiyya',
            description: 'Comprehensive Islamic education',
            icon: '☪️',
            levels: ['All Levels'],
            schedule: 'Mon-Thu: 2:30pm-5:00pm',
            features: ['Quran studies', 'Islamic jurisprudence', 'Arabic language']
          },
          {
            name: 'Tahfeez',
            description: 'Quran memorization program',
            icon: '📖',
            levels: ['All Levels'],
            schedule: 'Mon-Thu: 9:00am-5:00pm',
            features: ['Quran memorization', 'Tajweed', 'Islamic character building']
          }
        ],
        stats: [
          {
            label: 'Students',
            value: 500,
            description: 'Enrolled across all programs',
            icon: 'users'
          },
          {
            label: 'Years Experience',
            value: 15,
            description: 'Of educational excellence',
            icon: 'award'
          },
          {
            label: 'Programs',
            value: 6,
            description: 'Comprehensive curriculum',
            icon: 'book'
          },
          {
            label: 'Graduates',
            value: 50,
            description: 'Success stories annually',
            icon: 'graduation-cap'
          }
        ],
        events: [
          {
            title: '2025/2026 Session e-Application Form',
            description: 'Get your application form for the upcoming academic session',
            date: new Date('2025-03-01'),
            location: 'Online',
            status: 'upcoming'
          },
          {
            title: '2024/2025 Session Registration',
            description: 'Registration for current session is still ongoing',
            date: new Date('2024-09-01'),
            location: 'School Campus',
            status: 'ongoing'
          },
          {
            title: 'Employment Opportunities',
            description: 'Academic Staff, NYSC Corps Members and IT Students needed',
            date: new Date('2025-01-15'),
            location: 'School Campus',
            status: 'upcoming'
          }
        ]
      },
      settings: {
        isActive: true,
        allowRegistrations: true,
        seo: {
          title: 'Dr. Kabiru Gwarzo Academy & Tahfeez - Strive for Excellence',
          description: 'Quality Islamic education with modern curriculum. Pre-Nursery to SS3 with Science, Arts & Commercial streams plus Islamiyya and Tahfeez programs.',
          keywords: ['Islamic school', 'Kano education', 'Tahfeez', 'quality education', 'Nigeria school']
        },
        contactEmail: 'info@dkgacademy.com',
        adminEmail: 'admin@dkgacademy.com',
        features: {
          gallery: true,
          applications: true,
          results: true,
          events: true,
          testimonials: true
        }
      },
      createdBy: superAdmin.id
    });
    console.log('🏫 Created Dr. Kabiru Gwarzo Academy');

    // Create School Admin
    const schoolAdmin = await User.create({
      name: 'School Administrator',
      email: 'admin@dkgacademy.com',
      password: 'admin123',
      role: 'admin',
      emailVerified: true,
      schools: [{
        school: gwarzoAcademy.id,
        role: 'owner',
        permissions: [
          'manage_content',
          'manage_applications',
          'manage_gallery',
          'manage_staff',
          'manage_pricing',
          'manage_settings',
          'view_analytics'
        ]
      }],
      profile: {
        position: 'School Administrator',
        bio: 'Administrator for Dr. Kabiru Gwarzo Academy with full management access.'
      }
    });
    console.log('👤 Created School Admin');

    // Create Staff Members
    const staffMembers = [
      {
        schoolId: gwarzoAcademy.id,
        personalInfo: {
          firstName: 'Adamu',
          lastName: 'Alkali',
          middleName: 'Muhammad',
          title: 'Mr.',
          gender: 'male'
        },
        contact: {
          phone: '+234 XXX XXX XXXX',
          email: 'principal@dkgacademy.com',
          address: 'Kano, Nigeria'
        },
        professional: {
          position: 'Principal',
          department: 'administration',
          employmentType: 'full-time',
          dateOfJoining: new Date('2015-01-01'),
          qualifications: [
            {
              degree: 'M.Ed in Educational Administration',
              institution: 'Ahmadu Bello University',
              year: 2010,
              grade: 'Distinction'
            }
          ]
        },
        media: {
          profileImage: '/assets/principal.png'
        },
        displaySettings: {
          showOnWebsite: true,
          featured: true,
          displayOrder: 1,
          bio: 'Experienced educational leader committed to academic excellence and character development.'
        },
        createdBy: schoolAdmin.id
      },
      {
        schoolId: gwarzoAcademy.id,
        personalInfo: {
          firstName: 'Ummi',
          lastName: 'Abubakar',
          title: 'Mrs.',
          gender: 'female'
        },
        contact: {
          phone: '+234 XXX XXX XXXX',
          email: 'bursar@dkgacademy.com',
          address: 'Kano, Nigeria'
        },
        professional: {
          position: 'School Bursar',
          department: 'administration',
          employmentType: 'full-time',
          dateOfJoining: new Date('2016-03-01')
        },
        media: {
          profileImage: '/assets/bursar.png'
        },
        displaySettings: {
          showOnWebsite: true,
          displayOrder: 2,
          bio: 'Financial administrator ensuring transparent and efficient school operations.'
        },
        createdBy: schoolAdmin.id
      }
    ];

    for (const staffData of staffMembers) {
      await Staff.create(staffData);
    }
    console.log('👥 Created Staff Members');

    // Create Pricing Structure
    const currentYear = new Date().getFullYear();
    const academicYear = `${currentYear}/${currentYear + 1}`;

    await Pricing.create({
      schoolId: gwarzoAcademy.id,
      academicYear,
      feeStructure: [
        {
          program: {
            level: 'pre-nursery',
            type: 'academy-only',
            grade: 'Pre-Nursery 1-2'
          },
          fees: {
            tuition: 85000,
            registration: 5000,
            development: 1500,
            genderDifferential: {
              boys: 0,
              girls: 2500
            }
          },
          status: 'active',
          enrollmentStatus: 'in-take',
          paymentTerms: {
            installments: {
              allowed: true,
              numberOfInstallments: 3
            }
          }
        },
        {
          program: {
            level: 'jss',
            type: 'academy-islamiyya',
            grade: 'JSS 1-3'
          },
          fees: {
            tuition: 115000,
            registration: 5000,
            development: 1700,
            genderDifferential: {
              boys: 0,
              girls: 2500
            }
          },
          status: 'active',
          enrollmentStatus: 'in-take'
        }
      ],
      settings: {
        currency: 'NGN',
        currencySymbol: '₦',
        showOnWebsite: true,
        publicNote: 'All fees are annual. Payment plans available upon request.',
        paymentMethods: [
          {
            name: 'Bank Transfer',
            enabled: true,
            details: {
              bankName: 'First Bank Nigeria',
              accountName: 'Dr. Kabiru Gwarzo Academy',
              accountNumber: '1234567890'
            }
          }
        ]
      },
      createdBy: schoolAdmin.id
    });
    console.log('💰 Created Pricing Structure');

    // Create Sample Applications
    const sampleApplications = [
      {
        schoolId: gwarzoAcademy.id,
        student: {
          name: 'Ahmad Ibrahim',
          dateOfBirth: new Date('2015-05-15'),
          gender: 'male',
          applyingFor: {
            level: 'primary',
            program: 'academy-islamiyya',
            grade: 'Primary 1'
          }
        },
        guardian: {
          name: 'Ibrahim Ahmad',
          relationship: 'father',
          phone: '+234 XXX XXX XXXX',
          email: 'ibrahim.ahmad@email.com',
          address: 'No. 123 Ahmadu Bello Way, Kano'
        },
        status: 'approved',
        academicYear
      },
      {
        schoolId: gwarzoAcademy.id,
        student: {
          name: 'Fatima Usman',
          dateOfBirth: new Date('2012-08-20'),
          gender: 'female',
          applyingFor: {
            level: 'jss',
            program: 'academy-islamiyya',
            grade: 'JSS 1'
          }
        },
        guardian: {
          name: 'Usman Abdullahi',
          relationship: 'father',
          phone: '+234 XXX XXX XXXX',
          email: 'usman.abdullahi@email.com',
          address: 'No. 456 Zaria Road, Kano'
        },
        status: 'pending',
        academicYear
      }
    ];

    for (const appData of sampleApplications) {
      await Application.create(appData);
    }
    console.log('📝 Created Sample Applications');

    // Create Sample Gallery Items
    const galleryItems = [
      {
        schoolId: gwarzoAcademy.id,
        title: 'Students in the Classroom',
        description: 'Active learning environment with engaged students',
        type: 'image',
        media: {
          url: '/assets/students.png',
          filename: 'students.png',
          format: 'png',
          size: 250000
        },
        category: 'students',
        tags: ['classroom', 'learning', 'students'],
        featured: true,
        showOnHomepage: true,
        displayOrder: 1,
        uploadedBy: schoolAdmin.id
      },
      {
        schoolId: gwarzoAcademy.id,
        title: 'Cultural Day Celebration',
        description: 'Students showcasing Nigerian cultural heritage',
        type: 'video',
        media: {
          url: 'https://www.youtube.com/embed/B8OSkSdo6R0',
          filename: 'cultural-day.mp4',
          format: 'mp4',
          size: 15000000,
          duration: 180
        },
        thumbnail: {
          url: 'https://img.youtube.com/vi/B8OSkSdo6R0/hqdefault.jpg'
        },
        category: 'cultural',
        tags: ['culture', 'celebration', 'heritage'],
        featured: true,
        showOnHomepage: false,
        displayOrder: 4,
        uploadedBy: schoolAdmin.id
      }
    ];

    for (const galleryData of galleryItems) {
      await Gallery.create(galleryData);
    }
    console.log('🖼️  Created Gallery Items');

    // Create Statistics
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
      await Statistic.create(statData);
    }
    console.log('📊 Created Statistics');

    // Create Events/Announcements
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
        createdBy: schoolAdmin.id
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
        createdBy: schoolAdmin.id
      },
      {
        title: 'Employment Opportunities',
        description: 'Academic Staff, NYSC Corps Members and IT Students needed',
        status: 'AVAILABLE',
        priority: 'medium',
        startDate: new Date('2025-01-15'),
        isPublished: true,
        displayOrder: 3,
        createdBy: schoolAdmin.id
      }
    ];

    for (const eventData of events) {
      await Event.create(eventData);
    }
    console.log('📅 Created Events/Announcements');

    // Create Template School
    await School.create({
      name: 'School Template',
      slug: 'school-template',
      isTemplate: true,
      basicInfo: {
        fullName: 'Your School Name',
        motto: 'Your School Motto',
        description: 'Your school description goes here.',
        address: 'Your school address',
        phone: 'Your phone number',
        email: 'info@yourschool.com'
      },
      theme: {
        primaryColor: '#1e3a8a',
        secondaryColor: '#fbbf24',
        accentColor: '#ffffff',
        backgroundColor: '#f9fafb',
        textColor: '#1f2937',
        fontFamily: 'Inter, sans-serif',
        headingFont: 'Inter, sans-serif',
        borderRadius: '0.5rem',
        spacing: 'normal'
      },
      content: {
        hero: {
          title: 'Welcome to Your School',
          subtitle: 'Excellence in Education',
          description: 'Building tomorrow\'s leaders today.',
          ctaText: 'Apply Now',
          ctaLink: '/apply'
        },
        about: {
          title: 'About Our School',
          description: 'We are committed to providing quality education.',
          mission: 'To provide excellent education that develops well-rounded individuals.',
          vision: 'To be a leading educational institution in our community.'
        },
        programs: [
          {
            name: 'Primary School',
            description: 'Foundation education for young learners',
            icon: '📚',
            levels: ['Grade 1-6'],
            schedule: 'Mon-Fri: 8:00am-2:00pm'
          }
        ]
      },
      settings: {
        isActive: true,
        allowRegistrations: true,
        features: {
          gallery: true,
          applications: true,
          results: true,
          events: true,
          testimonials: true
        }
      },
      createdBy: superAdmin.id
    });
    console.log('📋 Created Template School');

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`👤 Users: ${await User.count()}`);
    console.log(`🏫 Schools: ${await School.count()}`);
    console.log(`👥 Staff: ${await Staff.count()}`);
    console.log(`📝 Applications: ${await Application.count()}`);
    console.log(`🖼️  Gallery Items: ${await Gallery.count()}`);
    console.log(`💰 Pricing Records: ${await Pricing.count()}`);
    console.log(`📊 Statistics: ${await Statistic.count()}`);
    console.log(`📅 Events: ${await Event.count()}`);

    console.log('\n🔑 Login Credentials:');
    console.log('Super Admin: superadmin@schoolcms.com / password123');
    console.log('School Admin: admin@dkgacademy.com / admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the seed function
seedDatabase();