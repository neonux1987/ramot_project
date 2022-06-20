import { ipcRenderer } from "electron";
import { useCallback, useEffect, useState } from "react";

/* 
  this hook listens to an event refresh and will execute a callback
  when the refresh event fired. usually on some kind of state change
  that needs to refresh dependet components
*/
const useRefresh = () => {
  const [refresh, setRefresh] = useState(false);

  const callback = useCallback(async () => {
    setRefresh(true);
  }, []);

  useEffect(() => {
    ipcRenderer.on("refresh", callback);

    return () => {
      ipcRenderer.removeListener("refresh", callback);
    };
  }, [callback]);

  return [refresh, setRefresh];
};

export default useRefresh;
