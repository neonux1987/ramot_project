const SettingsLogic = require("../logic/SettingsLogic");
const IOLogic = require("../logic/IOLogic");
const ConfigurationLogic = require("../logic/ConfigurationLogic");
const servicesObjects = require("../services/index");

const SERVICES_LOCATION = ConfigurationLogic.paths.services_path;

class ServicesLogic {

  constructor() {
    this.iOLogic = new IOLogic();
    this.settingsLogic = new SettingsLogic();
  }

  getServices() {
    return this.iOLogic.readFile(SERVICES_LOCATION).then((services) => {
      return JSON.parse(services);
    });
  }

  updateServices(data) {
    return this.iOLogic.writeFile(SERVICES_LOCATION, JSON.stringify(data, null, 2));
  }

  async startService(serviceName) {
    // list of all the services configurations
    const AllServices = await this.getServices();

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

    // set the restartRequired to false
    const serviceSettings = await this.settingsLogic.getSpecificSetting(serviceName);
    serviceSettings.restartRequired = false;
    this.settingsLogic.updateSpecificSetting(serviceName, serviceSettings);

    // update services
    service.restartRequired = false;
    this.updateServices(AllServices);
  }

  async restartService(serviceName) {
    const AllServices = await this.getServices();

    const service = AllServices[serviceName];

    if (!service.enabled)
      throw new Error("לא ניתן לאתחל שירות לא פעיל. הפעל את השירות ולאחר מכן אתחל במקרה הצורך.");

    const selectedService = servicesObjects[serviceName];

    switch (serviceName) {
      case 'db_backup': selectedService.restart();
        break;
      case 'db_backup2': selectedService.restart();
        break;
      default: null;
    }

    // set the restartRequired to false
    const serviceSettings = await this.settingsLogic.getSpecificSetting(serviceName);
    serviceSettings.restartRequired = false;
    this.settingsLogic.updateSpecificSetting(serviceName, serviceSettings);

    // update services
    service.restartRequired = false;
    this.updateServices(AllServices);
  }

  async stopService(serviceName) {
    // list of all the services configurations
    const AllServices = await this.getServices();

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
  }

  async startAllServices() {
    const services = await this.getServices();
    const keys = Object.keys(services);

    keys.forEach((key) => {
      if (services[key].enabled) {
        const selectedService = servicesObjects[key];

        const isRunning = selectedService.isRunning();

        if (!isRunning)
          selectedService.start();
      }
    });
  }

  async stopAllServices() {
    const services = await this.getServices();
    const keys = Object.keys(services);
    keys.forEach((key) => {
      const selectedService = servicesObjects[key];
      selectedService.stop();
    })
  }

}

module.exports = ServicesLogic;