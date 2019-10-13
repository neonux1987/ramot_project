class RendererNotificationSvc {

  constructor() {
    this.webContents = null;
  }

  setWebContents(webContents) {
    this.webContents = webContents;
  }

  notifyRenderer(type, arg) {
    if (this.webContents === null) {
      return Promise.reject("You must set the web contents first using setWebContents method.");
    }
    this.webContents.send('notify-renderer', type, arg);
    return Promise.resolve();
  }

}

module.exports = new RendererNotificationSvc();