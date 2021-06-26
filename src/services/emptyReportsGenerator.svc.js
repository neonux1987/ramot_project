import { ipcRenderer } from 'electron';
import { ipcSendReceive } from '../redux/actions/util/util';
import { toastManager } from '../toasts/toastManager';

export const generateEmptyReports = (params) => {

  return ipcSendReceive({
    send: {
      channel: "generate-empty-reports",
      params
    },
    receive: {
      channel: "empty-reports-generated"
    },
    onSuccess: ({ data }) => {
      const {
        existingReportsBuidlings,
        createdReportsBuidlings
      } = data;

      if (existingReportsBuidlings.length > 0)
        toastManager.warning(`לבניינים '${existingReportsBuidlings.toString()}' לא נוצרו דוחות לתאריך הנבחר מאחר וקיימים כבר במערכת`);

      if (createdReportsBuidlings.length > 0) {
        toastManager.info(`דוחות ריקים נוצרו בהצלחה לבניינים ${createdReportsBuidlings.toString()}`);
        ipcRenderer.send("refresh-renderer");
      }

    }
  });

};