// LIBRARIES
import React, { useCallback } from "react";
import { css } from "emotion";
import classnames from "classnames";

// SERVICES
import { saveToFileDialog } from "../../services/electronDialogs.svc";
import { exportToExcel } from "../../services/reports.svc";
import { toastManager } from "../../toasts/toastManager";
import useModalLogic from "../../customHooks/useModalLogic";

// COMPONENTS
import PrintModal from "../modals/PrintModal/PrintModal";
import ExcelButton from "../buttons/ExcelButton";
import PrintButton from "../buttons/PrintButton";
import { useDispatch } from "react-redux";
import { setPrintMode } from "../../redux/actions/printActions";

const _container = css`
  float: left;
  margin: 0 20px 0 0;
  display: flex;
  align-items: center;
`;

const _hide = css`
  display: none;
`;

const _show = css`
  display: flex;
`;

let options = {
  filters: [{ name: "Excel", extensions: ["xlsx"] }]
};

const PageControls = (props) => {
  const { excel, print, pageName, style, dataExist = false } = props;

  const show = dataExist ? _show : _hide;

  const { showModal, hideModal } = useModalLogic();

  const dispatch = useDispatch();

  const onClose = useCallback(() => hideModal(), [hideModal]);

  const exportToExcelHandler = () => {
    if (excel.date.year === undefined) toastManager.info("לא נבחר דוח לייצוא");
    else
      saveToFileDialog(excel.fileName, options).then(
        ({ canceled, filePath }) => {
          if (!canceled) {
            excel.fileName = filePath;
            excel.pageName = pageName;
            exportToExcel(excel);
          }
        }
      );
  };

  return (
    <div
      id="page-controls"
      className={classnames(_container, show)}
      style={style}
    >
      {excel && <ExcelButton onClick={exportToExcelHandler} />}

      {print && (
        <PrintButton
          onClick={() => {
            dispatch(setPrintMode(true));

            showModal(PrintModal, {
              ...print,
              onClose
            });
          }}
        />
      )}

      {/* <MoreButton onClick={() => { }} /> */}
    </div>
  );
};

export default React.memo(PageControls);
