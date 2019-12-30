import { ipcRenderer } from 'electron';

import { playSound, soundTypes } from '../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

export const exportToExcel = (excelData) => {
  // request request to backend to get the data
  ipcRenderer.send("export-to-excel", excelData);

  // listen when the data comes back
  return ipcRenderer.once("excel-exported", (event, arg) => {
    if (arg.error) {
      // send the error to the notification center
      toast.error(arg.error, {
        onOpen: () => playSound(soundTypes.error)
      });
    } else {
      // send the error to the notification center
      toast.success("ייצוא לקובץ אקסל בוצע בהצלחה.", {
        onOpen: () => playSound(soundTypes.message)
      });
    } // end else
  });
};