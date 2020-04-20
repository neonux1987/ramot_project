class RendererNotificationSvc {

  constructor() {
    this.webContents = null;
  }

  setWebContents(webContents) {
    this.webContents = webContents;
  }

  notifyRenderer(channel, action, message) {
    this.webContents.send(channel, action, message);
  }

}

module.exports = new RendererNotificationSvc();