import { ipcSendReceive } from '../redux/actions/util/util';
import { myToaster } from '../Toasts/toastManager';

export const generateEmptyReports = (date) => {

  return ipcSendReceive({
    send: {
      channel: "generate-empty-reports",
      params: { date }
    },
    receive: {
      channel: "empty-reports-generated"
    },
    onSuccess: () => myToaster.success("דוחות ריקים נוצרו בהצלחה לתאריך שבחרת.")
  });

};