const express = require('express');
const { eventController } = require('../controllers');

const router = express.Router();

// GET methods
router.get('/', eventController.getAllEvents);
router.get('/event/:id', eventController.getEventById);

// POST methods
router.post('/',
  eventController.insertEvent
);

// DELETE methods
router.delete('/event/:id', eventController.deleteEventById);

module.exports = router;
