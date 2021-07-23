const DataAccess = require('./db');

class AttandanceDataAccess extends DataAccess {
  constructor () {
    super('attendance');
  }
}

module.exports = new AttandanceDataAccess();
