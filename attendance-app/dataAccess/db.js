const lowdb = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const path = require('path');
const dbAsync = lowdb(new FileAsync(path.join(__dirname, 'db.json')));
const { v4: uuid } = require('uuid');

class DataAccess {
  constructor (tableName) {
    this.tableName = tableName;
    // Promise chaining..
    this.dbContext = dbAsync.then(db => {
      // create the json property if not existing
      db.defaults({ [tableName]: [] }).write();

      return db;
    });
  }

  async getAll () {
    const dbContext = await this.dbContext;

    return dbContext.get(this.tableName).value();
  }

  async getById (id) {
    const dbContext = await this.dbContext;

    return dbContext
      .get(this.tableName)
      .find({ id })
      .value();
  }

  async getByAny ({ propName, propValue }) {
    const dbContext = await this.dbContext;

    return dbContext
      .get(this.tableName)
      .find({ [propName]: propValue })
      .value();
  }

  async getMemberByCriteria (nameValue, statusValue) {
    const dbContext = await this.dbContext;

    return dbContext
      .get(this.tableName)
      .filter({
        name: nameValue,
        status: statusValue
      })
      .value();
  }

  async getEventByCriteria (nameValue, startDateValue, endDateValue) {
    const dbContext = await this.dbContext;

    return dbContext
      .get(this.tableName)
      .filter({
        name: nameValue,
        startDate: startDateValue,
        endDate: endDateValue
      })
      .value();
  }

  async insert (data) {
    const dbContext = await this.dbContext;
    const id = uuid();

    dbContext.get(this.tableName)
      .push({
        id,
        ...data
      })
      .write();

    return this.getById(id);
  }

  async update (id, data) {
    const dbContext = await this.dbContext;

    dbContext.get(this.tableName)
      .find({ id })
      .assign(data)
      .write();
  }

  async delete (id) {
    const dbContext = await this.dbContext;

    dbContext
      .get(this.tableName)
      .remove({ id })
      .write();
  }
}

module.exports = DataAccess;
