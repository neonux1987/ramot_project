const MenuDao = require('../dao/MenuDao');

class MenuLogic {

  constructor() {
    this.menuDao = new MenuDao();
  }

  getMenu() {
    return this.menuDao.getMenu();
  }

  async addMenuItem(id, buildingName, trx) {

    const pathname = buildingName.replaceAll(" ", "-");
    const record = {
      buildingId: id,
      pathname
    };

    // returned menu item id
    const menuItemId = await this.menuDao.addMenuItem(record, trx)[0];

    for (let i = 0; i < 4; i++) {
      const label = pages[i];
      const record = {
        menuid: menuItemId,
        label: label,
        path: label.replaceAll(" ", "-"),
        order: i + 1
      }

      await addSubMenuItem(record, trx);
    }
  }

  updateMenuItem(buildingId, buildingName, trx) {
    const path = buildingName.replaceAll(" ", "-");

    const record = {
      path
    };

    return this.menuDao.updateMenuItem(buildingId, record, trx);
  }


}

const pages = [
  "הוצאות חודשיות",
  "ביצוע מול תקציב",
  "סיכום תקציבי",
  "סטטיסטיקה",
]

module.exports = MenuLogic;