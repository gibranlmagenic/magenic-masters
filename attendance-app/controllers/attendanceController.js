const { attendanceDataAccess, memberDataAccess, eventDataAccess, MemberAttendance, eventAttendance } = require('../dataAccess');

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
    event: {
      id: event.id,
      name: event.name,
      type: event.type
    },
    member: {
      id: member.id,
      name: member.name,
      status: member.status
    },
    timeIn: payload.timeIn,
    timeOut: payload.timeOut
  };

  const attendance = await attendanceDataAccess.insert(attendancePayload);

  const memAttData = {
    _id: attendance.id,
    member: attendance.member,
    timeIn: attendance.timeIn,
    timeOut: attendance.timeOut
  };

  console.log(memAttData);

  const eventAttData = {
    _id: attendance.id,
    event: attendance.event,
    timeIn: attendance.timeIn,
    timeOut: attendance.timeOut
  };

  event.membersAttendance.push(memAttData);
  member.eventsAttendance.push(eventAttData);

  await eventDataAccess.update(attendance.event.id, event);
  await memberDataAccess.update(attendance.member.id, member);

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
