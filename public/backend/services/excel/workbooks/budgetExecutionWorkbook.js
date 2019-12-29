const Excel = require('exceljs');
const Helper = require('../../../../helpers/Helper');

const BUDGET_EXECUTION_QUARTER1_KEYS = [
  { key: 'section', width: 15 },
  { key: 'january_budget' },
  { key: 'january_budget_execution' },
  { key: 'february_budget' },
  { key: 'february_budget_execution' },
  { key: 'march_budget' },
  { key: 'march_budget_execution' },
  { key: 'evaluation' },
  { key: 'total_budget' },
  { key: 'total_execution' },
  { key: 'difference' },
  { key: 'notes', width: 15 }
];

const BUDGET_EXECUTION_QUARTER2_KEYS = [
  { key: 'section', width: 15 },
  { key: 'april_budget' },
  { key: 'april_budget_execution' },
  { key: 'may_budget' },
  { key: 'may_budget_execution' },
  { key: 'june_budget' },
  { key: 'june_budget_execution' },
  { key: 'evaluation' },
  { key: 'total_budget' },
  { key: 'total_execution' },
  { key: 'difference' },
  { key: 'notes', width: 15 }
];


const BUDGET_EXECUTION_QUARTER3_KEYS = [
  { key: 'section', width: 15 },
  { key: 'july_budget' },
  { key: 'july_budget_execution' },
  { key: 'august_budget' },
  { key: 'august_budget_execution' },
  { key: 'september_budget' },
  { key: 'september_budget_execution' },
  { key: 'evaluation' },
  { key: 'total_budget' },
  { key: 'total_execution' },
  { key: 'difference' },
  { key: 'notes', width: 15 }
];

const BUDGET_EXECUTION_QUARTER4_KEYS = [
  { key: 'section', width: 15 },
  { key: 'october_budget' },
  { key: 'october_budget_execution' },
  { key: 'november_budget' },
  { key: 'november_budget_execution' },
  { key: 'december_budget' },
  { key: 'december_budget_execution' },
  { key: 'evaluation' },
  { key: 'total_budget' },
  { key: 'total_execution' },
  { key: 'difference' },
  { key: 'notes', width: 15 }
];

const BUDGET_EXECUTION_HEADERS = [
  'סעיף',
  'תקציב',
  'ביצוע',
  'תקציב',
  'ביצוע',
  'תקציב',
  'ביצוע',
  'הערכה',
  'תקציב',
  'ביצוע',
  'הפרש',
  'הערות',
];

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
  },
  border: {
    top: { style: 'thin', color: { argb: '000000' } },
    left: { style: 'thin', color: { argb: '000000' } },
    bottom: { style: 'thin', color: { argb: '000000' } },
    right: { style: 'thin', color: { argb: '000000' } }
  }
}

module.exports = (
  {
    sheetTitle,
    header,
    date,
    data
  }) => {
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
      pageSetup: { paperSize: 9, orientation: 'landscape' }
    }
  );

  // adjust pageSetup settings afterwards
  sheet.pageSetup.margins = {
    left: 0.24, right: 0.24,
    top: 0.35, bottom: 0.35,
    header: 0.3, footer: 0.3
  };

  sheet.pageSetup.firstPageNumber = 1;
  // Repeat specific rows on every printed page
  //sheet.pageSetup.printTitlesRow = '1:1';

  const headerCellsStyles = {
    font: {
      name: 'Arial',
      color: { argb: 'FFFFFF' },
      family: 2,
      size: 11,
      bold: true
    },
    alignment: {
      vertical: 'middle',
      horizontal: 'center'
    },
    border: {
      top: { style: 'thin', color: { argb: '000000' } },
      left: { style: 'thin', color: { argb: '000000' } },
      bottom: { style: 'thin', color: { argb: '000000' } },
      right: { style: 'thin', color: { argb: '000000' } }
    }
  }

  //merge cells for the header
  sheet.mergeCells('A1', 'L2');
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
  headerCell.alignment = headerCellsStyles.alignment;

  sheet.getCell('A3').font = {
    name: 'Arial',
    color: { argb: '1b75bc' },
    family: 2,
    size: 11
  };

  const months = getMonthHeaders(date.quarter);

  //merge cells for month 1 header
  sheet.mergeCells('B4', 'C4');
  const month1 = sheet.getCell('B4');
  //set title
  month1.value = `חודש ${months[0]}`;
  //set styles
  month1.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'f04e4d' }
  };
  month1.font = headerCellsStyles.font;
  month1.alignment = headerCellsStyles.alignment;
  month1.border = headerCellsStyles.border;

  //merge cells for month 1 header
  sheet.mergeCells('D4', 'E4');
  const month2 = sheet.getCell('D4');
  //set title
  month2.value = `חודש ${months[1]}`;
  //set styles
  month2.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '1b75bc' }
  };
  month2.font = headerCellsStyles.font;
  month2.alignment = headerCellsStyles.alignment;
  month2.border = headerCellsStyles.border;

  //merge cells for month 1 header
  sheet.mergeCells('F4', 'G4');
  const month3 = sheet.getCell('F4');
  //set title
  month3.value = `חודש ${months[2]}`;
  //set styles
  month3.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '00b274' }
  };
  month3.font = headerCellsStyles.font;
  month3.alignment = headerCellsStyles.alignment;
  month3.border = headerCellsStyles.border;

  //merge cells for end of quarter
  sheet.mergeCells('I4', 'J4');
  const quarterEnd = sheet.getCell('I4');
  //set title
  quarterEnd.value = "סוף רבעון";
  //set styles
  quarterEnd.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'aa55a1' }
  };
  quarterEnd.font = headerCellsStyles.font;
  quarterEnd.alignment = headerCellsStyles.alignment;
  quarterEnd.border = headerCellsStyles.border;
  /*Column headers*/
  sheet.getRow(5).values = BUDGET_EXECUTION_HEADERS;

  //dynamically generates headers according to
  //the specified quarter of a year
  sheet.columns = whichBudgetExecutionKeys(date.quarter);

  //get the first row the headers
  //and set style to each column of header row
  const headerRow = sheet.getRow(5);

  headerRow.eachCell(function (cell, colNumber) {

    if (colNumber === 2 || colNumber === 3) {
      //paint columns according to months colors
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'f04e4d' }
      };
    } else if (colNumber === 4 || colNumber === 5) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '1b75bc' }
      };
    } else if (colNumber === 6 || colNumber === 7) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '00b274' }
      };
    } else if (colNumber === 9 || colNumber === 10) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'aa55a1' }
      };
    } else {
      cell.style = headerStyle;
    }

    cell.font = headerCellsStyles.font;
    cell.border = headerCellsStyles.border;
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
  });



  //replace zero with empty string for esthetics
  data.forEach((row) => {
    Helper.replaceZeroWithEmpty(row);
    sheet.addRow(row);
  });

  sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber > 5) {
      row.eachCell((cell) => {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true,
          indent: 1
        }
        cell.font = {
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

  sheet.getColumn("A").width = 9.8;
  sheet.getColumn("B").width = 3.8;
  sheet.getColumn("C").width = 3.8;
  sheet.getColumn("D").width = 3.8;
  sheet.getColumn("E").width = 3.8;
  sheet.getColumn("F").width = 3.8;
  sheet.getColumn("G").width = 3.8;
  sheet.getColumn("H").width = 3.8;
  sheet.getColumn("I").width = 3.8;
  sheet.getColumn("J").width = 3.8;
  sheet.getColumn("K").width = 3.8;
  sheet.getColumn("L").width = 12.6;

  //iterate over all difference column cells including 
  //empty cells and set the following logic:
  //negative number is red
  //neutral number is yellow
  //positive number is green
  sheet.getColumn("K").eachCell(function (cell, rowNumber) {
    if (rowNumber > 5) {
      let bg = "ffff00";
      let fontColor = "000000";
      if (cell.value > 0) {
        bg = "008000";
        fontColor = "ffffff";
      } else if (cell.value < 0) {
        bg = "ff0000";
        fontColor = "ffffff";
      }

      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true
      }

      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: bg }
      };

      cell.font = {
        name: 'Arial',
        family: 2,
        color: { argb: fontColor }
      };

      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
      };


    }
  });

  return workbook;

};

function whichBudgetExecutionKeys(quarter) {
  switch (quarter) {
    case 1: return BUDGET_EXECUTION_QUARTER1_KEYS;
    case 2: return BUDGET_EXECUTION_QUARTER2_KEYS;
    case 3: return BUDGET_EXECUTION_QUARTER3_KEYS;
    case 4: return BUDGET_EXECUTION_QUARTER4_KEYS;
    default: return null;
  }
}

function getMonthHeaders(quarter) {
  switch (quarter) {
    case 1: return ["ינואר", "פברואר", "מרץ"];
    case 2: return ["אפריל", "מאי", "יוני"];
    case 3: return ["יולי", "אוגוסט", "ספטמבר"];
    case 4: return ["אוקטובר", "נובמבר", "דצמבר"];
    default: return null;
  }
}
