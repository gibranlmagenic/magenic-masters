const DataAccess = require('./db');

class MemberDataAccess extends DataAccess {
  constructor () {
    super('members');
  }
}

module.exports = new MemberDataAccess();
