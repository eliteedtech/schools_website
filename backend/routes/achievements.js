const express = require('express');
const { body, validationResult } = require('express-validator');
const { Achievement, User } = require('../models');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/achievements
// @desc    Get all achievements
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit = 50, offset = 0 } = req.query;
    
    const whereClause = { isPublished: true };
    
    if (category) {
      whereClause.category = category;
    }
    
    if (featured === 'true') {
      whereClause.isFeatured = true;
    }

    const achievements = await Achievement.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name']
        }
      ],
      order: [['achievementDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json(achievements);
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/achievements/:id
// @desc    Get single achievement
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.json(achievement);
  } catch (error) {
    console.error('Get achievement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/achievements
// @desc    Create new achievement
// @access  Private
router.post('/', auth, [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('achievementDate').isISO8601().withMessage('Valid achievement date is required'),
  body('category').optional().isIn(['academic', 'sports', 'competition', 'recognition', 'award', 'other'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      achievementDate,
      category,
      studentName,
      studentClass,
      position,
      competition,
      imageUrl,
      certificateUrl,
      isPublished,
      isFeatured
    } = req.body;

    const achievement = await Achievement.create({
      title,
      description,
      achievementDate,
      category: category || 'academic',
      studentName,
      studentClass,
      position,
      competition,
      imageUrl,
      certificateUrl,
      isPublished: isPublished !== undefined ? isPublished : true,
      isFeatured: isFeatured || false,
      createdBy: req.user.id
    });

    const achievementWithCreator = await Achievement.findByPk(achievement.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name']
        }
      ]
    });

    res.status(201).json({
      message: 'Achievement created successfully',
      achievement: achievementWithCreator
    });

  } catch (error) {
    console.error('Create achievement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/achievements/:id
// @desc    Update achievement
// @access  Private
router.put('/:id', auth, [
  body('title').optional().trim().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('achievementDate').optional().isISO8601().withMessage('Valid achievement date is required'),
  body('category').optional().isIn(['academic', 'sports', 'competition', 'recognition', 'award', 'other'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const achievement = await Achievement.findByPk(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    const {
      title,
      description,
      achievementDate,
      category,
      studentName,
      studentClass,
      position,
      competition,
      imageUrl,
      certificateUrl,
      isPublished,
      isFeatured
    } = req.body;

    await achievement.update({
      title: title || achievement.title,
      description: description !== undefined ? description : achievement.description,
      achievementDate: achievementDate || achievement.achievementDate,
      category: category || achievement.category,
      studentName: studentName !== undefined ? studentName : achievement.studentName,
      studentClass: studentClass !== undefined ? studentClass : achievement.studentClass,
      position: position !== undefined ? position : achievement.position,
      competition: competition !== undefined ? competition : achievement.competition,
      imageUrl: imageUrl !== undefined ? imageUrl : achievement.imageUrl,
      certificateUrl: certificateUrl !== undefined ? certificateUrl : achievement.certificateUrl,
      isPublished: isPublished !== undefined ? isPublished : achievement.isPublished,
      isFeatured: isFeatured !== undefined ? isFeatured : achievement.isFeatured
    });

    const updatedAchievement = await Achievement.findByPk(achievement.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name']
        }
      ]
    });

    res.json({
      message: 'Achievement updated successfully',
      achievement: updatedAchievement
    });

  } catch (error) {
    console.error('Update achievement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/achievements/:id
// @desc    Delete achievement
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const achievement = await Achievement.findByPk(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    await achievement.destroy();

    res.json({ message: 'Achievement deleted successfully' });

  } catch (error) {
    console.error('Delete achievement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;