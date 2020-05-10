const DbError = require('../customErrors/DbError');
const logManager = require('../logger/LogManager');
const connectionPool = require('../connection/ConnectionPool');

const FILENAME = "SummarizedSectionsDao.js"

class SummarizedSectionsDao {

  constructor() {
    this.logger = logManager.getLogger();
    this.connection = connectionPool.getConnection();
  }

  getAllSummarizedSectionsOrderedTrx(status) {
    return this.connection.select()
      .from("summarized_sections")
      .where({ status })
      .orderBy('section', 'asc')
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סיכום שנתי לפי סטטוס ${status}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getAllSummarizedSectionsTrx(trx = this.connection) {
    return trx.select()
      .from("summarized_sections")
      .orderBy('section', 'asc')
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף את כל נתוני הסיכום השנתי`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getSummarizedSectionById({ buildingName = String, year = Number, month = String, expanse = Object }) {
    let data = this.connection.where({ year: year, month: month, summarized_section_id: expanse.summarized_section_id }).select(
      "building.id AS id",
      "building.expanses_code_id AS expanses_code_id",
      "building.sum AS sum",
      "sc.id AS summarized_section_id",
      "sc.section AS section",
    ).from(buildingName + "_month_expanses AS building").innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
      .innerJoin("summarized_sections AS sc", "ec.summarized_section_id", "sc.id");

    return data.then((result) => {
      return this.nestHydrationJS.nest(result, DEFINITION);
    })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף רשומה מסעיפים מסכמים לבניין ${buildingName} לפי מזהה ${expanse.summarized_section_id} לפי חודש ${month} שנה ${year}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  getSummarizedSectionBySection(section) {
    return this.connection.select()
      .from("summarized_sections")
      .where({ section })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף רשומה מסעיפים מסכמים לפי סעיף ${section}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  updateSummarizedSection(id = Number, summarizedSection = Object) {
    return this.connection("summarized_sections")
      .where({ id: id })
      .update(summarizedSection)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן את הרשומה בנתוני סעיפים מסכמים לפי מזהה ${id}`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

  addSummarizedSection(summarizedSection = Object) {
    return this.connection("summarized_sections")
      .insert(summarizedSection)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף את הרשומה לנתוני סעיפים מסכמים`;
        const newError = new DbError(msg, FILENAME, error);
        this.logger.error(newError.toString())
        throw newError;
      });
  }

}

module.exports = SummarizedSectionsDao;