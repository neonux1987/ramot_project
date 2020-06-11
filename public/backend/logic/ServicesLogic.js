const fse = require('fs-extra');
const SettingsLogic = require("../logic/SettingsLogic");
const SystemPaths = require("../system/SystemPaths");
const servicesObjects = require("../services/index");
const LogicError = require('../customErrors/LogicError');
const { asyncForEach } = require('../../helpers/utils');

const SERVICES_LOCATION = SystemPaths.paths.services_file_path;

class ServicesLogic {

  constructor() {
    this.settingsLogic = new SettingsLogic();
  }

  getServices() {
    return fse.readJSON(SERVICES_LOCATION);
  }

  updateServices(data) {
    return fse.writeJSON(SERVICES_LOCATION, data);
  }

  async startService(serviceName) {
    // list of all the services configurations
    const AllServices = await this.getServices();

    // the service
    const service = AllServices[serviceName];

    if (service.enabled)
      throw new LogicError(`השירות '${service.serviceNameHeb}' כבר פעיל. לא ניתן להפעיל שירות שכבר פעיל.`)

    const selectedService = servicesObjects[serviceName];

    switch (serviceName) {
      case 'db_backup': await selectedService.start();
        break;
      case 'db_backup': await selectedService.start();
        break;
      default: null;
    }

    // set the restartRequired to false
    const serviceSettings = await this.settingsLogic.getSpecificSetting(serviceName);

    serviceSettings.restartRequired = false;
    await this.settingsLogic.updateSpecificSetting(serviceName, serviceSettings);

    // update services
    service.restartRequired = false;
    await this.updateServices(AllServices);
  }

  async restartService(serviceName) {
    const AllServices = await this.getServices();

    const service = AllServices[serviceName];

    if (!service.enabled)

      throw new LogicError(`לא ניתן לאתחל את השירות '${service.serviceNameHeb}' הלא פעיל. הפעל את השירות במקום אתחול.`);

    const selectedService = servicesObjects[serviceName];

    switch (serviceName) {
      case 'db_backup': await selectedService.restart();
        break;
      case 'db_backup2': await selectedService.restart();
        break;
      default: null;
    }

    // set the restartRequired to false
    const serviceSettings = await this.settingsLogic.getSpecificSetting(serviceName);
    serviceSettings.restartRequired = false;
    await this.settingsLogic.updateSpecificSetting(serviceName, serviceSettings);

    // update services
    service.restartRequired = false;
    await this.updateServices(AllServices);
  }

  async stopService(serviceName) {
    // list of all the services configurations
    const AllServices = await this.getServices();

    // the service
    const service = AllServices[serviceName];

    if (!service.enabled)

      throw new LogicError(`השירות '${service.serviceNameHeb}' כבר מופסק. לא ניתן להפסיק שירות שכבר מופסק.`);

    const selectedService = servicesObjects[serviceName];
    switch (serviceName) {
      case 'db_backup': await selectedService.stop();
        break;
      case 'db_backup': await selectedService.stop();
        break;
      default: null;
    }
  }

  async startAllServices() {
    const services = await this.getServices();
    const keys = Object.keys(services);

    await asyncForEach(keys, async (key) => {
      if (services[key].enabled) {
        const selectedService = servicesObjects[key];

        const isRunning = selectedService.isRunning();

        if (!isRunning)
          await selectedService.start();
      }
    });
  }

  async stopAllServices() {
    const services = await this.getServices();
    const keys = Object.keys(services);
    await asyncForEach(keys, async (key) => {
      if (services[key].enabled) {
        const selectedService = servicesObjects[key];
        await selectedService.stop();
      }
    });
  }

}

module.exports = ServicesLogic;