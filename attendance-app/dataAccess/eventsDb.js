const DataAccess = require('./db');

class EventDataAccess extends DataAccess {
  constructor () {
    super('events');
  }

  async getEventByNameAndDate (eventName, startDate, endDate) {
    const event = await this.getEventByCriteria(eventName, startDate, endDate);

    return event;
  }
}

module.exports = new EventDataAccess();
