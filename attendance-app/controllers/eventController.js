const { eventsDataAccess } = require('../dataAccess');
/**
 * https://jsdoc.app/
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Gets all events
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getAllEvents = async (req, res, next) => {
  const events = await eventsDataAccess.getAll();

  res.send(events);
};

/**
 * Gets user by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getEventById = async (req, res, next) => {
  const id = req.params.id;

  const event = await eventsDataAccess.getById(id);

  res.send(event);
};

/**
 * Inserts event
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const insertEvent = async (req, res, next) => {
  const payload = req.body;

  const event = await eventsDataAccess.insert(payload);

  res.status(201).send(event);
};

/**
 * Deletes event
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteEventById = async (req, res, next) => {
  const id = req.params.id;

  const event = await eventsDataAccess.getById(id);

  if (event) {
    await eventsDataAccess.delete(id);
  }

  res.sendStatus(200);
};

module.exports = {
  getAllEvents,
  getEventById,
  insertEvent,
  deleteEventById
};
