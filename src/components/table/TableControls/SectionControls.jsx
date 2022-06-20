import React from "react";
import AddNewButton from "../../buttons/AddNewButton";
import EditButton from "../../buttons/EditButton";
import ExcelButton from "../../buttons/ExcelButton";
import FullScreenButton from "../../buttons/FullScreenButton";
import PrintButton from "../../buttons/PrintButton";
import styles from "./SectionControls.module.css";

const SectionControls = ({
  style,
  withFullscreen = true,
  isFullscreen,
  OnFullscreenClick,
  edit = false,
  editModeProps = {
    toggleEditMode: Function,
    dataExist: false
  },
  addNew = false,
  addNewModeProps = {
    toggleAddNewMode: Function,
    dataExist: false
  },
  print,
  printProps = {
    onPrintClick: Function,
    dataExist: false
  },
  excel,
  excelProps = {
    exportToExcelHandler: Function,
    dataExist: false
  }
}) => {
  const show = addNewModeProps.dataExist ? styles.show : styles.hide;

  return (
    <div className={styles.wrapper} style={style} id="tableControls">
      <div className={styles.controls}>
        <div className={`${styles.rightControls} ${show}`}>
          {edit && editModeProps.dataExist && (
            <EditButton
              on={editModeProps.editMode}
              onClick={editModeProps.toggleEditMode}
            />
          )}
          {addNew && addNewModeProps.dataExist && (
            <AddNewButton
              on={addNewModeProps.addNewMode}
              onClick={addNewModeProps.toggleAddNewMode}
            />
          )}
        </div>

        <div className={styles.leftControls}>
          {excel && excelProps.dataExist && (
            <ExcelButton onClick={excelProps.exportToExcelHandler} />
          )}
          {print && printProps.dataExist && (
            <PrintButton onClick={printProps.onPrintClick} />
          )}
        </div>

        <div className={styles.fullscreen}>
          {withFullscreen && (
            <FullScreenButton
              isFullscreen={isFullscreen}
              onClick={OnFullscreenClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionControls;
