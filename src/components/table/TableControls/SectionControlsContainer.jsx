import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useModalLogic from "../../../customHooks/useModalLogic";
import { toggleFullScreenMode } from "../../../redux/actions/fullscreenActions";
import { setPrintMode } from "../../../redux/actions/printActions";
import { saveToFileDialog } from "../../../services/electronDialogs.svc";
import { exportToExcel } from "../../../services/reports.svc";
import { toastManager } from "../../../toasts/toastManager";
import PrintModalWrapper from "../../modals/PrintModal/PrintModalWrapper";
import SectionControls from "./SectionControls";

let excelDiaogOptions = {
  filters: [{ name: "Excel", extensions: ["xlsx"] }]
};

const SectionControlsContainer = ({
  style,
  withFullscreen,
  edit,
  editModeProps,
  addNew,
  addNewModeProps,
  print,
  printProps,
  excel,
  excelProps
}) => {
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);

  const dispatch = useDispatch();
  const { showModal, hideModal } = useModalLogic();

  const onClose = useCallback(() => hideModal(PrintModalWrapper), [hideModal]);

  const OnFullscreenClick = useCallback(() => {
    dispatch(toggleFullScreenMode());
  }, [dispatch]);

  const onPrintClick = () => {
    if (editModeProps && editModeProps.editMode) editModeProps.toggleEditMode();

    dispatch(setPrintMode(true));

    showModal(PrintModalWrapper, {
      ...printProps,
      onClose
    });
  };

  const exportToExcelHandler = () => {
    const { date, fileName } = excelProps;
    if (date.year === undefined) toastManager.info("לא נבחר דוח לייצוא");
    else
      saveToFileDialog(fileName, excelDiaogOptions).then(
        ({ canceled, filePath }) => {
          if (!canceled) {
            excelProps.fileName = filePath;
            exportToExcel(excelProps);
          }
        }
      );
  };

  return (
    <SectionControls
      isFullscreen={isFullscreen}
      style={style}
      withFullscreen={withFullscreen}
      OnFullscreenClick={OnFullscreenClick}
      edit={edit}
      editModeProps={editModeProps}
      addNew={addNew}
      addNewModeProps={addNewModeProps}
      print={print}
      printProps={{ ...printProps, onPrintClick }}
      excel={excel}
      excelProps={{ ...excelProps, exportToExcelHandler }}
    />
  );
};

export default React.memo(SectionControlsContainer);
