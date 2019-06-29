import Helper from '../Helper';

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
    { header: 'קוד הנהח"ש', key: 'code' },
    { header: 'שם חשבון', key: 'codeName' },
    { header: 'שם הספק', key: 'supplierName' },
    { header: 'סכום', key: 'sum' },
    { header: 'הערות', key: 'notes' }
  ];

  const headerRow = sheet.getRow(1);

  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '000000' },
  }

  headerRow.font = {
    name: 'Arial',
    color: { argb: 'FFFFFF' },
    family: 2,
    size: 11,
    bold: true
  };

  sheet.getRow(2).font = {
    name: 'Arial',
    color: { argb: '000000' },
    family: 2,
    size: 11
  };

  sheet.columns.forEach(column => {
    column.width = column.header.length < 15 ? 15 : column.header.length + 2
  })

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

  return workbook;

};
