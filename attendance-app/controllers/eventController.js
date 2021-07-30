const { eventDataAccess, attendanceDataAccess, MemberAttendance } = require('../dataAccess');
const moment = require('moment');

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
 * Validation method
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const validateEventRequestRequiredPayload = (req, res, next) => {
  const payload = req.body;

  const areAllPropsPresent = ['name', 'type', 'startDate', 'endDate']
    .every(requiredProp => requiredProp in payload);

  const areDatesValid = (moment(payload.startDate, 'YYYY-MM-DD', true).isValid() && moment(payload.endDate, 'YYYY-MM-DD', true).isValid()) &&
  (moment(payload.startDate, 'YYYY-MM-DD') < moment(payload.endDate, 'YYYY-MM-DD'));

  if (areAllPropsPresent) {
    if (areDatesValid) {
      return next();
    } else {
      next({
        status: '400',
        result: 'Validation error',
        message: 'Invalid date: Date should be in YYYY-MM-DD format and starDate < endDate'
      });
    }
  } else {
    next({
      status: '400',
      result: 'Validation error',
      message: 'name/type/startDate/endDate must be present in the payload'
    });
  }
};

const validateEventRequestExtraPayload = (req, res, next) => {
  const payload = req.body;
  const payloadPropNames = Object.keys(payload);
  const validPropNames = ['name', 'type', 'startDate', 'endDate'];

  const hasExtraProps = !payloadPropNames
    .every(payloadPropName => validPropNames.includes(payloadPropName));

  if (hasExtraProps) {
    return next({
      status: '400',
      result: 'Validation error',
      message: 'Request payload has extra properties'
    });
  }

  next();
};

/**
 * Inserts event
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const insertEvent = async (req, res, next) => {
  const payload = req.body;

  payload.membersAttendance = [];

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

  const hasNoMemberAttendance = event.membersAttendance.length === 0;

  if (event && hasNoMemberAttendance) {
    await eventDataAccess.delete(id);
    return res.sendStatus(200);
  }

  next({
    status: '400',
    result: 'Invalid request',
    message: 'Event has a member attendance. Unable to delete.'
  });
};

const searchByNameAndDate = async (req, res, next) => {
  const name = req.query.name;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  const areQueriesMissing = (name === '' || startDate === '' || startDate === '');

  console.log(name);

  if (areQueriesMissing) {
    return next({
      status: '400',
      result: 'Bad Request',
      message: 'Url query missing'
    });
  }

  const event = await eventDataAccess.getEventByNameAndDate(name, startDate, endDate);

  console.log(`Members length : ${event.length}`);

  if (event.length === 0) {
    return next({
      status: '404',
      result: 'Validation error',
      message: 'Event not found'
    });
  }

  res.send(event);
};

module.exports = {
  getAllEvents,
  getEventById,
  validateEventRequestRequiredPayload,
  validateEventRequestExtraPayload,
  insertEvent,
  updateEventById,
  deleteEventById,
  searchByNameAndDate
};
