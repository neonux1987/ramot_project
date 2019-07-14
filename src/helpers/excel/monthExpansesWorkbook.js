import Helper from '../Helper';

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

export default (
  workbook = Object,
  excel = {
    fileName: String,
    sheetTitle: String,
    header: String,
    date: Object,
  }
) => {
  //workbook properties
  workbook.creator = 'NDT Solutions';
  workbook.lastModifiedBy = 'NDT Solutions';
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  //add a worksheet
  var sheet = workbook.addWorksheet(excel.sheetTitle,
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
  headerCell.value = excel.header;
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
    { key: 'code', width: 4.5 },
    { key: 'codeName', width: 10 },
    { key: 'supplierName', width: 9.8 },
    { key: 'sum', width: 4.5 },
    { key: 'notes', width: 13 }
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

  excel.data.forEach((row) => {
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
          horizontal: 'center'
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

  return workbook;

};
