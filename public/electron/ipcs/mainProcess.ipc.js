const { ipcMain, dialog } = require('electron');
const MainProcessLogic = require('../../backend/logic/MainProcessLogic');
const LoggerError = require('../../backend/customErrors/LoggerError');
const { openLogFile } = require('../../helpers/utils');
const fs = require('fs');

const mainProcessIpc = () => {

  const mainProcessLogic = new MainProcessLogic();
  const logger = require('../../backend/logger/LogManager').getLogger();

  ipcMain.on('quit-app', (event) => {
    mainProcessLogic.quit();

  });

  ipcMain.on('restart-app', (event) => {
    try {
      mainProcessLogic.restart()
    } catch (error) {
      event.reply("app-restarted", { error: error.message });
    }
  });

  process.on("uncaughtException", (error, origin) => {
    const loggerError = new LoggerError({
      name: "MainProcess",
      message: "קרתה תקלה לא ידועה",
      originalError: error
    });
    logger.error(loggerError.toString())

    const title = "שגיאה";
    const message = `
      קרתה תקלה לא ידועה: 
      ${error.message}
      לפרטים נוספים יש לקרוא את יומן האירועים שנמצא בתיקיית logs
      אשר נמצא בתיקיית התוכנה.
      `;

    const dialogOption = dialog.showMessageBoxSync({
      title,
      message,
      type: "error",
      buttons: ["סגור", "פתח יומן אירועים"]
    });

    if (dialogOption === 1) {
      openLogFile();
    }

    fs.writeSync(
      process.stderr.fd,
      `Caught exception: ${error}\n` +
      `Exception origin: ${origin}`
    );

  });

}

module.exports = mainProcessIpc;