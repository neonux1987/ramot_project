const DbError = require("../customErrors/DbError");
const connectionPool = require("../connection/ConnectionPool");

const FILENAME = "SummarizedSectionsDao.js";

class SummarizedSectionsDao {
  constructor() {
    this.connection = connectionPool.getConnection();
  }

  getAllSummarizedSectionsOrderedTrx(status, trx = this.connection) {
    return trx
      .select()
      .from("summarized_sections")
      .where({ status })
      .orderBy("section", "asc")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף נתוני סיכום שנתי לפי סטטוס ${status}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getAllSummarizedSectionsTrx(trx = this.connection) {
    return trx
      .select()
      .from("summarized_sections")
      .orderBy("section", "asc")
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף את כל נתוני הסיכום השנתי`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getSummarizedSectionById({
    buildingName = String,
    year = Number,
    month = String,
    expanse = Object
  }) {
    let data = this.connection
      .where({
        year: year,
        month: month,
        summarized_section_id: expanse.summarized_section_id
      })
      .select(
        "building.id AS id",
        "building.expanses_code_id AS expanses_code_id",
        "building.sum AS sum",
        "sc.id AS summarized_section_id",
        "sc.section AS section"
      )
      .from(buildingName + "_month_expanses AS building")
      .innerJoin("expanses_codes AS ec", "building.expanses_code_id", "ec.id")
      .innerJoin(
        "summarized_sections AS sc",
        "ec.summarized_section_id",
        "sc.id"
      );

    return data
      .then((result) => {
        return this.nestHydrationJS.nest(result, DEFINITION);
      })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף רשומה מסעיפים מסכמים לבניין ${buildingName} לפי מזהה ${expanse.summarized_section_id} לפי חודש ${month} שנה ${year}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  getSummarizedSectionBySection(section) {
    return this.connection
      .select()
      .from("summarized_sections")
      .where({ section })
      .catch((error) => {
        const msg = `המערכת לא הצליחה לשלוף רשומה מסעיפים מסכמים לפי סעיף ${section}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  updateSummarizedSection(id = Number, summarizedSection = Object) {
    return this.connection("summarized_sections")
      .where({ id: id })
      .update(summarizedSection)
      .catch((error) => {
        const msg = `המערכת לא הצליחה לעדכן את הרשומה בנתוני סעיפים מסכמים לפי מזהה ${id}`;
        throw new DbError(msg, FILENAME, error);
      });
  }

  addSummarizedSection(summarizedSection = Object) {
    return this.connection("summarized_sections")
      .insert(summarizedSection)
      .catch((error) => {
        const msg = `המערכת לא הצליחה להוסיף את הרשומה לנתוני סעיפים מסכמים`;
        throw new DbError(msg, FILENAME, error);
      });
  }
}

module.exports = SummarizedSectionsDao;
