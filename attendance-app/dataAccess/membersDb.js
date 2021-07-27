const DataAccess = require('./db');

class MemberDataAccess extends DataAccess {
  constructor () {
    super('members');
  }

  async searchByNameAndStatus (name, status) {
    const member = await this.getMemberByCriteria(name, status);

    return member;
  }
}

module.exports = new MemberDataAccess();
