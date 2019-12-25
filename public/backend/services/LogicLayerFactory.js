const MonthExpansesLogic = require('../logic/MonthExpansesLogic');

class LogicLayerFactory {

  static getMonthExpansesLogic(connection) {
    return new MonthExpansesLogic(connection);
  }

}

module.exports = LogicLayerFactory;