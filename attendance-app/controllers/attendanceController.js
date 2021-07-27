const { attendanceDataAccess, memberDataAccess, eventDataAccess, MemberAttendance } = require('../dataAccess');

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
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const validateAttendanceRequestRequiredPayload = (req, res, next) => {
  const payload = req.body;

  const areAllPropsPresent = ['timeIn']
    .every(requiredProp => requiredProp in payload);

  if (areAllPropsPresent) {
    return next();
  }

  res.status(400).send('timeIn must be present in the payload');
};

/**
   * Inserts attendance
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
const insertAttendance = async (req, res, next) => {
  const payload = req.body;

  const event = await eventDataAccess.getById(payload.eventId);
  const member = await memberDataAccess.getById(payload.memberId);

  const attendancePayload = {
    event: event,
    member: member,
    timeIn: payload.timeIn,
    timeOut: payload.timeOut
  };

  const attendance = await attendanceDataAccess.insert(attendancePayload);

  // const memberAtt = new MemberAttendance(member, attendance.timeIn, attendance.timeOut);
  // await eventDataAccess.update(attendance.event.id, memberAtt);

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
  validateAttendanceRequestRequiredPayload,
  insertAttendance,
  updateAttendanceById,
  deleteAttendanceById
};
