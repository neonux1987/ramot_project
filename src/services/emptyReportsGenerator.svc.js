import { ipcSendReceive } from '../redux/actions/util/util';
import { toastManager } from '../toasts/toastManager';

export const generateEmptyReports = (date, buildings) => {

  return ipcSendReceive({
    send: {
      channel: "generate-empty-reports",
      params: { date, buildings }
    },
    receive: {
      channel: "empty-reports-generated"
    },
    onSuccess: () => toastManager.success("דוחות ריקים נוצרו בהצלחה לתאריך שבחרת.")
  });

};