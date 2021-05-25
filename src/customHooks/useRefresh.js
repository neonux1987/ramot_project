import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useState } from 'react';

const useRefresh = () => {

  const [refresh, setRefresh] = useState(false);

  const callback = useCallback(async () => {
    setRefresh(true);
  }, []);

  useEffect(() => {
    ipcRenderer.on("refresh", callback);

    return () => {
      ipcRenderer.removeListener("refresh", callback);
    }
  }, [callback]);

  return [refresh, setRefresh];
};

export default useRefresh;