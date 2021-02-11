// LIBRARIES
import React from 'react';
import PropTypes from 'prop-types';
import { MoreVert, Print } from '@material-ui/icons';
import { RiFileExcel2Line } from 'react-icons/ri';
import { default as printProcess } from 'print-js';

// SERVICES
import { saveToFileDialog } from '../../services/electronDialogs.svc';
import { exportToExcel } from '../../services/excel.svc';

// CSS
import {
  pageControls,
  pageControlsButton
} from './PageControls.module.css';
import { toastManager } from '../../toasts/ToastManager';
import ButtonWithSound from '../../componentsWithSound/ButtonWithSound/ButtonWithSound';
import useModalLogic from '../../customHooks/useModalLogic';
import PrintModal from '../modals/PrintModal/PrintModal';
import { saveToPdf } from '../../services/print.svc';

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
    <div id="page-controls" className={pageControls} style={style}>
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

const ExcelButton = ({ onClick }) => <ButtonWithSound
  className={pageControlsButton}
  onClick={onClick}
>
  <RiFileExcel2Line style={{ color: "fafafa", fontSize: "24px", filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.1))" }} />
</ButtonWithSound>;

const PrintButton = ({ onClick }) => <ButtonWithSound
  className={pageControlsButton}
  onClick={onClick}
>
  <Print style={{ color: "#fafafa", fontSize: "26px", filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.1))" }} />
</ButtonWithSound>;

const MoreButton = ({ onClick }) =>
  <ButtonWithSound
    className={pageControlsButton}
    onClick={onClick}
  >
    <MoreVert style={{ color: "#fafafa", fontSize: "26px", filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.1))" }} />
  </ButtonWithSound>;