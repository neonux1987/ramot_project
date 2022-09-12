const { ipcRenderer } = require("electron");

const execute = async () => {
  const settingsExist = localStorage.getItem("settings") !== null;

  if (!settingsExist) {
    const settings = await ipcRenderer.invoke("restore-get-settings");
    localStorage.setItem("settings", JSON.stringify(settings));
  }
};

execute();
