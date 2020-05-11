import React from 'react';
import { myToasts } from '../CustomToasts/myToasts';
import { ipcSendReceive } from '../redux/actions/util/util';
import ToastRender from '../components/ToastRender/ToastRender';

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

  const toastId = myToasts.info(<ToastRender spinner={true} message={"מבצע ייצוא לקבצי אקסל..."} />, {
    autoClose: false
  });

  return ipcSendReceive({
    send: {
      channel: "export-to-excel-bulk",
      params: date
    },
    receive: {
      channel: "excel-bulk-exported"
    },
    onSuccess: () => myToasts.update(toastId, {
      render: <ToastRender done={true} message={"ייצוא לקבצי אקסל בוצע בהצלחה."} />,
      type: myToasts.TYPE.SUCCESS,
      delay: 2000,
      autoClose: 3000
    })
  });

};