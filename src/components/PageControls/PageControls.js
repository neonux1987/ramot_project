// LIBRARIES
import React from 'react';
import PropTypes from 'prop-types';
import { default as printProcess } from 'print-js';
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
  //Placeholder 3
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
          /* printProcess({
            documentTitle: print.title,
            printable: pageName,
            type: 'html',
            //properties: [
            //  { field: 'id', displayName: 'ספרור' },
            //  { field: 'code', displayName: 'קוד הנהח"ש' },
            //  { field: 'codeName', displayName: 'שם חשבון' },
            //  { field: 'supplierName', displayName: 'ספק' },
            //  { field: 'sum', displayName: 'סכום' },
            // { field: 'notes', displayName: 'הערות' }
            //],
            header: print.pageTitle,
            gridHeaderStyle: 'color: #000;  border: 1px solid #000000;',
            gridStyle: 'border: 1px solid #000000;',
            css: './../assets/css/print.css',
            //ignoreElements: ['page-controls', 'inputExpanses', 'dates'],
            font: 'arial',
            font_size: '14px',
            scanStyles: false,
            repeatTableHeader: true
          }) */
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