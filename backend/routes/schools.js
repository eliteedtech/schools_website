const express = require('express');
const { School } = require('../models');
const { auth, superAdminOnly } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/schools
// @desc    Get all schools (Super Admin only)
// @access  Private
router.get('/', auth, superAdminOnly, async (req, res) => {
  try {
    const schools = await School.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(schools);
  } catch (error) {
    console.error('Get schools error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/schools
// @desc    Create new school (Super Admin only)
// @access  Private
router.post('/', auth, superAdminOnly, async (req, res) => {
  try {
    const school = await School.create({
      ...req.body,
      created_by: req.user.id
    });
    res.status(201).json(school);
  } catch (error) {
    console.error('Create school error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/schools/:id
// @desc    Update school (Super Admin only)
// @access  Private
router.put('/:id', auth, superAdminOnly, async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    await school.update(req.body);
    res.json(school);
  } catch (error) {
    console.error('Update school error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/schools/:id
// @desc    Delete school (Super Admin only)
// @access  Private
router.delete('/:id', auth, superAdminOnly, async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    await school.destroy();
    res.json({ message: 'School deleted successfully' });
  } catch (error) {
    console.error('Delete school error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;