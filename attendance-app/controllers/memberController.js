const { memberDataAccess } = require('../dataAccess');

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
   * Inserts member
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
const insertMember = async (req, res, next) => {
  const payload = req.body;

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

module.exports = {
  getAllMembers,
  getMemberById,
  insertMember,
  updateMemberById,
  deleteMemberById
};
