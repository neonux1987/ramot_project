const Excel = require("exceljs");
const Helper = require("../../../../helpers/Helper");

const KEYS = [
  { key: "section", width: 15 },
  { key: "quarter1_budget" },
  { key: "quarter1_execution" },
  { key: "quarter2_budget" },
  { key: "quarter2_execution" },
  { key: "quarter3_budget" },
  { key: "quarter3_execution" },
  { key: "quarter4_budget" },
  { key: "quarter4_execution" },
  { key: "evaluation" },
  { key: "year_total_budget" },
  { key: "year_total_execution" },
  { key: "notes", width: 15 }
];

const HEADERS = [
  "סעיף",
  "תקציב",
  "ביצוע",
  "תקציב",
  "ביצוע",
  "תקציב",
  "ביצוע",
  "תקציב",
  "ביצוע",
  "הערכה",
  "תקציב",
  "ביצוע",
  "הערות"
];

const headerStyle = {
  fill: {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFF" }
  },
  font: {
    name: "Arial",
    color: { argb: "000000" },
    family: 2,
    size: 11
  },
  border: {
    top: { style: "thin", color: { argb: "000000" } },
    left: { style: "thin", color: { argb: "000000" } },
    bottom: { style: "thin", color: { argb: "000000" } },
    right: { style: "thin", color: { argb: "000000" } }
  }
};

module.exports = async (buildingName, date, data, colorSet) => {
  const sheetTitle = `שנה ${date.year}`;
  const header = `${buildingName} / סיכום שנתי / ${date.year}`;

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
      orientation: "landscape",
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

  // Repeat specific rows on every printed page
  sheet.pageSetup.printTitlesRow = "3:4";

  // Set footer (default centered), result: "Page 2 of 16"
  sheet.headerFooter.oddFooter = "&N עמוד &P מתוך";

  const headerCellsStyles = {
    font: {
      name: "Arial",
      color: { argb: "000000" },
      family: 2,
      size: 11,
      bold: true
    },
    alignment: {
      vertical: "middle",
      horizontal: "center"
    },
    border: {
      top: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } }
    }
  };

  //merge cells for the header
  sheet.mergeCells("A1", "M2");
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
  headerCell.alignment = headerCellsStyles.alignment;

  const A3 = sheet.getCell("A3");
  const J3 = sheet.getCell("J3");
  const M3 = sheet.getCell("M3");
  A3.style = headerStyle;
  J3.style = headerStyle;
  M3.style = headerStyle;

  // quarter 1
  sheet.mergeCells("B3", "C3");
  const quarter1 = sheet.getCell("B3");
  quarter1.alignment = headerCellsStyles.alignment;
  quarter1.border = headerCellsStyles.border;
  quarter1.value = {
    richText: [
      {
        text: "רבעון 1",
        font: {
          ...headerCellsStyles.font,
          color: { argb: colorSet[0].substring(1) }
        },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "F9F9F9" }
        }
      }
    ]
  };

  // quarter 2
  sheet.mergeCells("D3", "E3");
  const quarter2 = sheet.getCell("D3");
  quarter2.alignment = headerCellsStyles.alignment;
  quarter2.border = headerCellsStyles.border;
  quarter2.value = {
    richText: [
      {
        text: "רבעון 2",
        font: {
          ...headerCellsStyles.font,
          color: { argb: colorSet[1].substring(1) }
        },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "F9F9F9" }
        }
      }
    ]
  };

  // quarter 3
  sheet.mergeCells("F3", "G3");
  const quarter3 = sheet.getCell("F3");
  quarter3.alignment = headerCellsStyles.alignment;
  quarter3.border = headerCellsStyles.border;
  quarter3.value = {
    richText: [
      {
        text: "רבעון 3",
        font: {
          ...headerCellsStyles.font,
          color: { argb: colorSet[2].substring(1) }
        },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "F9F9F9" }
        }
      }
    ]
  };

  // quarter 4
  sheet.mergeCells("H3", "I3");
  const quarter4 = sheet.getCell("H3");
  quarter4.alignment = headerCellsStyles.alignment;
  quarter4.border = headerCellsStyles.border;
  quarter4.value = {
    richText: [
      {
        text: "רבעון 4",
        font: {
          ...headerCellsStyles.font,
          color: { argb: colorSet[3].substring(1) }
        },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "F9F9F9" }
        }
      }
    ]
  };

  // end of year
  sheet.mergeCells("J3", "L3");
  const yearEnd = sheet.getCell("J3");
  yearEnd.alignment = headerCellsStyles.alignment;
  yearEnd.border = headerCellsStyles.border;
  yearEnd.value = {
    richText: [
      {
        text: `סוף שנה ${date.year}`,
        font: {
          ...headerCellsStyles.font,
          color: { argb: colorSet[4].substring(1) }
        },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "F9F9F9" }
        }
      }
    ]
  };

  /*Column headers*/
  sheet.getRow(4).values = HEADERS;

  //dynamically generates headers according to
  //the specified quarter of a year
  sheet.columns = KEYS;

  //get the first row the headers
  //and set style to each column of header row
  const headerRow = sheet.getRow(4);

  headerRow.eachCell(function (cell, colNumber) {
    if (colNumber === 2 || colNumber === 3) {
      //paint columns according to months colors
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" }
      };
      cell.font = {
        color: { argb: colorSet[0].substring(1) }
      };
    } else if (colNumber === 4 || colNumber === 5) {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" }
      };
      cell.font = {
        color: { argb: colorSet[1].substring(1) }
      };
    } else if (colNumber === 6 || colNumber === 7) {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" }
      };
      cell.font = {
        color: { argb: colorSet[2].substring(1) }
      };
    } else if (colNumber === 8 || colNumber === 9) {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" }
      };
      cell.font = {
        color: { argb: colorSet[3].substring(1) }
      };
    } else if (colNumber === 11 || colNumber === 12) {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" }
      };
      cell.font = {
        color: { argb: colorSet[4].substring(1) }
      };
    } else {
      cell.style = headerStyle;
    }

    cell.font = headerCellsStyles.font;
    cell.border = headerCellsStyles.border;
    cell.alignment = {
      vertical: "middle",
      horizontal: "center"
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "F9F9F9" }
    };
  });

  //replace zero with empty string for esthetics
  data.forEach((row) => {
    Helper.replaceZeroWithEmpty(row);
    // instead of null to make the borders appear
    row.notes = row.notes === null ? "" : row.notes;
    sheet.addRow(row);
  });

  sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber > 4) {
      row.eachCell((cell) => {
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
          indent: 1
        };
        cell.font = {
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

  sheet.getColumn("A").width = 16.0; // real 15.29
  sheet.getColumn("B").width = 10.0; //real 9.29
  sheet.getColumn("C").width = 10.0; //real 9.29
  sheet.getColumn("D").width = 10.0; //real 9.29
  sheet.getColumn("E").width = 10.0; //real 9.29
  sheet.getColumn("F").width = 10.0; //real 9.29
  sheet.getColumn("G").width = 10.0; //real 9.29
  sheet.getColumn("H").width = 10.0; //real 9.29
  sheet.getColumn("I").width = 10.0; //real 9.29
  sheet.getColumn("J").width = 10.0; //real 9.29
  sheet.getColumn("K").width = 10.0; //real 9.29
  sheet.getColumn("L").width = 10.0; //real 9.29
  sheet.getColumn("M").width = 16.71; // real 16.00

  return workbook;
};
