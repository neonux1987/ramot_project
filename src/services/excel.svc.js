import { myToasts } from '../CustomToasts/myToasts';
import { ipcSendReceive } from '../redux/actions/util/util';

export const exportToExcel = (excelData) => {

  return ipcSendReceive({
    send: {
      channel: "export-to-excel",
      params: excelData
    },
    receive: {
      channel: "excel-exported"
    },
    onSuccess: () => myToasts.success("ייצוא לקובץ אקסל בוצע בהצלחה.")
  });

};

export const exportToExcelBulk = (date) => {

  return ipcSendReceive({
    send: {
      channel: "export-to-excel-bulk",
      params: date
    },
    receive: {
      channel: "excel-bulk-exported"
    },
    onSuccess: () => myToasts.success("ייצוא לקבצי אקסל בוצע בהצלחה.")
  });

};