const express = require('express');
const { Application } = require('../models');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/applications
// @desc    Get all applications
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const applications = await Application.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/applications
// @desc    Create new application
// @access  Public
router.post('/', async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/applications/:id
// @desc    Update application status
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await application.update(req.body);
    res.json(application);
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;