const express = require('express');
const { body, validationResult } = require('express-validator');
const { Statistic, User } = require('../models');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/statistics
// @desc    Get all statistics
// @access  Public
router.get('/', async (req, res) => {
  try {
    const statistics = await Statistic.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC'], ['createdAt', 'ASC']],
      include: [
        {
          model: User,
          as: 'updater',
          attributes: ['id', 'name']
        }
      ]
    });

    res.json(statistics);
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/statistics/:key
// @desc    Update statistic by key
// @access  Private
router.put('/:key', auth, [
  body('value').trim().isLength({ min: 1 }).withMessage('Value is required'),
  body('label').optional().trim().isLength({ min: 1 }).withMessage('Label cannot be empty'),
  body('description').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { key } = req.params;
    const { value, label, description } = req.body;

    const statistic = await Statistic.findOne({ where: { key } });
    
    if (!statistic) {
      return res.status(404).json({ message: 'Statistic not found' });
    }

    await statistic.update({
      value,
      label: label || statistic.label,
      description: description !== undefined ? description : statistic.description,
      updatedBy: req.user.id
    });

    const updatedStatistic = await Statistic.findOne({
      where: { key },
      include: [
        {
          model: User,
          as: 'updater',
          attributes: ['id', 'name']
        }
      ]
    });

    res.json({
      message: 'Statistic updated successfully',
      statistic: updatedStatistic
    });

  } catch (error) {
    console.error('Update statistic error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/statistics/bulk
// @desc    Update multiple statistics
// @access  Private
router.put('/bulk', auth, [
  body('statistics').isArray().withMessage('Statistics must be an array'),
  body('statistics.*.key').isIn(['students_enrolled', 'years_experience', 'programs_offered', 'graduates_annually', 'teachers', 'facilities']).withMessage('Invalid statistic key'),
  body('statistics.*.value').trim().isLength({ min: 1 }).withMessage('Value is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { statistics } = req.body;
    const updatedStats = [];

    for (const stat of statistics) {
      const statistic = await Statistic.findOne({ where: { key: stat.key } });
      
      if (statistic) {
        await statistic.update({
          value: stat.value,
          label: stat.label || statistic.label,
          description: stat.description !== undefined ? stat.description : statistic.description,
          updatedBy: req.user.id
        });
        updatedStats.push(statistic);
      }
    }

    const allStatistics = await Statistic.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']],
      include: [
        {
          model: User,
          as: 'updater',
          attributes: ['id', 'name']
        }
      ]
    });

    res.json({
      message: 'Statistics updated successfully',
      statistics: allStatistics
    });

  } catch (error) {
    console.error('Bulk update statistics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;