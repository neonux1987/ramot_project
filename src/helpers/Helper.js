const { quarter1, quarter2, quarter3, quarter4, budget_summarized_headers } = require('./Headers');

class Helper {

  static trimSpaces(name) {
    return name.replace(new RegExp(" ", 'g'), "_");
  }

  static getCurrentYear() {
    let date = new Date();
    return date.getYear() + 1900;
  }

  static getCurrentMonthNum() {
    let date = new Date();
    return date.getMonth();
  }

  static getCurrentMonthHeb(month = (new Date()).getMonth()) {
    switch (month) {
      case 0: return "ינואר"
      case 1: return "פברואר"
      case 2: return "מרץ"
      case 3: return "אפריל"
      case 4: return "מאי"
      case 5: return "יוני"
      case 6: return "יולי"
      case 7: return "אוגוסט"
      case 8: return "ספטמבר"
      case 9: return "אוקטובר"
      case 10: return "נובמבר"
      case 11: return "דצמבר"
      default: return null
    }
  }

  static convertEngToHebMonth(monthEng) {
    switch (monthEng) {
      case "january": return "ינואר"
      case "february": return "פברואר"
      case "march": return "מרץ"
      case "april": return "אפריל"
      case "may": return "מאי"
      case "june": return "יוני"
      case "july": return "יולי"
      case "august": return "אוגוסט"
      case "september": return "ספטמבר"
      case "october": return "אוקטובר"
      case "november": return "נובמבר"
      case "december": return "דצמבר"
      default: return null
    }
  }

  static convertEngToMonthNum(monthEng) {
    switch (monthEng) {
      case "january": return 0
      case "february": return 1
      case "march": return 2
      case "april": return 3
      case "may": return 4
      case "june": return 5
      case "july": return 6
      case "august": return 7
      case "september": return 8
      case "october": return 9
      case "november": return 10
      case "december": return 11
      default: return null
    }
  }

  static getCurrentMonth(month = (new Date()).getMonth()) {
    switch (month) {
      case 0: return "january"
      case 1: return "february"
      case 2: return "march"
      case 3: return "april"
      case 4: return "may"
      case 5: return "june"
      case 6: return "july"
      case 7: return "august"
      case 8: return "september"
      case 9: return "october"
      case 10: return "november"
      case 12: return "december"
      default: return null
    }
  }

  static getCurrentQuarter(month = (new Date()).getMonth()) {
    switch (month) {
      case 0: return 1
      case 1: return 1
      case 2: return 1
      case 3: return 2
      case 4: return 2
      case 5: return 2
      case 6: return 3
      case 7: return 3
      case 8: return 3
      case 9: return 4
      case 10: return 4
      case 11: return 4
      default: return null
    }
  }

  static getCurrentQuarterHeb(monthNum = (new Date()).getMonth()) {
    switch (monthNum) {
      case 0: return "רבעון 1"
      case 1: return "רבעון 1"
      case 2: return "רבעון 1"
      case 3: return "רבעון 2"
      case 4: return "רבעון 2"
      case 5: return "רבעון 2"
      case 6: return "רבעון 3"
      case 7: return "רבעון 3"
      case 8: return "רבעון 3"
      case 9: return "רבעון 4"
      case 10: return "רבעון 4"
      case 11: return "רבעון 4"
      default: return null
    }
  }

  static convertMonthNumToQuarterEng(monthNum = (new Date()).getMonth()) {
    switch (monthNum) {
      case 0: return "quarter1"
      case 1: return "quarter1"
      case 2: return "quarter1"
      case 3: return "quarter2"
      case 4: return "quarter2"
      case 5: return "quarter2"
      case 6: return "quarter3"
      case 7: return "quarter3"
      case 8: return "quarter3"
      case 9: return "quarter4"
      case 10: return "quarter4"
      case 11: return "quarter4"
      default: return null
    }
  }

  static getQuarterHeb(quarter) {
    switch (quarter) {
      case 1: return "רבעון 1"
      case 2: return "רבעון 2"
      case 3: return "רבעון 3"
      case 4: return "רבעון 4"
      default: return null
    }
  }

  static convertQuarterToEng(quarter) {
    switch (quarter) {
      case 1: return "quarter1"
      case 2: return "quarter2"
      case 3: return "quarter3"
      case 4: return "quarter4"
      default: return null
    }
  }

  static getCurrentQuarterEng(quarter = Helper.getCurrentQuarter()) {
    switch (quarter) {
      case 1: return "quarter1"
      case 2: return "quarter2"
      case 3: return "quarter3"
      case 4: return "quarter4"
      default: return null
    }
  }

  static getQuarterMonthsHeaders(quarter = Helper.getCurrentQuarter()) {
    switch (quarter) {
      case 1: return [
        {
          header: "חודש ינואר 1",
          column1: {
            accessor: "january_budget",
            header: "תקציב"
          },
          column2: {
            accessor: "january_budget_execution",
            header: "ביצוע"
          }
        },
        {
          header: "חודש פברואר 2",
          column1: {
            accessor: "february_budget",
            header: "תקציב"
          },
          column2: {
            accessor: "february_budget_execution",
            header: "ביצוע"
          }
        },
        {
          header: "חודש מרץ 3",
          column1: {
            accessor: "march_budget",
            header: "תקציב"
          },
          column2: {
            accessor: "march_budget_execution",
            header: "ביצוע"
          }
        }
      ]
      case 2: return [
        {
          header: "חודש אפריל 4",
          column1: {
            accessor: "april_budget",
            header: "תקציב"
          },
          column2: {
            accessor: "april_budget_execution",
            header: "ביצוע"
          }
        },
        {
          header: "חודש מאי 5",
          column1: {
            accessor: "may_budget",
            header: "תקציב"
          },
          column2: {
            accessor: "may_budget_execution",
            header: "ביצוע"
          }
        },
        {
          header: "חודש יוני 6",
          column1: {
            accessor: "june_budget",
            header: "תקציב"
          },
          column2: {
            accessor: "june_budget_execution",
            header: "ביצוע"
          }
        }
      ]
      case 3: return [
        {
          header: "חודש יולי 7",
          column1: {
            accessor: "july_budget",
            header: "תקציב"
          },
          column2: {
            accessor: "july_budget_execution",
            header: "ביצוע"
          }
        },
        {
          header: "חודש אוגוסט 8",
          column1: {
            accessor: "august_budget",
            header: "תקציב"
          },
          column2: {
            accessor: "august_budget_execution",
            header: "ביצוע"
          }
        },
        {
          header: "חודש ספטמבר 9",
          column1: {
            accessor: "september_budget",
            header: "תקציב"
          },
          column2: {
            accessor: "september_budget_execution",
            header: "ביצוע"
          }
        }
      ]
      case 4: return [
        {
          header: "חודש אוקטובר 10",
          column1: {
            accessor: "october_budget",
            header: "תקציב"
          },
          column2: {
            accessor: "october_budget_execution",
            header: "ביצוע"
          }
        },
        {
          header: "חודש נובמבר 11",
          column1: {
            accessor: "november_budget",
            header: "תקציב"
          },
          column2: {
            accessor: "november_budget_execution",
            header: "ביצוע"
          }
        },
        {
          header: "חודש דצמבר 12",
          column1: {
            accessor: "december_budget",
            header: "תקציב"
          },
          column2: {
            accessor: "december_budget_execution",
            header: "ביצוע"
          }
        }
      ]
      default: return null
    }
  }

  static getBudgetExecutionTableHeaders() {
    switch (this.getCurrentQuarter()) {
      case 1: return quarter1
      case 2: return quarter2
      case 3: return quarter3
      case 4: return quarter4
      default: return null
    }
  };

  static getSummarizedBudgetTableHeaders() {
    return budget_summarized_headers;
  };

  static getCurrentDatePresentation() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '.' + mm + '.' + yyyy;
    return today;
  }



  static getMonthExpansesFilename(buildingName, date = { year: Number, month: String }) {
    let monthHebName = this.convertEngToHebMonth(date.month);
    return `${buildingName} מעקב הוצאות חודש ${monthHebName} ${date.year}`;
  }

  static getBudgetExecutionFilename(buildingName, date = { year: Number, quarter: Number }) {
    let quarter = this.getQuarterHeb(date.quarter);
    return `${buildingName} ביצוע מול תקציב ${quarter} ${date.year}`;
  }

  static getSummarizedBudgetFilename(buildingName, date = { year: Number }) {
    return `${buildingName} סיכום תקציבי ${date.year}`;
  }

  static replaceZeroWithEmpty(obj) {
    //replace 0 with empty string for better presentation
    for (let key in obj) {
      if (obj[key] === 0) {
        obj[key] = "";
      }
    }
  }

  static getCurrentDate() {
    return {
      month: this.getCurrentMonth(),
      monthHeb: this.getCurrentMonthHeb(),
      monthNum: this.getCurrentMonthNum(),
      year: this.getCurrentYear(),
      quarter: this.getCurrentQuarter(),
      quarterHeb: Helper.getCurrentQuarterHeb(),
      quarterEng: Helper.getCurrentQuarterEng()
    }
  }

  static findItemInArray(id, arr) {
    let item = null;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        item = { ...arr[i] };
      }
    }
    return item;
  }

}
export default Helper;