const DbError = require('../customErrors/DbError');
const logManager = require('../logger/LogManager');
const connectionPool = require('../connection/ConnectionPool');

const FILENAME = "BuildingsDao.js"

class BuildingsDao {

  constructor() {
    this.logger = logManager.getLogger();
  }

  getBuildingsByStatus(status = "פעיל", trx = connectionPool.getConnection()) {
    return trx.select(
      "id AS buildingId",
      "buildingName",
      "deletionDate",
      "previousBuildingName",
      "path",
      "order",
      "status"
    ).from('buildings')
      .where({ status })
      .catch((error) => {
        const newError = new DbError("המערכת לא הצליחה לשלוף את הנתונים של הבניינים", FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getAllBuildings(trx = connectionPool.getConnection()) {
    return trx.select(
      "id",
      "buildingName",
      "deletionDate",
      "previousBuildingName",
      "path",
      "order",
      "status"
    ).from('buildings')
      .catch((error) => {
        const newError = new DbError("המערכת לא הצליחה לשלוף את הנתונים של הבניינים", FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getBuildingById(id, trx = connectionPool.getConnection()) {
    return trx.select("*").from('buildings').where({ id })
      .catch((error) => {
        const newError = new DbError(`המערכת לא התליחה לשלוף נתונים של בניין קוד מזהה ${id}`, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getBuildingByBuildingName(buildingName, trx = connectionPool.getConnection()) {
    return trx.select("*").from('buildings').where({ buildingName })
      .catch((error) => {
        const newError = new DbError(`המערכת לא התליחה לשלוף נתונים של בניין ${buildingName}`, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  addBuilding(record = Object, trx = connectionPool.getConnection()) {
    return trx("buildings").insert(record)
      .catch((error) => {
        const msg = `קרתה תקלה בזמן הוספת בניין חדש בשם ${record.buildingName}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  updateBuilding(id = Number, record = Object, trx = connectionPool.getConnection()) {
    return trx("buildings")
      .where({ id: id })
      .update(record)
      .catch((error) => {
        const msg = `קרתה תקלה בזמן עדכון רשומה עם קוד מזהה ${id}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  removeBuilding(
    id = Number,
    trx = connectionPool.getConnection()
  ) {
    return trx("buildings")
      .where({ id })
      .del()
      .catch((error) => {
        const msg = `קרתה תקלה, המערכת לא הצליחה למחוק את הבניין עם קוד מזהה ${id}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

}

module.exports = BuildingsDao;