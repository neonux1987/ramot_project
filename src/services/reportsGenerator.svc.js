import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

export const generateEmptyReports = (date) => {
  // request request to backend to get the data
  ipcRenderer.send("generate-empty-reports", { date });

  return new Promise((resolve, reject) => {
    // listen when the data comes back
    ipcRenderer.once("empty-reports-generated", (event, arg) => {
      if (arg.error) {
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        toast.success("דוחות ריקים נוצרו בהצלחה לתאריך שבחרת.", {
          onOpen: () => playSound(soundTypes.error)
        });
      } // end else
    });
  })
};