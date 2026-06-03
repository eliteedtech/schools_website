const express = require('express');
const { Gallery } = require('../models');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/gallery
// @desc    Get all gallery items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(items);
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/gallery
// @desc    Create new gallery item
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const item = await Gallery.create({
      ...req.body,
      uploaded_by: req.user.id
    });
    res.status(201).json(item);
  } catch (error) {
    console.error('Create gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Gallery.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    await item.destroy();
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;