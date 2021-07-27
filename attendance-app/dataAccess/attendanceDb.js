const DataAccess = require('./db');

class AttendanceDataAccess extends DataAccess {
  constructor () {
    super('attendance');
  }

  async getByEventId (eventId) {
    const attendance = await this.getByAny({
      propName: 'eventId',
      propValue: eventId
    });

    return attendance;
  }

  async getByMemberId (memberId) {
    const attendance = await this.getByAny({
      propName: 'memberId',
      propValue: memberId
    });

    return attendance;
  }
}

module.exports = new AttendanceDataAccess();
