const DataAccess = require('./db');

class UserDataAccess extends DataAccess {
  constructor () {
    super('users');
  }

  async getUserByEmailAddress (emailAddress) {
    const user = await this.getByAny({
      propName: 'emailAddress',
      propValue: emailAddress
    });

    return user;
  }

  async getUserByUserName (userName) {
    const user = await this.getByAny({
      propName: 'userName',
      propValue: userName
    });

    return user;
  }
}

module.exports = new UserDataAccess();
