const DataAccess = require('./db');

class EventDataAccess extends DataAccess {
  constructor (memberAttendance) {
    super('events');
    this.memberAttendance = memberAttendance;
  }

  async getEventByNameAndDate (eventName, startDate, endDate) {
    const event = await this.getEventByCriteria(eventName, startDate, endDate);

    return event;
  }
}

module.exports = new EventDataAccess();
