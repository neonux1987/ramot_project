const DbError = require("../customErrors/DbError");
const connectionPool = require("../connection/ConnectionPool");

const FILENAME = "BuildingsDao.js";

class BuildingsDao {
  getBuildingsByStatus(status = "פעיל", trx = connectionPool.getConnection()) {
    return trx
      .select(
        "id AS buildingId",
        "buildingName",
        "deletionDate",
        "previousBuildingName",
        "color",
        "path",
        "order",
        "status"
      )
      .from("buildings")
      .where({ status })
      .catch((error) => {
        throw new DbError(
          "המערכת לא הצליחה לשלוף את הנתונים של הבניינים",
          FILENAME,
          error
        );
      });
  }

  getAllBuildings(trx = connectionPool.getConnection()) {
    return trx
      .select(
        "id",
        "buildingName",
        "deletionDate",
        "previousBuildingName",
        "color",
        "path",
        "order",
        "status"
      )
      .from("buildings")
      .catch((error) => {
        throw new DbError(
          "המערכת לא הצליחה לשלוף את הנתונים של הבניינים",
          FILENAME,
          error
        );
      });
  }

  getBuildingById(id, trx = connectionPool.getConnection()) {
    return trx
      .select("*")
      .from("buildings")
      .where({ id })
      .catch((error) => {
        throw new DbError(
          `המערכת לא התליחה לשלוף נתונים של בניין קוד מזהה ${id}`,
          FILENAME,
          error
        );
      });
  }

  getBuildingByBuildingName(
    buildingName,
    trx = connectionPool.getConnection()
  ) {
    return trx
      .select("*")
      .from("buildings")
      .where({ buildingName })
      .catch((error) => {
        throw new DbError(
          `המערכת לא התליחה לשלוף נתונים של בניין ${buildingName}`,
          FILENAME,
          error
        );
      });
  }

  addBuilding(record = Object, trx = connectionPool.getConnection()) {
    return trx("buildings")
      .insert(record)
      .catch((error) => {
        const msg = `קרתה תקלה בזמן הוספת בניין חדש בשם ${record.buildingName}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  updateBuilding(
    id = Number,
    record = Object,
    trx = connectionPool.getConnection()
  ) {
    return trx("buildings")
      .where({ id: id })
      .update(record)
      .catch((error) => {
        const msg = `קרתה תקלה בזמן עדכון רשומה עם קוד מזהה ${id}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  removeBuilding(id = Number, trx = connectionPool.getConnection()) {
    return trx("buildings")
      .where({ id })
      .del()
      .catch((error) => {
        const msg = `קרתה תקלה, המערכת לא הצליחה למחוק את הבניין עם קוד מזהה ${id}`;
        throw new DbError(msg, FILENAME, error);
      });
  }
}

module.exports = BuildingsDao;
