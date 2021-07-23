const express = require('express');
const { attendanceController } = require('../controllers');

const attendanceRouter = express.Router();

// GET methods
attendanceRouter.get('/', attendanceController.getAllAttendances);

// POST methods
attendanceRouter.post('/',
  attendanceController.insertAttendance
);

// PUT methods
attendanceRouter.put('/:id', attendanceController.updateAttendanceById);

// DELETE methods
attendanceRouter.delete('/:id', attendanceController.deleteAttendanceById);

module.exports = attendanceRouter;
