class RendererNotificationSvc {

  constructor() {
    this.webContents = null;
  }

  setWebContents(webContents) {
    this.webContents = webContents;
  }

  notifyRenderer(channel, type, arg) {
    this.webContents.send(channel, type, arg);
  }

}

module.exports = new RendererNotificationSvc();