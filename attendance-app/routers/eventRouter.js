const express = require('express');
const { eventController } = require('../controllers');

const eventRouter = express.Router();

// GET methods
eventRouter.get('/', eventController.getAllEvents);
eventRouter.get('/event/:id', eventController.getEventById);

// POST methods
eventRouter.post('/',
  eventController.validateEventRequestRequiredPayload,
  eventController.insertEvent
);

// PUT methods
eventRouter.put('/event/:id', eventController.updateEventById);

// DELETE methods
eventRouter.delete('/event/:id', eventController.deleteEventById);

module.exports = eventRouter;
