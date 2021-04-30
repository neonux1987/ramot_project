const DbError = require('../customErrors/DbError');
const logManager = require('../logger/LogManager');
const connectionPool = require('../connection/ConnectionPool');

const FILENAME = "MenuDao.js"

class MenuDao {

  constructor() {
    this.logger = logManager.getLogger();
    this.connection = connectionPool.getConnection();
  }

  getMenu(trx = this.connection) {
    return trx.select(
      "menu.id AS id",
      "buildings.buildingName AS label",
      "buildings.buildingNameEng AS engLabel",
      "menu.path AS path",
    ).from('menu').innerJoin("buildings", "buildings.id", "menu.building_id").catch((error) => {
      const newError = new DbError("המערכת לא הצליחה לשלוף נתוני תפריט", FILENAME, error);
      this.logger.error(newError.toString())
      throw newError;
    });
  }

  addMenuItem(record = Object, trx = this.connection) {
    return trx("menu").insert(record)
      .catch((error) => {
        const msg = `קרתה תקלה בזמן הוספת הוספת בניין ${record.buildingName} לתפריט`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  updateMenuItem(buildingId, record = Object, trx = this.connection) {
    return trx("menu")
      .where({ building_id: buildingId })
      .update(record)
      .catch((error) => {
        const msg = `קרתה תקלה בזמן הוספת הוספת בניין ${record.buildingName} לתפריט`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

}

module.exports = MenuDao;