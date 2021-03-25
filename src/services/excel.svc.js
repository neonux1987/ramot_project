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

export const exportToExcelBulk = (date, buildings) => {

  const toastId = toastManager.info(<ToastRender spinner={true} message={"מבצע ייצוא לקבצי אקסל..."} />, {
    autoClose: false
  });

  // keep only the selected buildings
  const filteredBuildings = buildings.filter(building => building.isChecked === true);

  return ipcSendReceive({
    send: {
      channel: "export-to-excel-bulk",
      params: {
        date,
        buildings: filteredBuildings
      }
    },
    receive: {
      channel: "excel-bulk-exported"
    },
    onSuccess: () => toastManager.update(toastId, {
      render: <ToastRender done={true} message={"ייצוא לקבצי אקסל בוצע בהצלחה."} />,
      type: toastManager.types.SUCCESS,
      delay: 2000,
      autoClose: 3000
    })
  });

};