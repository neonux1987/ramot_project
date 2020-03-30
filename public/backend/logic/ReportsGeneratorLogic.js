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

    const buildings = await this.menuDao.getMenu();
    console.log(buildings);
    trx.commit();

  }

}

module.exports = ReportsGeneratorLogic;