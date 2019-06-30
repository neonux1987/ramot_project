import Helper from '../Helper';

const BUDGET_EXECUTION_QUARTER1_HEADERS = [
  { header: 'סעיף', key: 'section', width: 30 },
  { header: 'ינואר-תקציב', key: 'january_budget', width: 30 },
  { header: 'ינואר-ביצוע', key: 'january_budget_execution', width: 30 },
  { header: 'פברואר-תקציב', key: 'february_budget', width: 30 },
  { header: 'פברואר-ביצוע', key: 'february_budget_execution', width: 30 },
  { header: 'מרץ-תקציב', key: 'march_budget', width: 30 },
  { header: 'מרץ-ביצוע', key: 'march_budget_execution', width: 30 },
  { header: 'הערכה', key: 'evaluation', width: 30 },
  { header: 'תקציב', key: 'total_budget', width: 30 },
  { header: 'ביצוע', key: 'total_execution', width: 30 },
  { header: 'הפרש', key: 'difference', width: 30 },
  { header: 'הערות', key: 'notes', width: 30 }
];

const BUDGET_EXECUTION_QUARTER2_HEADERS = [
  { header: 'סעיף', key: 'section' },
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
  { header: 'הערות', key: 'notes' }
];

const BUDGET_EXECUTION_QUARTER3_HEADERS = [
  { header: 'סעיף', key: 'section', width: 30 },
  { header: 'יולי-תקציב', key: 'july_budget', width: 30 },
  { header: 'יולי-ביצוע', key: 'july_budget_execution', width: 30 },
  { header: 'אוגוסט-תקציב', key: 'august_budget', width: 30 },
  { header: 'אוגוסט-ביצוע', key: 'august_budget_execution', width: 30 },
  { header: 'ספטמבר-תקציב', key: 'september_budget', width: 30 },
  { header: 'ספטמבר-ביצוע', key: 'september_budget_execution', width: 30 },
  { header: 'הערכה', key: 'evaluation', width: 30 },
  { header: 'תקציב', key: 'total_budget', width: 30 },
  { header: 'ביצוע', key: 'total_execution', width: 30 },
  { header: 'הפרש', key: 'difference', width: 30 },
  { header: 'הערות', key: 'notes', width: 30 }
];

const BUDGET_EXECUTION_QUARTER4_HEADERS = [
  { header: 'סעיף', key: 'section', width: 30 },
  { header: 'אוקטובר-תקציב', key: 'october_budget', width: 30 },
  { header: 'אוקטובר-ביצוע', key: 'october_budget_execution', width: 30 },
  { header: 'נובמבר-תקציב', key: 'november_budget', width: 30 },
  { header: 'נובמבר-ביצוע', key: 'november_budget_execution', width: 30 },
  { header: 'דצמבר-תקציב', key: 'december_budget', width: 30 },
  { header: 'דצמבר-ביצוע', key: 'december_budget_execution', width: 30 },
  { header: 'הערכה', key: 'evaluation', width: 30 },
  { header: 'תקציב', key: 'total_budget', width: 30 },
  { header: 'ביצוע', key: 'total_execution', width: 30 },
  { header: 'הפרש', key: 'difference', width: 30, alignment: { vertical: 'middle', horizontal: 'center' } },
  { header: 'הערות', key: 'notes', width: 30 }
];

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
      pageSetup: { fitToPage: true, fitToHeight: 5, fitToWidth: 7, orientation: 'landscape' }
    }
  );


  //worksheet headers
  sheet.columns = whichBudgetExecutionHeaders();

  //get the first row of headers
  const headerRow = sheet.getRow(1);
  //and set style to each column of header row
  headerRow.eachCell(function (cell, colNumber) {
    cell.style = headerStyle;
  });

  data.forEach((row) => {
    sheet.addRow((() => {
      const { id, quarter, summarized_section_id, year, ...newRow } = row;
      Helper.replaceZeroWithEmpty(newRow);
      return newRow;
    })());
  });

  // iterate over all current cells in this column including empty cells
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

      cell.style = {
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: bg }
        },
        font: {
          name: 'Arial',
          family: 2,
          color: { argb: fontColor }
        },
        border: {
          top: { style: 'thin', color: { argb: 'C3C4C3' } },
          left: { style: 'thin', color: { argb: 'C3C4C3' } },
          bottom: { style: 'thin', color: { argb: 'C3C4C3' } },
          right: { style: 'thin', color: { argb: 'C3C4C3' } }
        }
      }
    }
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

function whichBudgetExecutionHeaders(quarter = Helper.getCurrentQuarter()) {
  switch (quarter) {
    case 1: return BUDGET_EXECUTION_QUARTER1_HEADERS;
    case 2: return BUDGET_EXECUTION_QUARTER2_HEADERS;
    case 3: return BUDGET_EXECUTION_QUARTER3_HEADERS;
    case 4: return BUDGET_EXECUTION_QUARTER4_HEADERS;
    default: return null;
  }
}