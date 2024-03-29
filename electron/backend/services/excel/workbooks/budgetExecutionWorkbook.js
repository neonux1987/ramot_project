const Excel = require("exceljs");
const Helper = require("../../../../helpers/Helper");

const BUDGET_EXECUTION_QUARTER1_KEYS = [
  { key: "section" },
  { key: "january_budget" },
  { key: "january_budget_execution" },
  { key: "february_budget" },
  { key: "february_budget_execution" },
  { key: "march_budget" },
  { key: "march_budget_execution" },
  { key: "evaluation" },
  { key: "total_budget" },
  { key: "total_execution" },
  { key: "difference" },
  { key: "notes" }
];

const BUDGET_EXECUTION_QUARTER2_KEYS = [
  { key: "section" },
  { key: "april_budget" },
  { key: "april_budget_execution" },
  { key: "may_budget" },
  { key: "may_budget_execution" },
  { key: "june_budget" },
  { key: "june_budget_execution" },
  { key: "evaluation" },
  { key: "total_budget" },
  { key: "total_execution" },
  { key: "difference" },
  { key: "notes" }
];

const BUDGET_EXECUTION_QUARTER3_KEYS = [
  { key: "section" },
  { key: "july_budget" },
  { key: "july_budget_execution" },
  { key: "august_budget" },
  { key: "august_budget_execution" },
  { key: "september_budget" },
  { key: "september_budget_execution" },
  { key: "evaluation" },
  { key: "total_budget" },
  { key: "total_execution" },
  { key: "difference" },
  { key: "notes" }
];

const BUDGET_EXECUTION_QUARTER4_KEYS = [
  { key: "section" },
  { key: "october_budget" },
  { key: "october_budget_execution" },
  { key: "november_budget" },
  { key: "november_budget_execution" },
  { key: "december_budget" },
  { key: "december_budget_execution" },
  { key: "evaluation" },
  { key: "total_budget" },
  { key: "total_execution" },
  { key: "difference" },
  { key: "notes" }
];

const BUDGET_EXECUTION_HEADERS = [
  "סעיף",
  "תקציב",
  "ביצוע",
  "תקציב",
  "ביצוע",
  "תקציב",
  "ביצוע",
  "הערכה",
  "תקציב",
  "ביצוע",
  "הפרש",
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
    color: { argb: "FFFFFF" },
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
  const sheetTitle = `שנה ${date.year} רבעון ${date.quarter}`;
  const header = `${buildingName} / ביצוע מול תקציב / רבעון ${date.quarter} / ${date.year}`;
  //create new empty workbook
  const workbook = new Excel.Workbook();

  //workbook properties
  workbook.creator = "NDT Solutions";
  workbook.lastModifiedBy = "NDT Solutions";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  //add and config a worksheet
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
  sheet.mergeCells("A1", "L2");
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

  const months = getMonthHeaders(date.quarter);

  const A3 = sheet.getCell("A3");
  const H3 = sheet.getCell("H3");
  const K3 = sheet.getCell("K3");
  const L3 = sheet.getCell("L3");
  A3.style = headerStyle;
  H3.style = headerStyle;
  K3.style = headerStyle;
  L3.style = headerStyle;

  // month 1
  sheet.mergeCells("B3", "C3");
  const month1 = sheet.getCell("B3");
  month1.alignment = headerCellsStyles.alignment;
  month1.border = headerCellsStyles.border;
  month1.value = {
    richText: [
      {
        text: `חודש ${months[0]}`,
        font: {
          ...headerCellsStyles.font,
          color: { argb: colorSet[0].substring(1) }
        }
      }
    ]
  };
  month1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "F9F9F9" }
  };

  // month 2
  sheet.mergeCells("D3", "E3");
  const month2 = sheet.getCell("D3");
  month2.alignment = headerCellsStyles.alignment;
  month2.border = headerCellsStyles.border;
  month2.value = {
    richText: [
      {
        text: `חודש ${months[1]}`,
        font: {
          ...headerCellsStyles.font,
          color: { argb: colorSet[1].substring(1) }
        }
      }
    ]
  };
  month2.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "F9F9F9" }
  };

  //month 3
  sheet.mergeCells("F3", "G3");
  const month3 = sheet.getCell("F3");
  month3.alignment = headerCellsStyles.alignment;
  month3.border = headerCellsStyles.border;
  month3.value = {
    richText: [
      {
        text: `חודש ${months[2]}`,
        font: {
          ...headerCellsStyles.font,
          color: { argb: colorSet[2].substring(1) }
        }
      }
    ]
  };
  month3.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "F9F9F9" }
  };

  // quarter
  sheet.mergeCells("H3", "J3");
  const quarterEnd = sheet.getCell("H3");
  quarterEnd.alignment = headerCellsStyles.alignment;
  quarterEnd.border = headerCellsStyles.border;
  quarterEnd.value = {
    richText: [
      {
        text: `סוף רבעון ${date.quarter}`,
        font: {
          ...headerCellsStyles.font,
          color: { argb: colorSet[3].substring(1) }
        }
      }
    ]
  };
  quarterEnd.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "F9F9F9" }
  };

  /*Column headers*/
  sheet.getRow(4).values = BUDGET_EXECUTION_HEADERS;

  //dynamically generates headers according to
  //the specified quarter of a year
  sheet.columns = whichBudgetExecutionKeys(date.quarter);

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
    } else if (colNumber === 9 || colNumber === 10) {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" }
      };
      cell.font = {
        color: { argb: colorSet[3].substring(1) }
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

  // set columns width's
  sheet.getColumn("A").width = 16.71;
  sheet.getColumn("B").width = 10.71;
  sheet.getColumn("C").width = 10.71;
  sheet.getColumn("D").width = 10.71;
  sheet.getColumn("E").width = 10.71;
  sheet.getColumn("F").width = 10.71;
  sheet.getColumn("G").width = 10.71;
  sheet.getColumn("H").width = 10.71;
  sheet.getColumn("I").width = 10.71;
  sheet.getColumn("J").width = 10.71;
  sheet.getColumn("K").width = 10.71;
  sheet.getColumn("L").width = 18.81;

  //iterate over all difference column cells including
  //empty cells and set the following logic:
  //negative number is red
  //neutral number is yellow
  //positive number is green
  sheet.getColumn("K").eachCell(function (cell, rowNumber) {
    if (rowNumber > 4) {
      let fontColor = "ffff00";
      if (cell.value > 0) {
        fontColor = "008000";
      } else if (cell.value < 0) {
        fontColor = "ff0000";
      }

      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true
      };

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" }
      };

      cell.font = {
        name: "Arial",
        family: 2,
        color: { argb: fontColor }
      };

      cell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } }
      };
    }
  });

  return workbook;
};

function whichBudgetExecutionKeys(quarter) {
  switch (quarter) {
    case 1:
      return BUDGET_EXECUTION_QUARTER1_KEYS;
    case 2:
      return BUDGET_EXECUTION_QUARTER2_KEYS;
    case 3:
      return BUDGET_EXECUTION_QUARTER3_KEYS;
    case 4:
      return BUDGET_EXECUTION_QUARTER4_KEYS;
    default:
      return null;
  }
}

function getMonthHeaders(quarter) {
  switch (quarter) {
    case 1:
      return ["ינואר", "פברואר", "מרץ"];
    case 2:
      return ["אפריל", "מאי", "יוני"];
    case 3:
      return ["יולי", "אוגוסט", "ספטמבר"];
    case 4:
      return ["אוקטובר", "נובמבר", "דצמבר"];
    default:
      return null;
  }
}
