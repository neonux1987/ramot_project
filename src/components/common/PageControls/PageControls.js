import React from 'react';
import PropTypes from 'prop-types';
import saveToFile from '../../../helpers/saveToFile';
import { default as excelProcess } from '../../../helpers/excel';
import { default as printProcess } from 'print-js';
import defaultStyles from './PageControls.module.css';

const PageControls = ({ excel, print, pageName, styles, ...props }) => {
  const exportToExcel = () => {
    saveToFile(excel.fileName, (fullPath) => {
      if (fullPath)
        excelProcess(fullPath, excel.tabName, pageName, excel.data, excel.date);
    });
  }

  return (
    <div id="page-controls" className={styles && styles.pageControls ? styles.pageControls : defaultStyles.pageControls}>
      <button className={styles && styles.pageControlsButton ? styles.pageControlsButton : defaultStyles.pageControlsButton} onClick={excel.handler ? excel.handler : exportToExcel}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="-1 -1 16 16">
          <path id="file_type_excel.svg" fill="#43ab35"
            d="M13.4,8.488H11.172V7.349H13.4v1.14Zm0,0.651H11.172v1.14H13.4V9.14Zm0-5.372H11.172v1.14H13.4V3.767Zm0,1.791H11.172V6.7H13.4V5.558Zm0,5.372H11.172v1.14H13.4V10.93Zm1.537,2.247a0.643,0.643,0,0,1-.727.358H9.264V15H8.277L1,13.7V2.3L8.319,1H9.264V2.3h4.774a1.435,1.435,0,0,1,.8.156A1.526,1.526,0,0,1,15,3.277l-0.006,8.475A7.612,7.612,0,0,1,14.935,13.177Zm-8.1-2.554C6.391,9.711,5.944,8.806,5.507,7.894Q6.156,6.563,6.79,5.226q-0.541.027-1.081,0.067C5.44,5.962,5.127,6.613,4.917,7.3c-0.2-.653-0.455-1.281-0.692-1.918Q3.7,5.417,3.176,5.449C3.545,6.283,3.938,7.1,4.3,7.943,3.874,8.757,3.48,9.582,3.072,10.4c0.348,0.015.7,0.029,1.045,0.034,0.248-.648.556-1.271,0.773-1.932a19.494,19.494,0,0,0,.793,2.045C6.065,10.575,6.447,10.6,6.83,10.623Zm7.407-7.552H9.264v0.7h1.272v1.14H9.264V5.558h1.272V6.7H9.264V7.349h1.272v1.14H9.264V9.14h1.272v1.14H9.264V10.93h1.272v1.14H9.264v0.753h4.973V3.071Z"
            transform="translate(-1 -1)" />
        </svg>

      </button>
      <button className={styles && styles.pageControlsButton ? styles.pageControlsButton : defaultStyles.pageControlsButton} onClick={() => printProcess({
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
      })}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#5169e0" d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
      </button>
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