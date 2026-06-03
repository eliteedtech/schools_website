const express = require('express');
const { body, validationResult } = require('express-validator');
const { Event, User } = require('../models');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/events
// @desc    Get all events/announcements
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { status, priority, limit = 50, offset = 0 } = req.query;
    
    const whereClause = { isPublished: true };
    
    if (status) {
      whereClause.status = status;
    }
    
    if (priority) {
      whereClause.priority = priority;
    }

    const events = await Event.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name']
        }
      ],
      order: [
        ['displayOrder', 'ASC'],
        ['priority', 'DESC'], // high, medium, low
        ['createdAt', 'DESC']
      ],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/events
// @desc    Create new event/announcement
// @access  Private
router.post('/', auth, [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('status').optional().isIn(['NOW ON SALE', 'ONGOING', 'AVAILABLE', 'CLOSED', 'COMING SOON']),
  body('priority').optional().isIn(['high', 'medium', 'low'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      status,
      priority,
      startDate,
      endDate,
      link,
      imageUrl,
      isPublished,
      displayOrder
    } = req.body;

    const event = await Event.create({
      title,
      description,
      status: status || 'AVAILABLE',
      priority: priority || 'medium',
      startDate,
      endDate,
      link,
      imageUrl,
      isPublished: isPublished !== undefined ? isPublished : true,
      displayOrder: displayOrder || 0,
      createdBy: req.user.id
    });

    const eventWithCreator = await Event.findByPk(event.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name']
        }
      ]
    });

    res.status(201).json({
      message: 'Event created successfully',
      event: eventWithCreator
    });

  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/events/:id
// @desc    Update event/announcement
// @access  Private
router.put('/:id', auth, [
  body('title').optional().trim().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('description').optional().trim().isLength({ min: 1 }).withMessage('Description cannot be empty'),
  body('status').optional().isIn(['NOW ON SALE', 'ONGOING', 'AVAILABLE', 'CLOSED', 'COMING SOON']),
  body('priority').optional().isIn(['high', 'medium', 'low'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const event = await Event.findByPk(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const {
      title,
      description,
      status,
      priority,
      startDate,
      endDate,
      link,
      imageUrl,
      isPublished,
      displayOrder
    } = req.body;

    await event.update({
      title: title || event.title,
      description: description || event.description,
      status: status || event.status,
      priority: priority || event.priority,
      startDate: startDate !== undefined ? startDate : event.startDate,
      endDate: endDate !== undefined ? endDate : event.endDate,
      link: link !== undefined ? link : event.link,
      imageUrl: imageUrl !== undefined ? imageUrl : event.imageUrl,
      isPublished: isPublished !== undefined ? isPublished : event.isPublished,
      displayOrder: displayOrder !== undefined ? displayOrder : event.displayOrder
    });

    const updatedEvent = await Event.findByPk(event.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name']
        }
      ]
    });

    res.json({
      message: 'Event updated successfully',
      event: updatedEvent
    });

  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.destroy();

    res.json({ message: 'Event deleted successfully' });

  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;