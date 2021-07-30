const express = require('express');
const { eventController } = require('../controllers');

const eventRouter = express.Router();

// GET methods
eventRouter.get('/', eventController.getAllEvents);
eventRouter.get('/event/:id', eventController.getEventById);
eventRouter.get('/search', eventController.searchByNameAndDate);

// POST methods
eventRouter.post('/',
  eventController.validateEventRequestRequiredPayload,
  eventController.validateEventRequestRequiredPayload,
  eventController.insertEvent
);

eventRouter.use((err, req, res, next) => {
  next(err);
});

// PUT methods
eventRouter.put('/event/:id',
  eventController.validateEventRequestRequiredPayload,
  eventController.validateEventRequestRequiredPayload,
  eventController.updateEventById);

// DELETE methods
eventRouter.delete('/event/:id', eventController.deleteEventById);

module.exports = eventRouter;
