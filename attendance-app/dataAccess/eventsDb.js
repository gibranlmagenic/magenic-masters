const DataAccess = require('./db');

class EventDataAccess extends DataAccess {
  constructor () {
    super('events');
  }

  async getEventByNameAndDate (searchEventName, dateStart, dateEnd) {
    const event = await this.getByAny({
      propName: 'name',
      propValue: searchEventName

    });

    return event;
  }
}

module.exports = new EventDataAccess();
