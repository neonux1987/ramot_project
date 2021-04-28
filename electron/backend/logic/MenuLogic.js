const MenuDao = require('../dao/MenuDao');

class MenuLogic {

  constructor() {
    this.menuDao = new MenuDao();
  }

  getMenu() {
    return this.menuDao.getMenu();
  }

  async addMenuItem(id, buildingName, trx) {

    const pathname = buildingName.replace(" ", "-");
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
        path: label.replace(" ", "-"),
        order: i + 1
      }

      await addSubMenuItem(record, trx);
    }
  }

  addSubMenuItem(id, buildingName, trx) {

    const pathname = buildingName.replace(" ", "-");
    const record = {
      buildingId: id,
      pathname
    };

    return this.menuDao.addMenuItem(record);
  }


}

const pages = [
  "הוצאות חודשיות",
  "ביצוע מול תקציב",
  "סיכום תקציבי",
  "סטטיסטיקה",
]

module.exports = MenuLogic;