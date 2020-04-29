class Helper {

  //consts
  static shekelUnicode = '\u20AA';

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

  static findObjIndexById(id, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        return i;
      }
    }
  }

  static getQuarterMonths(quarter) {
    switch (quarter) {
      case 1: return ["ינואר", "פברואר", "מרץ"]
      case 2: return ["אפריל", "מאי", "יוני"]
      case 3: return ["יולי", "אוגוסט", "ספטמבר"]
      case 4: return ["אוקטובר", "נובמבר", "דצמבר"]
      default: return null
    }
  }

  static getQuarterMonthsEng(quarter) {
    switch (quarter) {
      case 1: return ["january", "february", "march"]
      case 2: return ["april", "may", "june"]
      case 3: return ["july", "august", "september"]
      case 4: return ["october", "november", "december"]
      default: return null
    }
  }

  static getYearQuarters() {
    return ["רבעון 1", "רבעון 2", "רבעון 3", "רבעון 4"];
  }

  static getMonths() {
    return ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  }

  static getMonthExpansesFilename(buildingName, date = { year: Number, month: String }) {
    let monthHebName = this.convertEngToHebMonth(date.month);
    return `${buildingName} מעקב הוצאות חודש ${monthHebName} ${date.year}`;
  }

  static getBudgetExecutionFilename(buildingName, date = { year: Number, quarter: Number }) {
    let quarter = this.getQuarterHeb(date.quarter);
    return `${buildingName} ביצוע מול תקציב ${quarter} ${date.year}`;
  }

  static getSummarizedBudgetsFilename(buildingName, date = { year: Number }) {
    return `${buildingName} סיכום שנתי ${date.year}`;
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

  static getCurrentQuarterDate() {
    return {
      quarter: this.getCurrentQuarter(),
      quarterEng: this.getCurrentQuarterEng(),
      quarterHeb: this.getCurrentQuarterHeb(),
      year: this.getCurrentYear()
    }
  }

  static reactTableFilterMethod(filter, row) {
    return row[filter.id].includes(filter.value);

  }


  static isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  static findIndexOfPage(buildingNameEng, array) {
    for (let i = 0; i < array.length; i++) {
      if (buildingNameEng === array[i].buildingNameEng) {
        return i;
      }
    }
  }

  static removePageFromArray(buildingNameEng, array) {
    for (let i = 0; i < array.length; i++) {
      if (buildingNameEng === array[i].buildingNameEng) {
        array.splice(i, 1);
      }
    }
  }

  static generateAllDateByMonthName(monthName) {
    const monthNum = Helper.convertEngToMonthNum(monthName);
    return {
      month: monthName,
      monthNum: monthNum,
      monthHeb: this.convertEngToHebMonth(monthName),
      quarter: this.getCurrentQuarter(monthNum),
      quarterEng: this.convertMonthNumToQuarterEng(monthNum),
      quarterHeb: this.getCurrentQuarterHeb(monthNum)
    }
  }

  static quarterMonthsColors = ["rgb(123, 91, 199)", "rgb(78, 143, 226)", "rgb(44, 193, 136)"];

  static endQuarterColor = "rgb(232, 67, 104)";

  static quartersColors = ["rgb(123, 91, 199)", "rgb(78, 143, 226)", "rgb(44, 193, 136)", this.endQuarterColor];

  static endYearColor = "rgb(245, 132, 35)";

}
export default Helper;