const DbError = require('../customErrors/DbError');
const logManager = require('../logger/LogManager');
const NestHydrationJS = require('nesthydrationjs');
const connectionPool = require('../connection/ConnectionPool');

const DEFINITION = [{
  id: { column: 'id', type: 'NUMBER' },
  label: 'label',
  engLabel: 'engLabel',
  path: 'path',
  expanded: { column: 'expanded', type: 'NUMBER' },
  submenu: [
    {
      id: { column: '_id', type: 'NUMBER' },
      label: '_label',
      menuid: { column: '_menuid', type: 'NUMBER' },
      path: '_path',
      selected: { column: '_selected', type: 'NUMBER' },
      order: { column: '_order', type: 'NUMBER' },
      icon: '_icon_name'
    }
  ]
}];

const FILENAME = "MenuDao.js"

class MenuDao {

  constructor() {
    this.logger = logManager.getLogger();
    this.nestHydrationJS = new NestHydrationJS();
    this.connection = connectionPool.getConnection();
  }

  getMenu(trx = this.connection) {
    let data = trx.select(
      "menu.id AS id",
      "buildings.buildingName AS label",
      "buildings.buildingNameEng AS engLabel",
      "menu.path AS path",
      "menu.expanded AS expanded",
      "submenus.id AS _id",
      "submenus.label AS _label",
      "submenus.menuid AS _menuid",
      "submenus.path AS _path",
      "submenus.selected AS _selected",
      "submenus.order AS _order",
      "submenus.icon_name AS _icon_name"
    ).from('submenus').innerJoin('menu', 'menu.id', 'submenus.menuid').innerJoin("buildings", "buildings.id", "menu.building_id");

    return data.then((result) => {
      return this.nestHydrationJS.nest(result, DEFINITION);
    }).catch((error) => {
      const newError = new DbError("המערכת לא הצליחה לשלוף נתוני תפריט", FILENAME, error);
      this.logger.error(newError.toString())
      throw newError;
    });
  }

}

module.exports = MenuDao;