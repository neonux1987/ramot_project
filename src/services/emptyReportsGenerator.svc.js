import { ipcSendReceive } from '../redux/actions/util/util';
import { myToasts } from '../CustomToasts/myToasts';

export const generateEmptyReports = (date) => {

  return ipcSendReceive({
    send: {
      channel: "generate-empty-reports",
      params: { date }
    },
    receive: {
      channel: "empty-reports-generated"
    },
    onSuccess: () => myToasts.success("דוחות ריקים נוצרו בהצלחה לתאריך שבחרת."),
    onError: (result) => myToasts.error(result.error)
  });

};