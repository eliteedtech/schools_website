const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/content
// @desc    Get website content
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Mock content data
    const content = {
      hero: {
        title: 'Dr. Kabiru Gwarzo Academy',
        subtitle: 'Excellence in Islamic Education',
        description: 'Nurturing young minds with quality Islamic education and modern learning approaches.'
      },
      about: {
        title: 'About Our School',
        description: 'We are committed to providing quality education.',
        mission: 'To provide excellent education.',
        vision: 'To be a leading educational institution.'
      }
    };
    res.json(content);
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/content
// @desc    Update website content
// @access  Private
router.put('/', auth, async (req, res) => {
  try {
    // Mock update - in real implementation, save to database
    res.json({ message: 'Content updated successfully' });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;