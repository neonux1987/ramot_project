const Excel = require('exceljs');
const Helper = require('../../../../helpers/Helper');

const headerStyle = {
  fill: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '000000' }
  },
  font: {
    name: 'Arial',
    color: { argb: 'FFFFFF' },
    family: 2,
    size: 11
  }
}

module.exports = (
  buildingName,
  date,
  data
) => {

  const sheetTitle = `שנה ${date.year} חודש ${date.monthHeb}`;
  const header = `${buildingName} / הוצאות חודש ${date.monthHeb} / ${date.year}`;

  //create new empty workbook
  const workbook = new Excel.Workbook();

  //workbook properties
  workbook.creator = 'NDT Solutions';
  workbook.lastModifiedBy = 'NDT Solutions';
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  //add a worksheet
  var sheet = workbook.addWorksheet(sheetTitle,
    {
      properties: {
        tabColor: { argb: 'FFC0000' }
      },
      views: [
        { rightToLeft: true }
      ],
      pageSetup: { paperSize: 9, orientation: 'portrait' }
    }
  );

  // adjust pageSetup settings afterwards
  sheet.pageSetup.margins = {
    left: 0.24, right: 0.24,
    top: 0.35, bottom: 0.35,
    header: 0.3, footer: 0.3
  };

  // Repeat specific rows on every printed page
  //sheet.pageSetup.printTitlesRow = '1:1';

  //merge cells for the header
  sheet.mergeCells('A1', 'E2');
  const headerCell = sheet.getCell('A1');

  //set title
  headerCell.value = header;

  //set background style
  headerCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFF' }
  };

  //set font style
  headerCell.font = {
    name: 'Arial',
    color: { argb: '1b75bc' },
    family: 2,
    size: 24
  }

  //set alignment
  headerCell.alignment = {
    vertical: 'middle',
    horizontal: 'center'
  }

  /*Column headers*/
  sheet.getRow(3).values = ['קוד הנהח"ש', 'שם חשבון', 'ספק', 'סכום', 'הערות'];

  //worksheet headers
  sheet.columns = [
    { key: 'code', width: 12.14 },
    { key: 'codeName', width: 19.29 },
    { key: 'supplierName', width: 18.55 },
    { key: 'sum', width: 14.45 },
    { key: 'notes', width: 33.71 }
  ];

  //get the first row of headers
  //and set style to each column of header row
  sheet.getRow(3).eachCell(function (cell, colNumber) {
    cell.style = headerStyle;
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
    cell.border = {
      top: { style: 'thin', color: { argb: '000000' } },
      left: { style: 'thin', color: { argb: '000000' } },
      bottom: { style: 'thin', color: { argb: '000000' } },
      right: { style: 'thin', color: { argb: '000000' } }
    }
  });

  data.forEach((row) => {
    Helper.replaceZeroWithEmpty(row);
    sheet.addRow({
      code: row.code,
      codeName: row.codeName,
      supplierName: row.supplierName,
      sum: row.sum,
      notes: row.notes
    });
  });

  sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber > 3) {
      row.eachCell((cell) => {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true,
          indent: 1
        }
        cell.style.font = {
          name: 'Arial',
          color: { argb: '000000' },
          family: 2,
          size: 11
        };
        cell.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
        }
      });
    }
  });

  /* const newData = data.map(obj => {

    // delete the unneccassery fields
    delete obj.summarized_section_id;
    delete obj.month;
    delete obj.year;
    delete obj.id;
    delete obj.expanses_code_id;
    delete obj.tax;
    delete obj.section

    // replace 0 with empty
    if (obj.sum === 0)
      obj.sum = "";

    return Object.values(obj)
  });

  // add a table to a sheet
  sheet.addTable({
    name: 'MyTable',
    ref: 'A3',
    headerRow: true,
    style: {
      theme: null
    },
    columns: [
      { name: 'קוד הנהח"ש' },
      { name: 'שם חשבון' },
      { name: 'ספק' },
      { name: 'סכום' },
      { name: 'הערות' },
    ],
    rows: newData,
  }); */

  return Promise.resolve(workbook);

};
