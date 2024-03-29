const Excel = require("exceljs");
const Helper = require("../../../../helpers/Helper");

const headerStyle = {
  fill: {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "F9F9F9" }
  },
  font: {
    name: "Arial",
    color: { argb: "000000" },
    family: 2,
    size: 11,
    bold: true
  }
};

module.exports = async (buildingName, date, data) => {
  const sheetTitle = `שנה ${date.year} חודש ${date.monthHeb}`;
  const header = `${buildingName} / הוצאות חודש ${date.monthHeb} / ${date.year}`;

  //create new empty workbook
  const workbook = new Excel.Workbook();

  //workbook properties
  workbook.creator = "NDT Solutions";
  workbook.lastModifiedBy = "NDT Solutions";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  //add a worksheet
  var sheet = workbook.addWorksheet(sheetTitle, {
    properties: {
      tabColor: { argb: "FFC0000" },
      defaultRowHeight: 20
    },
    views: [{ rightToLeft: true }],
    pageSetup: {
      paperSize: 9,
      orientation: "portrait",
      fitToWidth: 1,
      fitToHeight: 0,
      fitToPage: true,
      margins: {
        left: 0.2,
        right: 0.2,
        top: 0.2,
        bottom: 0.2,
        header: 0,
        footer: 0
      }
    }
  });

  //sheet.pageSetup.printArea = 'A1:E58';

  // Repeat specific rows on every printed page
  sheet.pageSetup.printTitlesRow = "3:3";

  // Set footer (default centered), result: "Page 2 of 16"
  sheet.headerFooter.oddFooter = "&N עמוד &P מתוך";

  //merge cells for the header
  sheet.mergeCells("A1", "E2");
  const headerCell = sheet.getCell("A1");

  //set title
  headerCell.value = header;

  //set background style
  headerCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFF" }
  };

  //set font style
  headerCell.font = {
    name: "Arial",
    color: { argb: "000000" },
    family: 2,
    size: 24
  };

  //set alignment
  headerCell.alignment = {
    vertical: "middle",
    horizontal: "center"
  };

  /*Column headers*/
  sheet.getRow(3).values = ['קוד הנהח"ש', "שם חשבון", "ספק", "סכום", "הערות"];

  //worksheet headers
  sheet.columns = [
    { key: "code", width: 12.85 }, // real 12.14
    { key: "codeName", width: 20 }, // real 19.29
    { key: "supplierName", width: 19.26 }, // real 18.55
    { key: "sum", width: 15.16 }, // real 14.45
    { key: "notes", width: 31.57 } // real 30.86
  ];

  //get the first row of headers
  //and set style to each column of header row
  sheet.getRow(3).eachCell(function (cell, colNumber) {
    cell.style = headerStyle;
    cell.alignment = {
      vertical: "middle",
      horizontal: "center"
    };
    cell.border = {
      top: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } }
    };
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
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
          indent: 1
        };
        cell.style.font = {
          name: "Arial",
          color: { argb: "000000" },
          family: 2,
          size: 11
        };
        cell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } }
        };
      });
    }
  });

  return workbook;
};
