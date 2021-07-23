const { attendanceDataAccess } = require('../dataAccess');

/**
 * https://jsdoc.app/
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Gets all attendances
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getAllAttendances = async (req, res, next) => {
  const attendances = await attendanceDataAccess.getAll();

  res.send(attendances);
};

/**
   * Inserts attendance
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
const insertAttendance = async (req, res, next) => {
  const payload = req.body;

  const attendance = await attendanceDataAccess.insert(payload);

  res.status(201).send(attendance);
};

/**
     * Updates attendance by id
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
const updateAttendanceById = async (req, res, next) => {
  const id = req.params.id;
  const payload = req.body;

  const attendance = await attendanceDataAccess.getById(id);

  if (attendance) {
    await attendanceDataAccess.update(id, payload);
  }

  res.sendStatus(200);
};

/**
   * Deletes attendance
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
const deleteAttendanceById = async (req, res, next) => {
  const id = req.params.id;

  const member = await attendanceDataAccess.getById(id);

  if (member) {
    await attendanceDataAccess.delete(id);
  }

  res.sendStatus(200);
};

module.exports = {
  getAllAttendances,
  insertAttendance,
  updateAttendanceById,
  deleteAttendanceById
};
