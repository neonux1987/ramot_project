const MonthExpansesLogic = require('./MonthExpansesLogic');
const MenuDao = require('../dao/MenuDao');
const connectionPool = require('../connection/ConnectionPool');

const SPECIAL_CODE_PREFIX = "9";

class ReportsGeneratorLogic {

  constructor() {
    this.monthExpansesLogic = new MonthExpansesLogic();
    this.menuDao = new MenuDao();
  }

  /**
   * creates empty report for the new month
   * @param {*} buildingName 
   * @param {*} date 
   */
  async generateEmptyReports(date) {

    // Using trx as a transaction object:
    const trx = await connectionPool.getTransaction();

    const buildings = await this.menuDao.getMenu(trx);

    /* buildings.forEach(async (building) => {
      await this.monthExpansesLogic.createEmptyReport(building.engLabel, date, trx);
    }); */

    for (let i = 0; i < buildings.length; i++) {
      await this.monthExpansesLogic.createEmptyReport(buildings[i].engLabel, date, trx);
      console.log("in loop");
    }

    console.log("im done");
    trx.commit();
  }

}

module.exports = ReportsGeneratorLogic;