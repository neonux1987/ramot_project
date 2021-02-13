import { ipcSendReceive } from '../redux/actions/util/util';
import { toastManager } from '../toasts/toastManager';

export const generateEmptyReports = (date) => {

  return ipcSendReceive({
    send: {
      channel: "generate-empty-reports",
      params: { date }
    },
    receive: {
      channel: "empty-reports-generated"
    },
    onSuccess: () => toastManager.success("דוחות ריקים נוצרו בהצלחה לתאריך שבחרת.")
  });

};