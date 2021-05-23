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
      if (data.length > 0)
        toastManager.info(`לבניינים '${data.toString()}' קיימים כבר דוחות במערכת`)
      else
        toastManager.success("דוחות ריקים נוצרו בהצלחה לתאריך שבחרת.")
    }
  });

};