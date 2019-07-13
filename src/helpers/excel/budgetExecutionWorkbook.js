import Helper from '../Helper';

const BUDGET_EXECUTION_QUARTER1_HEADERS = [
  { header: 'סעיף', key: 'section', width: 15 },
  { header: 'ינואר-תקציב', key: 'january_budget' },
  { header: 'ינואר-ביצוע', key: 'january_budget_execution' },
  { header: 'פברואר-תקציב', key: 'february_budget' },
  { header: 'פברואר-ביצוע', key: 'february_budget_execution' },
  { header: 'מרץ-תקציב', key: 'march_budget' },
  { header: 'מרץ-ביצוע', key: 'march_budget_execution' },
  { header: 'הערכה', key: 'evaluation' },
  { header: 'תקציב', key: 'total_budget' },
  { header: 'ביצוע', key: 'total_execution' },
  { header: 'הפרש', key: 'difference' },
  { header: 'הערות', key: 'notes', width: 15 }
];

const BUDGET_EXECUTION_QUARTER2_HEADERS = [
  { header: 'סעיף', key: 'section', width: 15 },
  { header: 'אפריל-תקציב', key: 'april_budget' },
  { header: 'אפריל-ביצוע', key: 'april_budget_execution' },
  { header: 'מאי-תקציב', key: 'may_budget' },
  { header: 'מאי-ביצוע', key: 'may_budget_execution' },
  { header: 'יוני-תקציב', key: 'june_budget' },
  { header: 'יוני-ביצוע', key: 'june_budget_execution' },
  { header: 'הערכה', key: 'evaluation' },
  { header: 'תקציב', key: 'total_budget' },
  { header: 'ביצוע', key: 'total_execution' },
  { header: 'הפרש', key: 'difference' },
  { header: 'הערות', key: 'notes', width: 15 }
];

const BUDGET_EXECUTION_QUARTER3_HEADERS = [
  { header: 'סעיף', key: 'section', width: 15 },
  { header: 'יולי-תקציב', key: 'july_budget' },
  { header: 'יולי-ביצוע', key: 'july_budget_execution' },
  { header: 'אוגוסט-תקציב', key: 'august_budget' },
  { header: 'אוגוסט-ביצוע', key: 'august_budget_execution' },
  { header: 'ספטמבר-תקציב', key: 'september_budget' },
  { header: 'ספטמבר-ביצוע', key: 'september_budget_execution' },
  { header: 'הערכה', key: 'evaluation' },
  { header: 'תקציב', key: 'total_budget' },
  { header: 'ביצוע', key: 'total_execution' },
  { header: 'הפרש', key: 'difference' },
  { header: 'הערות', key: 'notes', width: 15 }
];

const BUDGET_EXECUTION_QUARTER4_HEADERS = [
  { header: 'סעיף', key: 'section', width: 15 },
  { header: 'אוקטובר-תקציב', key: 'october_budget' },
  { header: 'אוקטובר-ביצוע', key: 'october_budget_execution' },
  { header: 'נובמבר-תקציב', key: 'november_budget' },
  { header: 'נובמבר-ביצוע', key: 'november_budget_execution' },
  { header: 'דצמבר-תקציב', key: 'december_budget' },
  { header: 'דצמבר-ביצוע', key: 'december_budget_execution' },
  { header: 'הערכה', key: 'evaluation' },
  { header: 'תקציב', key: 'total_budget' },
  { header: 'ביצוע', key: 'total_execution' },
  { header: 'הפרש', key: 'difference' },
  { header: 'הערות', key: 'notes', width: 15 }
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

export default (workbook, sheetTitle, data, { quarter }) => {
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

  // Repeat specific rows on every printed page
  sheet.pageSetup.printTitlesRow = '1:1';

  //dynamically generates headers according to
  //the specified quarter of a year
  sheet.columns = whichBudgetExecutionHeaders(quarter);

  //get the first row the headers
  //and set style to each column of header row
  const headerRow = sheet.getRow(1);
  headerRow.eachCell(function (cell, colNumber) {
    cell.style = headerStyle;
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
    if (rowNumber > 1) {
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

  //iterate over all difference column cells including 
  //empty cells and set the following logic:
  //negative number is red
  //neutral number is yellow
  //positive number is green
  sheet.getColumn("difference").eachCell(function (cell, rowNumber) {
    if (rowNumber > 1) {
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

function whichBudgetExecutionHeaders(quarter) {
  switch (quarter) {
    case 1: return BUDGET_EXECUTION_QUARTER1_HEADERS;
    case 2: return BUDGET_EXECUTION_QUARTER2_HEADERS;
    case 3: return BUDGET_EXECUTION_QUARTER3_HEADERS;
    case 4: return BUDGET_EXECUTION_QUARTER4_HEADERS;
    default: return null;
  }
}