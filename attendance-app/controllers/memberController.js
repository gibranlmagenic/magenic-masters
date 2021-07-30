const { memberDataAccess } = require('../dataAccess');
const moment = require('moment');

/**
 * https://jsdoc.app/
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Gets all members
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getAllMembers = async (req, res, next) => {
  const members = await memberDataAccess.getAll();

  res.send(members);
};

/**
   * Gets user by id
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
const getMemberById = async (req, res, next) => {
  const id = req.params.id;

  const member = await memberDataAccess.getById(id);

  res.send(member);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const validateMemberRequestRequiredPayload = (req, res, next) => {
  const payload = req.body;

  const areAllPropsPresent = ['name', 'status']
    .every(requiredProp => requiredProp in payload);

  if (areAllPropsPresent) {
    return next();
  }
  next({
    status: '400',
    result: 'Validation error',
    message: 'name and status must be present in the payload'
  });
};

const validateMemberRequestExtraPayload = (req, res, next) => {
  const payload = req.body;
  const payloadPropNames = Object.keys(payload);
  const validPropNames = ['name', 'status', 'joinedDate'];

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
   * Inserts member
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
const insertMember = async (req, res, next) => {
  const payload = req.body;
  let isDateValid = true;

  if (payload.joinedDate) {
    isDateValid = moment(payload.joinedDate, 'YYYY-MM-DD', true).isValid() && (moment(payload.joinedDate, 'YYYY-MM-DD') < moment.now);
    console.log(isDateValid);
  }

  // const isStatusValid = req.body.status
  console.log(isDateValid);
  if (!isDateValid) {
    return next({
      status: '400',
      result: 'Validation error',
      message: 'Please check joinedDate input'
    });
  }

  const member = await memberDataAccess.insert(payload);
  res.status(201).send(member);
};

/**
   * Updates member by id
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
const updateMemberById = async (req, res, next) => {
  const id = req.params.id;
  const payload = req.body;

  const member = await memberDataAccess.getById(id);

  if (member) {
    await memberDataAccess.update(id, payload);
  }

  res.sendStatus(200);
};

/**
   * Deletes member
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
const deleteMemberById = async (req, res, next) => {
  const id = req.params.id;

  const member = await memberDataAccess.getById(id);

  if (member) {
    await memberDataAccess.delete(id);
  }

  res.sendStatus(200);
};

const searchByNameAndStatus = async (req, res, next) => {
  const name = req.query.name;
  const status = req.query.status;

  console.log(name + status);

  const member = await memberDataAccess.searchByNameAndStatus(name, status);

  console.log(`Members length : ${member.length}`);

  if (member.length === 0) {
    return res.status(400).send('Member not found.');
  } else {
    res.send(member);
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  validateMemberRequestRequiredPayload,
  validateMemberRequestExtraPayload,
  insertMember,
  updateMemberById,
  deleteMemberById,
  searchByNameAndStatus
};
