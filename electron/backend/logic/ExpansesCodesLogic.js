const ExpansesCodesDao = require("../dao/ExpansesCodesDao");
const LogicError = require("../customErrors/LogicError");

class ExpansesCodesLogic {
  constructor() {
    this.expansesCodesDao = new ExpansesCodesDao();
  }

  getExpansesCodes() {
    return this.expansesCodesDao.getExpansesCodes();
  }

  getExpansesCodesReducedByStatus(status) {
    return this.expansesCodesDao.getExpansesCodesReducedByStatus(status);
  }

  getExpansesCodesByStatus(status) {
    return this.expansesCodesDao.getExpansesCodesByStatus(status);
  }

  updateExpanseCode({
    id = Number,
    data = { summarized_section_id: Number, code: Number, codeName: String }
  }) {
    return this.expansesCodesDao.updateExpanseCode(id, data);
  }

  async addExpanseCode(
    data = { summarized_section_id: Number, code: Number, codeName: String }
  ) {
    const result = await this.expansesCodesDao.getExpanseCodeByCode(data.code);
    const expanseCode = result[0];

    if (expanseCode && expanseCode.status === "deleted") {
      //set the new fields
      expanseCode.codeName = data.codeName;
      expanseCode.summarized_section_id = data.summarized_section_id;
      expanseCode.status = "active";

      await this.expansesCodesDao.updateExpanseCode(
        expanseCode.id,
        expanseCode
      );

      return expanseCode.id;
    } else {
      if (expanseCode && expanseCode.status === "active") {
        throw new LogicError(
          `הקוד ${expanseCode.code} כבר קיים ברשימה. לא ניתן להוסיף אותו קוד יותר מפעם אחת.`
        );
      }

      data.status = "active";
      const returnedData = await this.expansesCodesDao.addExpanseCode(data);
      return returnedData[0];
    }
  }

  deleteExpanseCode(id) {
    const data = {
      status: "deleted"
    };
    return this.expansesCodesDao.updateExpanseCode(id, data);
  }
}

module.exports = ExpansesCodesLogic;
