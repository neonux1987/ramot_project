
class Helper {

  static trimSpaces(name) {
    return name.replace(new RegExp(" ", 'g'), "_");
  }

  static getCurrentYear() {
    let date = new Date();
    return date.getYear() + 1900;
  }

  static getCurrentMonth() {
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

  static convertEngToHebMonth(month = (new Date()).getMonth()) {
    switch (month) {
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

  static convertHebToEngMonth(month) {
    switch (month) {
      case "ינואר": return "january"
      case "פברואר": return "february"
      case "מרץ": return "march"
      case "אפריל": return "april"
      case "מאי": return "may"
      case "יוני": return "june"
      case "יולי": return "july"
      case "אוגוסט": return "august"
      case "ספטמבר": return "september"
      case "אוקטובר": return "october"
      case "נובמבר": return "november"
      case "דצמבר": return "december"
      default: return null
    }
  }

  static hebToMonthNum(month) {
    switch (month) {
      case "ינואר": return 0
      case "פברואר": return 1
      case "מרץ": return 2
      case "אפריל": return 3
      case "מאי": return 4
      case "יוני": return 5
      case "יולי": return 6
      case "אוגוסט": return 7
      case "ספטמבר": return 8
      case "אוקטובר": return 9
      case "נובמבר": return 10
      case "דצמבר": return 1
      default: return null
    }
  }

  getQuarterFromMonthEng() {
    switch (month) {
      case "january": return 1
      case "february": return 1
      case "march": return 1
      case "april": return 2
      case "may": return 2
      case "june": return 2
      case "july": return 3
      case "august": return 3
      case "september": return 3
      case "october": return 4
      case "november": return 4
      case "december": return 4
      default: return null
    }
  }

  static getCurrentMonthEng(month = (new Date()).getMonth()) {
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
      case 11: return "december"
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

  static getQuarterHeb(quarter) {
    switch (quarter) {
      case 1: return "רבעון 1"
      case 2: return "רבעון 2"
      case 3: return "רבעון 3"
      case 4: return "רבעון 4"
      default: return null
    }
  }

  static getQuarterMonths(quarter) {
    switch (quarter) {
      case 1: return ["january", "february", "march"]
      case 2: return ["april", "may", "june"]
      case 3: return ["july", "august", "september"]
      case 4: return ["october", "november", "december"]
      default: return null
    }
  }

  static getQuarterMonthsNum(quarter) {
    switch (quarter) {
      case 1: return [0, 1, 2]
      case 2: return [3, 4, 5]
      case 3: return [6, 7, 8]
      case 4: return [9, 10, 11]
      default: return null
    }
  }

  static getQuarterMonthsHeb(quarter) {
    switch (quarter) {
      case 1: return ["ינואר", "פברואר", "מרץ"]
      case 2: return ["אפריל", "מאי", "יוני"]
      case 3: return ["יולי", "אוגוסט", "ספטמבר"]
      case 4: return ["אוקטובר", "נובמבר", "דצמבר"]
      default: return null
    }
  }

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
    return `${date.year} ${buildingName} מעקב הוצאות חודש ${monthHebName}`;
  }

  static getBudgetExecutionFilename(buildingName, date = { year: Number, quarter: Number }) {
    let quarter = this.getQuarterHeb(date.quarter);
    return `${quarter} ${date.year} ${buildingName} ביצוע מול תקציב`;
  }

  static replaceZeroWithEmpty(obj) {
    //replace 0 with empty string for better presentation
    for (let key in obj) {
      if (obj[key] === 0) {
        obj[key] = "";
      }
    }
  }

  static calculateWithoutTax(value, tax) {
    return Math.round(value / ((tax / 100) + 1));
  }

  static calculateWithTax(value, tax) {
    const taxValue = (value / 100) * tax;
    return value + taxValue;
  }

}
module.exports = Helper;