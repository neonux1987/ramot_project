const SettingsLogic = require("../logic/SettingsLogic");
const servicesObjects = require("../services/index");

const SERVICES = "services";

class ServicesLogic {

  constructor() {
    this.settingsLogic = new SettingsLogic();
  }

  async startService(serviceName) {
    const AllServicesSettings = await this.settingsLogic.getSpecificSetting(SERVICES);

    const serviceSetting = AllServicesSettings[serviceName];

    if (serviceSetting.enabled)
      throw new Error("השירות כבר פעיל. לא ניתן להפעיל שירות שכבר פעיל.")

    service.enabled = true;

    const selectedService = servicesObjects[serviceName];

    switch (serviceName) {
      case 'db_backup': selectedService.start();
        break;
      case 'db_backup': selectedService.start();
        break;
      default: null;
    }
  }

  async restartService(serviceName) {
    const AllServicesSettings = await this.settingsLogic.getSpecificSetting(SERVICES);

    const serviceSetting = AllServicesSettings[serviceName];

    if (!serviceSetting.enabled)
      throw new Error("לא ניתן לאתחל שירות לא פעיל. הפעל את השירות ולאחר מכן אתחל במקרה הצורך.");

    const selectedService = servicesObjects[serviceName];

    switch (serviceName) {
      case 'db_backup': selectedService.restart();
        break;
      case 'db_backup2': selectedService.restart();
        break;
      default: null;
    }
  }

  async stopService(serviceName) {
    const AllServicesSettings = await this.settingsLogic.getSpecificSetting(SERVICES);

    const serviceSetting = AllServicesSettings[serviceName];

    if (!serviceSetting.enabled)
      throw new Error("השירות כבר מופסק. לא ניתן להפסיק שירות שכבר מופסק.")

    const selectedService = servicesObjects[serviceName];
    switch (serviceName) {
      case 'db_backup': selectedService.stop();
        break;
      case 'db_backup': selectedService.stop();
        break;
      default: null;
    }
  }

  async startAllServices() {
    const services = await this.settingsLogic.getSpecificSetting(SERVICES);
    const keys = Object.keys(services);

    keys.forEach((key) => {
      const selectedService = servicesObjects[key];
      selectedService.start();
    })
  }

  async stopAllServices() {
    const services = await this.settingsLogic.getSpecificSetting(SERVICES);
    const keys = Object.keys(services);
    keys.forEach((key) => {
      const selectedService = servicesObjects[key];
      selectedService.stop();
    })
  }

}

module.exports = ServicesLogic;