const SettingsLogic = require("../logic/SettingsLogic");
const servicesObjects = require("../services/index");

const SERVICES = "services";

class ServicesLogic {

  constructor() {
    this.settingsLogic = new SettingsLogic();
  }

  getServices() {
    return this.settingsLogic.getSpecificSetting(SERVICES);
  }

  async startService(serviceName) {
    // list of all the services configurations
    const AllServices = await this.settingsLogic.getSpecificSetting(SERVICES);

    // the service
    const service = AllServices[serviceName];

    if (service.enabled)
      throw new Error("השירות כבר פעיל. לא ניתן להפעיל שירות שכבר פעיל.")

    const selectedService = servicesObjects[serviceName];

    switch (serviceName) {
      case 'db_backup': selectedService.start();
        break;
      case 'db_backup': selectedService.start();
        break;
      default: null;
    }

    // settings of the specific service
    const serviceSettings = await this.settingsLogic.getSpecificSetting(serviceName);

    // enable in both places in the services
    // and in the specific service settings
    service.enabled = true;
    serviceSettings.enabled = true;

    this.settingsLogic.updateSpecificSetting(serviceName, serviceSettings);
    this.settingsLogic.updateSpecificSetting(SERVICES, AllServices);
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
    // list of all the services configurations
    const AllServices = await this.settingsLogic.getSpecificSetting(SERVICES);

    // the service
    const service = AllServices[serviceName];

    if (!service.enabled)
      throw new Error("השירות כבר מופסק. לא ניתן להפסיק שירות שכבר מופסק.");

    const selectedService = servicesObjects[serviceName];
    switch (serviceName) {
      case 'db_backup': selectedService.stop();
        break;
      case 'db_backup': selectedService.stop();
        break;
      default: null;
    }

    // settings of the specific service
    const serviceSettings = await this.settingsLogic.getSpecificSetting(serviceName);

    // disable in both places in the services
    // and in the specific service settings
    service.enabled = false;
    serviceSettings.enabled = false;

    this.settingsLogic.updateSpecificSetting(serviceName, serviceSettings);
    this.settingsLogic.updateSpecificSetting(SERVICES, AllServices);
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