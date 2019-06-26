const NestHydrationJS = require('nesthydrationjs');

class TransactionsDao {

  constructor(connection) {
    this.connection = connection;
    this.nestHydrationJS = new NestHydrationJS();
  }

  /**
   * update month expanse record
   * @param {*} id the id of the month expanse to update
   * @param {*} buildingName the name of the building
   * @param {*} expanseToSave the record to update with
   */
  updateMonthExpanse({ date = Object, buildingName = String, expanse = Object }) {

    buildingName = Helper.trimSpaces(buildingName);

    // Using trx as a transaction object:
    const trx = await this.connection.transaction();

    let expanseToSave = { supplierName: expanse.supplierName, sum: expanse.sum, notes: expanse.notes };
    this.med.updateMonthExpanse(params, trx);

    this.med.getMonthExpansesBySummarizedSectionId(params, trx)

    this.bed.getBudgetExecution(params, trx);

    trx.then((expanses) => {
      calculateExpansesSum(expanses);
      return this.bel.updateBudgetExecution(params, trx);
    });





    let data = this.connection(buildingName + "_month_expanses")
      .where({ id: id })
      .update(expanseToSave);

    return data.then((result) => result)
      .catch((error) => {
        throw new Error("קרתה תקלה בנסיון עידכון הוצאה.");
      })
  }

  addNewMonthExpanse(buildingName = String, record = Object) {
    return this.connection(buildingName + "_month_expanses").insert(record)
      .catch((error) => {
        throw new Error("קרתה תקלה בנסיון להוסיף הוצאה חדשה.");
      });;
  }

}

module.exports = TransactionsDao;