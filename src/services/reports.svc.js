import React from "react";
import { toastManager } from "../toasts/toastManager";
import { ipcSendReceive } from "../redux/actions/util/util";
import ToastRender from "../components/ToastRender/ToastRender";

export const exportToExcel = (excelData) => {
  const id = toastManager.info(
    <ToastRender spinner={true} message={"בתהליך ייצוא לקובץ אקסל..."} />,
    {
      autoClose: false
    }
  );

  return ipcSendReceive({
    send: {
      channel: "export-to-excel",
      params: excelData
    },
    receive: {
      channel: "excel-exported"
    },
    onSuccess: () => {
      toastManager.update(id, {
        render: <ToastRender message={"ייצוא לקובץ אקסל בוצע בהצלחה"} />,
        type: toastManager.types.SUCCESS,
        delay: 2000,
        autoClose: 2500
      });
    }
  });
};

export const exportChart = (params) => {
  return ipcSendReceive({
    send: {
      channel: "export-chart",
      params
    },
    receive: {
      channel: "chart-exported"
    },
    onSuccess: () => toastManager.success("ייצוא לקובץ אקסל בוצע בהצלחה.")
  });
};

export const exportReports = (date, buildings) => {
  const toastId = toastManager.info(
    <ToastRender spinner={true} message={"מייצא דוחות..."} />,
    {
      autoClose: false
    }
  );

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
    onSuccess: () =>
      toastManager.update(toastId, {
        render: <ToastRender done={true} message={"הייצוא בוצע בהצלחה"} />,
        type: toastManager.types.SUCCESS,
        autoClose: 3000
      })
  });
};
