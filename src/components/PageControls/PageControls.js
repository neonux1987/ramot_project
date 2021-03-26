// LIBRARIES
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import classnames from 'classnames';

// SERVICES
import { saveToFileDialog } from '../../services/electronDialogs.svc';
import { exportToExcel } from '../../services/excel.svc';
import { toastManager } from '../../toasts/toastManager';
import useModalLogic from '../../customHooks/useModalLogic';

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

const _hide = css`
  display: none;
`;

const _show = css`
  display: flex;
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
    style,
    dataExist = false
  } = props;

  const show = dataExist ? _show : _hide;

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
    <div id="page-controls" className={classnames(_container, show)} style={style}>
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

      {/* <MoreButton onClick={() => { }} /> */}
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