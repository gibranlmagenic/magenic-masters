const { userDataAccess } = require('../dataAccess');

/**
 * https://jsdoc.app/
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Gets all users
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getAllUsers = async (req, res, next) => {
  const users = await userDataAccess.getAll();

  res.send(users);
};

/**
 * Gets user by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getUserById = async (req, res, next) => {
  const id = req.params.id;

  const user = await userDataAccess.getById(id);

  res.send(user);
};

/**
 * Gets user by email
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getUserByEmail = async (req, res, next) => {
  const email = req.params.emailAddress;

  const user = await userDataAccess.getUserByEmailAddress(email);

  res.send(user);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const validateRequestRequiredPayload = (req, res, next) => {
  const payload = req.body;

  const areAllPropsPresent = ['userName', 'emailAddress', 'firstName', 'lastName']
    .every(requiredProp => requiredProp in payload);

  if (areAllPropsPresent) {
    return next();
  }

  res.status(400).send('userName/emailAddress/firstName/lastName must be present in the payload');
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const validateRequestExtraPayload = (req, res, next) => {
  const payload = req.body;
  const payloadPropNames = Object.keys(payload);
  const validPropNames = ['userName', 'emailAddress', 'firstName', 'lastName'];

  const hasExtraProps = !payloadPropNames
    .every(payloadPropName => validPropNames.includes(payloadPropName));

  if (hasExtraProps) {
    return res.status(400).send('Request payload has extra properties');
  }

  next();
};

/**
 * Inserts user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const insertUser = async (req, res, next) => {
  const payload = req.body;

  const user = await userDataAccess.insert(payload);

  res.status(201).send(user);
};

/**
 * Updates user by userName
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateUserByUserName = async (req, res, next) => {
  console.log('updateUserByUserName');
  const userName = req.params.userName;
  const payload = req.body;

  const user = await userDataAccess.getUserByUserName(userName);
  await userDataAccess.update(user.id, payload);

  res.sendStatus(200);
};

/**
 * Deletes user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteUserByUserName = async (req, res, next) => {
  const userName = req.params.userName;

  const user = await userDataAccess.getUserByUserName(userName);

  await userDataAccess.delete(user.id);

  res.sendStatus(200);
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  validateRequestRequiredPayload,
  validateRequestExtraPayload,
  insertUser,
  updateUserByUserName,
  deleteUserByUserName
};
