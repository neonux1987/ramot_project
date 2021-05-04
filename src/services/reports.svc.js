import React from 'react';
import { toastManager } from '../toasts/toastManager';
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
    onSuccess: () => toastManager.success("ייצוא לקובץ אקסל בוצע בהצלחה.")
  });

};

export const exportReports = (date, buildings) => {

  const toastId = toastManager.info(<ToastRender spinner={true} message={"מייצא דוחות..."} />, {
    autoClose: false
  });

  return ipcSendReceive({
    send: {
      channel: "export-reports",
      params: {
        date,
        buildings
      }
    },
    receive: {
      channel: "reports-exported"
    },
    onSuccess: () => toastManager.update(toastId, {
      render: <ToastRender done={true} message={"הייצוא בוצע בהצלחה"} />,
      type: toastManager.types.SUCCESS,
      delay: 2000,
      autoClose: 3000
    })
  });

};