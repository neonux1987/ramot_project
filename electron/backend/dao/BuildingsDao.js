const DbError = require('../customErrors/DbError');
const logManager = require('../logger/LogManager');
const connectionPool = require('../connection/ConnectionPool');

const FILENAME = "BuildingsDao.js"

class BuildingsDao {

  constructor() {
    this.logger = logManager.getLogger();
  }

  getBuidlings(trx = connectionPool.getConnection()) {
    return trx.select("*").from('buildings')
      .catch((error) => {
        const newError = new DbError("המערכת לא הצליחה לשלוף את הנתונים של הבניינים", FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  addBuilding(buildingName = String, record = Object, trx = this.connection) {
    return trx("buildings").insert(record)
      .catch((error) => {
        const msg = `קרתה תקלה בזמן הוספת בניין חדש בשם ${buildingName}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  updateBuilding(id = Number, buildingName = String, record = Object, trx) {
    return trx("buildings")
      .where({ id: id })
      .update(record)
      .catch((error) => {
        const msg = `קרתה תקלה בזמן עדכון בניין בשם ${buildingName}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  deleteBuilding(
    buildingName = String,
    id = Number,
    trx = this.connection
  ) {
    return trx("buildings")
      .where({ id: id })
      .del()
      .catch((error) => {
        const msg = `קרתה תקלה, המערכת לא הצליחה למחוק את הבניין ${buildingName}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

}

module.exports = BuildingsDao;