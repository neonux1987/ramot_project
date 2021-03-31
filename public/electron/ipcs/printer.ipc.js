
const printerIpc = () => {
  const { ipcMain, webContents } = require('electron');

  const path = require('path');
  const fs = require('fs');
  const SystemPaths = require("../../backend/system/SystemPaths");

  ipcMain.on('save-to-pdf', (event, content) => {
    const contents = webContents.getFocusedWebContents();

    contents.printToPDF({
      marginsType: 0,
      pageSize: 'A4',
      printBackground: true,
      printSelectionOnly: false,
      landscape: false
    }).then(data => {
      console.log("data");

      fs.writeFile(path.join(SystemPaths.paths.user_main_folder, "test.pdf"), data, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('PDF Generated Successfully');
        }
      });
    })
      .catch(error => console.log(error));
    event.sender.send("pdf-saved", { data: "location of the pdf file" });
  });

}

module.exports = printerIpc;