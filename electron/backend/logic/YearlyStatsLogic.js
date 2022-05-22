const YearlyStatsDao = require('../dao/YearlyStatsDao');
const BuildingsDao = require('../dao/BuildingsDao');
const connectionPool = require('../connection/ConnectionPool');
const { asyncForEach } = require('../../helpers/utils')
class YearlyStatsLogic {

  constructor() {
    this.yearlyStatsDao = new YearlyStatsDao();
  }

  getYearStatsByYearRange(buildingId, fromYear, toYear) {
    return this.yearlyStatsDao.getYearStatsByYearRange(buildingId, fromYear, toYear);
  }

  getYearStatsTrx(buildingId = String, date = Object, trx) {
    return this.yearlyStatsDao.getYearStatsTrx(buildingId, date, trx);
  }

  updateYearStatsTrx(buildingId = String, date = Object, budgetExpanse, trx) {
    return this.yearlyStatsDao.updateYearStatsTrx(buildingId, date, budgetExpanse, trx);
  }

  insertYearStatsTrx(buildingId, data, trx) {
    return this.yearlyStatsDao.insertYearStatsTrx(buildingId, data, trx);
  }

  async getAllBuildingsStatsByYear(year) {

    const stats = {};
    const date = {
      year
    };

    const trx = await connectionPool.getTransaction();

    const buildingsDao = new BuildingsDao();

    const buildings = await buildingsDao.getBuildingsByStatus("פעיל", trx);

    await asyncForEach(buildings, async ({ buildingName, buildingId, color }) => {

      const stat = {
        label: buildingName,
        color,
        data: await this.getYearStatsTrx(buildingId, date, trx)
      };
      stats[buildingId] = stat;
    });

    trx.commit();

    return stats;
  }

}

module.exports = YearlyStatsLogic;