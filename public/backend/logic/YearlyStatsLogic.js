const YearlyStatsDao = require('../dao/YearlyStatsDao');
const BuildingsDao = require('../dao/BuildingsDao');
const connectionPool = require('../connection/ConnectionPool');
const { asyncForEach } = require('../../helpers/utils')
class YearlyStatsLogic {

  constructor() {
    this.yearlyStatsDao = new YearlyStatsDao();
  }

  getYearStatsByYearRange(buildingName, fromYear, toYear) {
    return this.yearlyStatsDao.getYearStatsByYearRange(buildingName, fromYear, toYear);
  }

  getYearStatsTrx(buildingName = String, date = Object, trx) {
    return this.yearlyStatsDao.getYearStatsTrx(buildingName, date, trx);
  }

  updateYearStatsTrx(buildingName = String, date = Object, budgetExpanse, trx) {
    return this.yearlyStatsDao.updateYearStatsTrx(buildingName, date, budgetExpanse, trx);
  }

  insertYearStatsTrx(buildingName, data, trx) {
    return this.yearlyStatsDao.insertYearStatsTrx(buildingName, data, trx);
  }

  async getAllBuildingsStatsByYear(year) {

    const stats = {};
    const date = {
      year
    };

    const trx = await connectionPool.getTransaction();

    const buildingsDao = new BuildingsDao();

    const buildings = await buildingsDao.getBuidlings(trx);

    await asyncForEach(buildings, async ({ buildingName, buildingNameEng }) => {
      const stat = {
        label: buildingName,
        data: await this.getYearStatsTrx(buildingNameEng, date, trx)
      };
      stats[buildingNameEng] = stat;
    });

    trx.commit();

    return stats;
  }

}

module.exports = YearlyStatsLogic;