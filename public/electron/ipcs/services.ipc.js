const { ipcMain } = require('electron');
const ServicesLogic = require('../../backend/logic/ServicesLogic');

const servicesIpc = () => {

  //fetch month expanses data
  const servicesLogic = new ServicesLogic();

  ipcMain.on('get-services', (event) => {
    servicesLogic.getServices().then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("services-data", { data: result });
    }).catch((error) => {
      event.reply("services-data", { error: error.message });
    });
  });

  ipcMain.on('update-services', (event, payload) => {
    servicesLogic.updateServices(payload).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("services-updated", { data: result });
    }).catch((error) => {
      event.reply("services-updated", { error: error.message });
    });
  });

  ipcMain.on('start-service', (event, serviceName) => {
    servicesLogic.startService(serviceName).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("service-started", { data: result });
    }).catch((error) => {
      event.reply("service-started", { error: error.message });
    });
  });

  ipcMain.on('stop-service', (event, serviceName) => {
    servicesLogic.stopService(serviceName).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("service-stopped", { data: result });
    }).catch((error) => {
      event.reply("service-stopped", { error: error.message });
    });
  });

  ipcMain.on('restart-service', (event, serviceName) => {
    servicesLogic.restartService(serviceName).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("service-restarted", { data: result });
    }).catch((error) => {
      event.reply("service-restarted", { error: error.message });
    });
  });

  ipcMain.on('start-all-services', (event, serviceName) => {
    servicesLogic.startAllServices().then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("all-services-started", { data: result });
    }).catch((error) => {
      event.reply("all-services-started", { error: error.message });
    });
  });

  ipcMain.on('stop-all-services', (event, serviceName) => {
    servicesLogic.stopAllServices(serviceName).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("all-services-stopped", { data: result });
    }).catch((error) => {
      event.reply("all-services-stopped", { error: error.message });
    });
  });

}

module.exports = servicesIpc;