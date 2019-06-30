import Helper from '../Helper';

const headerStyle = {
  fill: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '000000' }
  },
  font: {
    name: 'Arial',
    color: "FFFFFF",
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
      pageSetup: { fitToPage: true, fitToHeight: 5, fitToWidth: 7 }
    }
  );

  //worksheet headers
  sheet.columns = [
    { header: 'קוד הנהח"ש', key: 'code', width: 15 },
    { header: 'שם חשבון', key: 'codeName', width: 20 },
    { header: 'שם הספק', key: 'supplierName', width: 20 },
    { header: 'סכום', key: 'sum', width: 15 },
    { header: 'הערות', key: 'notes', width: 20 }
  ];

  //get the first row of headers
  const headerRow = sheet.getRow(1);
  //and set style to each column of header row
  headerRow.eachCell(function (cell, colNumber) {
    cell.style = headerStyle;
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

  sheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
    });
  });

  return workbook;

};
