const Excel = require('exceljs');
const QuarterlyStatsLogic = require('../../../logic/QuarterlyStatsLogic');
const YearlyStatsLogic = require('../../../logic/YearlyStatsLogic');
const Helper = require('../../../../helpers/Helper');

const KEYS = [
  { key: 'section', width: 15 },
  { key: 'quarter1_budget' },
  { key: 'quarter1_execution' },
  { key: 'quarter2_budget' },
  { key: 'quarter2_execution' },
  { key: 'quarter3_budget' },
  { key: 'quarter3_execution' },
  { key: 'quarter4_budget' },
  { key: 'quarter4_execution' },
  { key: 'evaluation' },
  { key: 'year_total_budget' },
  { key: 'year_total_execution' },
  { key: 'notes', width: 15 }
];

const HEADERS = [
  'סעיף',
  'תקציב',
  'ביצוע',
  'תקציב',
  'ביצוע',
  'תקציב',
  'ביצוע',
  'תקציב',
  'ביצוע',
  'הערכה',
  'תקציב',
  'ביצוע',
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

module.exports = async (
  buildingName,
  buildingId,
  date,
  data
) => {

  const sheetTitle = `שנה ${date.year}`;
  const header = `${buildingName} / סיכום שנתי / ${date.year}`;

  await addIncomeOutcome(data, date, buildingId);

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
      pageSetup: {
        paperSize: 9,
        orientation: 'landscape',
        fitToWidth: 1,
        fitToHeight: 0,
        fitToPage: true,
        margins: {
          left: 0.20, right: 0.20,
          top: 0.20, bottom: 0.20,
          header: 0, footer: 0
        }
      }
    }
  );

  // Repeat specific rows on every printed page
  sheet.pageSetup.printTitlesRow = '3:4';

  // Set footer (default centered), result: "Page 2 of 16"
  sheet.headerFooter.oddFooter = "&N עמוד &P מתוך";

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
  sheet.mergeCells('A1', 'M2');
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

  //merge cells for quarter 1 header
  sheet.mergeCells('B3', 'C3');
  const quarter1 = sheet.getCell('B3');
  //set title
  quarter1.value = `רבעון 1`;
  //set styles
  quarter1.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '7051b9' }
  };
  quarter1.font = headerCellsStyles.font;
  quarter1.alignment = headerCellsStyles.alignment;
  quarter1.border = headerCellsStyles.border;

  //merge cells for quarter 2 header
  sheet.mergeCells('D3', 'E3');
  const quarter2 = sheet.getCell('D3');
  //set title
  quarter2.value = `רבעון 2`;
  //set styles
  quarter2.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '386db1' }
  };
  quarter2.font = headerCellsStyles.font;
  quarter2.alignment = headerCellsStyles.alignment;
  quarter2.border = headerCellsStyles.border;

  //merge cells for quarter 3 header
  sheet.mergeCells('F3', 'G3');
  const quarter3 = sheet.getCell('F3');
  //set title
  quarter3.value = `רבעון 3`;
  //set styles
  quarter3.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '31926c' }
  };
  quarter3.font = headerCellsStyles.font;
  quarter3.alignment = headerCellsStyles.alignment;
  quarter3.border = headerCellsStyles.border;

  //merge cells for quarter 4 header
  sheet.mergeCells('H3', 'I3');
  const quarter4 = sheet.getCell('H3');
  //set title
  quarter4.value = `רבעון 4`;
  //set styles
  quarter4.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'dc3c60' }
  };
  quarter4.font = headerCellsStyles.font;
  quarter4.alignment = headerCellsStyles.alignment;
  quarter4.border = headerCellsStyles.border;

  //merge cells for end of quarter
  sheet.mergeCells('K3', 'L3');
  const yearEnd = sheet.getCell('K3');
  //set title
  yearEnd.value = "סוף רבעון";
  //set styles
  yearEnd.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'F84D1E' }
  };
  yearEnd.font = headerCellsStyles.font;
  yearEnd.alignment = headerCellsStyles.alignment;
  yearEnd.border = headerCellsStyles.border;

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
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '7051b9' }
      };
    } else if (colNumber === 4 || colNumber === 5) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '386db1' }
      };
    } else if (colNumber === 6 || colNumber === 7) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '31926c' }
      };
    } else if (colNumber === 8 || colNumber === 9) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'dc3c60' }
      };
    } else if (colNumber === 11 || colNumber === 12) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'F84D1E' }
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
    // instead of null to make the borders appear
    row.notes = row.notes === null ? "" : row.notes;
    sheet.addRow(row);
  });

  sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber > 4) {
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

  sheet.getColumn("A").width = 16.00;// real 15.29
  sheet.getColumn("B").width = 10.00;//real 9.29
  sheet.getColumn("C").width = 10.00;//real 9.29
  sheet.getColumn("D").width = 10.00;//real 9.29
  sheet.getColumn("E").width = 10.00;//real 9.29
  sheet.getColumn("F").width = 10.00;//real 9.29
  sheet.getColumn("G").width = 10.00;//real 9.29
  sheet.getColumn("H").width = 10.00;//real 9.29
  sheet.getColumn("I").width = 10.00;//real 9.29
  sheet.getColumn("J").width = 10.00;//real 9.29
  sheet.getColumn("K").width = 10.00;//real 9.29
  sheet.getColumn("L").width = 10.00;//real 9.29
  sheet.getColumn("M").width = 16.71;// real 16.00

  return Promise.resolve(workbook);

};

async function addIncomeOutcome(data, date, buildingId) {
  const quarterlyStatsLogic = new QuarterlyStatsLogic();
  const yearlyStatsLogic = new YearlyStatsLogic();

  const quarterlyStats = await quarterlyStatsLogic.getAllQuartersStatsByYearTrx({ buildingName: buildingId, date });

  const incomeRow = {
    section: "הכנסות",
    evaluation: "",
    notes: ""
  };
  const outcomeRow = {
    section: "הוצאות",
    evaluation: "",
    notes: ""
  };

  quarterlyStats.forEach((item) => {
    const { quarter } = item;

    incomeRow[`quarter${quarter}_budget`] = item.income;
    incomeRow[`quarter${quarter}_execution`] = "";

    outcomeRow[`quarter${quarter}_budget`] = "";
    outcomeRow[`quarter${quarter}_execution`] = item.outcome;
  })

  const yearlyStats = await yearlyStatsLogic.getYearStatsTrx(buildingId, date);

  incomeRow.year_total_budget = yearlyStats[0].income;
  incomeRow.year_total_execution = "";

  outcomeRow.year_total_budget = "";
  outcomeRow.year_total_execution = yearlyStats[0].outcome;

  data.push(incomeRow);
  data.push(outcomeRow);
}
