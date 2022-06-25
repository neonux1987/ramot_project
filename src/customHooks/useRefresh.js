import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";

/* 
  this hook listens to an event refresh and will execute a callback
  when the refresh event fired. usually on some kind of state change
  that needs to refresh dependet components
*/
const useRefresh = () => {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const listener = () => {
      setRefresh(true);
    };
    // remove previous listener if exist
    // before registering a new one
    ipcRenderer.removeListener("refresh", listener);

    ipcRenderer.on("refresh", listener);

    return () => {
      ipcRenderer.removeListener("refresh", listener);
    };
  }, []);

  return [refresh, setRefresh];
};

export default useRefresh;
