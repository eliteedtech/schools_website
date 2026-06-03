const express = require('express');
const { ContactMessage } = require('../models');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(messages);
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/contact
// @desc    Create new contact message
// @access  Public
router.post('/', async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    console.error('Create contact message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/contact/:id
// @desc    Update contact message status
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const message = await ContactMessage.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.update(req.body);
    res.json(message);
  } catch (error) {
    console.error('Update contact message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;