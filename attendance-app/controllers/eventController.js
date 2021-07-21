const { eventDataAccess } = require('../dataAccess');

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
  const events = await eventDataAccess.getAll();

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

  const event = await eventDataAccess.getById(id);

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

  const event = await eventDataAccess.insert(payload);

  res.status(201).send(event);
};

/**
 * Updates event by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateEventById = async (req, res, next) => {
  const id = req.params.id;
  const payload = req.body;

  const event = await eventDataAccess.getById(id);

  if (event) {
    await eventDataAccess.update(id, payload);
  }

  res.sendStatus(200);
};

/**
 * Deletes event
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteEventById = async (req, res, next) => {
  const id = req.params.id;

  const event = await eventDataAccess.getById(id);

  if (event) {
    await eventDataAccess.delete(id);
  }

  res.sendStatus(200);
};

module.exports = {
  getAllEvents,
  getEventById,
  insertEvent,
  updateEventById,
  deleteEventById
};
