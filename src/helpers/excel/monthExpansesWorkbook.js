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
    { header: 'קוד הנהח"ש', key: 'code', width: 30, style: { bgColor: { argb: 'FF0000FF' } } },
    { header: 'שם חשבון', key: 'codeName', width: 30, style: { bgColor: { argb: 'FF0000FF' } } },
    { header: 'שם הספק', key: 'supplierName', width: 30, outlineLevel: 1, style: { bgColor: { argb: 'FF0000FF' } } },
    { header: 'סכום', key: 'sum', width: 30, style: { bgColor: { argb: 'FF0000FF' } } },
    { header: 'הערות', key: 'notes', width: 30, style: { bgColor: { argb: 'FF0000FF' } } }
  ];

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
