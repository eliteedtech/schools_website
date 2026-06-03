const express = require('express');
const { Staff } = require('../models');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/staff
// @desc    Get all staff members
// @access  Public
router.get('/', async (req, res) => {
  try {
    const staff = await Staff.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(staff);
  } catch (error) {
    console.error('Get staff error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/staff
// @desc    Create new staff member
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const staffMember = await Staff.create({
      ...req.body,
      created_by: req.user.id
    });
    res.status(201).json(staffMember);
  } catch (error) {
    console.error('Create staff member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/staff/:id
// @desc    Update staff member
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const staffMember = await Staff.findByPk(req.params.id);
    if (!staffMember) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    await staffMember.update(req.body);
    res.json(staffMember);
  } catch (error) {
    console.error('Update staff member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/staff/:id
// @desc    Delete staff member
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const staffMember = await Staff.findByPk(req.params.id);
    if (!staffMember) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    await staffMember.destroy();
    res.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error('Delete staff member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;