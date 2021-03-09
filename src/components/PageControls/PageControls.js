// LIBRARIES
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

// SERVICES
import { saveToFileDialog } from '../../services/electronDialogs.svc';
import { exportToExcel } from '../../services/excel.svc';
import { toastManager } from '../../toasts/toastManager';
import useModalLogic from '../../customHooks/useModalLogic';
import { saveToPdf } from '../../services/print.svc';

// COMPONENTS
import PrintModal from '../modals/PrintModal/PrintModal';
import ExcelButton from '../buttons/ExcelButton';
import PrintButton from '../buttons/PrintButton';
import MoreButton from '../buttons/MoreButton';

const _container = css`
  float: left;
  margin: 0 20px 0 0;
  display: flex;
  align-items: center;
`;

let options = {
  filters: [
    { name: 'Excel', extensions: ['xlsx'] }
  ]
};

const PageControls = props => {
  const {
    excel,
    print,
    pageName,
    style
  } = props;

  const { showModal, hideModal } = useModalLogic();

  const exportToExcelHandler = () => {
    if (excel.date.year === undefined)
      toastManager.info("לא נבחר דוח לייצוא")
    else
      saveToFileDialog(excel.fileName, options).then(({ canceled, filePath }) => {
        if (!canceled) {
          excel.fileName = filePath;
          excel.pageName = pageName;
          exportToExcel(excel);
        }
      });
  }

  return (
    <div id="page-controls" className={_container} style={style}>
      <ExcelButton onClick={exportToExcelHandler} />

      <PrintButton
        onClick={
          () => {
            /* saveToPdf(); */
            showModal(PrintModal, {
              ...print,
              onClose: () => hideModal()
            });
          }
        }
      />

      <MoreButton onClick={() => { }} />
    </div>);
}

PageControls.propTypes = {
  excel: PropTypes.shape({
    handler: PropTypes.func,
    data: PropTypes.array.isRequired,
    fileName: PropTypes.string.isRequired
  }).isRequired,
  print: PropTypes.shape({
    handler: PropTypes.func,
    title: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired
  }).isRequired,
  pageName: PropTypes.string.isRequired,
};

export default PageControls;