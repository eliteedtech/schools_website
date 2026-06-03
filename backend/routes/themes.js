const express = require('express');
const { School } = require('../models');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/themes/:schoolId
// @desc    Get school theme
// @access  Private
router.get('/:schoolId', auth, async (req, res) => {
  try {
    const school = await School.findByPk(req.params.schoolId);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Mock theme data
    const theme = {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#F59E0B',
        background: '#FFFFFF',
        text: '#1F2937'
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter'
      },
      layout: {
        headerStyle: 'modern',
        footerStyle: 'simple'
      }
    };

    res.json(theme);
  } catch (error) {
    console.error('Get theme error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/themes/:schoolId
// @desc    Update school theme
// @access  Private
router.put('/:schoolId', auth, async (req, res) => {
  try {
    const school = await School.findByPk(req.params.schoolId);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Mock theme update
    res.json({ message: 'Theme updated successfully' });
  } catch (error) {
    console.error('Update theme error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;