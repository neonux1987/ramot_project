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

export default (workbook, sheetTitle, data) => {

  //workbook properties
  workbook.creator = 'NDT Solutions';
  workbook.lastModifiedBy = 'NDT Solutions';
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date(2016, 9, 27);

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
  sheet.pageSetup.printTitlesRow = '1:1';

  sheet.mergeCells('A2', 'E3');
  const mergedCell = sheet.getCell('A2');
  //set title
  mergedCell.value = "לב תל אביב - הוצאות חודש יולי - 2019";
  //set background style
  mergedCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFF' }
  };
  //set font style
  mergedCell.font = {
    name: 'Arial',
    color: { argb: '000000' },
    family: 2,
    size: 18
  }
  //set alignment
  mergedCell.alignment = {
    vertical: 'middle',
    horizontal: 'center'
  }

  /*Column headers*/
  sheet.getRow(5).values = ['code', 'codeName', 'supplierName', 'sum', 'notes'];

  //worksheet headers
  sheet.columns = [
    { key: 'code', width: 15 },
    { key: 'codeName', width: 20 },
    { key: 'supplierName', width: 20 },
    { key: 'sum', width: 15 },
    { key: 'notes', width: 20 }
  ];

  //get the first row of headers
  //and set style to each column of header row
  sheet.getRow(5).eachCell(function (cell, colNumber) {
    cell.style = headerStyle;
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center'
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
    if (rowNumber > 5) {
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
      });
    }
  });

  return workbook;

};
