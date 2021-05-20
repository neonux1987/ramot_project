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
    onSuccess: () => toastManager.success("דוחות ריקים נוצרו בהצלחה לתאריך שבחרת.")
  });

};