const express = require('express');
const { Pricing } = require('../models');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/pricing
// @desc    Get all pricing plans
// @access  Public
router.get('/', async (req, res) => {
  try {
    const plans = await Pricing.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(plans);
  } catch (error) {
    console.error('Get pricing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/pricing
// @desc    Create new pricing plan
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const plan = await Pricing.create({
      ...req.body,
      created_by: req.user.id
    });
    res.status(201).json(plan);
  } catch (error) {
    console.error('Create pricing plan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/pricing/:id
// @desc    Update pricing plan
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const plan = await Pricing.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Pricing plan not found' });
    }

    await plan.update(req.body);
    res.json(plan);
  } catch (error) {
    console.error('Update pricing plan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/pricing/:id
// @desc    Delete pricing plan
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const plan = await Pricing.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Pricing plan not found' });
    }

    await plan.destroy();
    res.json({ message: 'Pricing plan deleted successfully' });
  } catch (error) {
    console.error('Delete pricing plan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;