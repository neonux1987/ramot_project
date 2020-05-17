const CHANNELS = [];

const registerIpc = (element) => {
  if (ipcChannel === undefined || ipcChannel === "null")
    throw new Error("Can't register undefined or null");

  if (element instanceof Array)
    element.forEach((ipcName) => {
      CHANNELS.push(ipcName);
    })
  else
    CHANNELS.push(element);

}

module.export = registerIpc;