const SettingsLogic = require("../logic/SettingsLogic");
const servicesObjects = require("../services/index");

const SERVICES = "services";

class ServicesLogic {

  constructor() {
    this.settingsLogic = new SettingsLogic();
  }

  async getServices() {
    return this.settingsLogic.getSpecificSetting(SERVICES);
  }

  async saveServiceSettings(serviceName, payload) {
    const serviceSettings = await this.settingsLogic.updateSpecificSetting(serviceName, payload);

    const services = this.settingsLogic.getSpecificSetting(SERVICES);

  }

  async startService(serviceName) {
    const services = await this.settingsLogic.getSpecificSetting(SERVICES);

    const service = services[serviceName];

    if (service.enabled)
      throw new Error("השירות כבר פעיל. לא ניתן להפעיל שירות שכבר פעיל.")

    service.enabled = true;

    switch (serviceName) {
      case 'db_backup': dbBackupSvc.activate();
        break;
      case 'db_backup': dbBackupSvc.activate();
        break;
      default: null;
    }
  }

  async restartService(serviceName) {
    const services = await this.settingsLogic.getSpecificSetting(SERVICES);

    const service = services[serviceName];

    if (!service.enabled)
      throw new Error("לא ניתן לאתחל שירות לא פעיל. הפעל את השירות ולאחר מכן אתחל במקרה הצורך.")

    switch (serviceName) {
      case 'db_backup': dbBackupSvc.restart();
        break;
      case 'db_backup': dbBackupSvc.restart();
        break;
      default: null;
    }
  }

  async stopService(serviceName) {
    const services = await this.settingsLogic.getSpecificSetting(SERVICES);

    const service = services[serviceName];

    if (!service.enabled)
      throw new Error("השירות כבר מופסק. לא ניתן להפסיק שירות שכבר מופסק.")

    switch (serviceName) {
      case 'db_backup': dbBackupSvc.stop();
        break;
      case 'db_backup': dbBackupSvc.stop();
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