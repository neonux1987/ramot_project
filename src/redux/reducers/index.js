import menu from "./menuReducer";
import summarizedSections from "./summarizedSectionsReducer";
import expansesCodes from "./expansesCodesReducer";
import generalSettings from "./generalSettingsReducer";
import registeredMonths from "./registeredMonthsReducer";
import registeredYears from "./registeredYearsReducer";
import registeredQuarters from "./registeredQuartersReducer";
import settings from "./settingsReducer";
import registeredBackups from "./registeredBackupsReducer";
import monthlyStats from "./monthlyStatsReducer";
import quarterlyStats from "./quarterlyStatsReducer";
import yearlyStats from "./yearlyStatsReducer";
import registeredReports from "./registeredReportsReducer";
import routes from "./routesReducer";
import modal from "./modalReducer";
import savedNotification from "./savedNotificationReducer";
import routerPrompt from "./routerPromptReducer";
import toggleSidebar from "./toggleSidebarReducer";
import statistics from "./statisticsReducer";
import monthsChart from "./monthsChartReducer";
import quartersChart from "./quartersChartReducer";
import yearsChart from "./yearsChartReducer";
import topChart from "./topChartReducer";
import budgetExecutions from "./budgetExecutionsReducer";
import monthExpanses from "./monthExpansesReducer";
import summarizedBudgets from "./summarizedBudgetsReducer";
import reports from "./reportsReducer";
import print from "./printReducer";
import fullscreen from "./fullscreenReducer";
import buildings from "./buildingsReducer";
import home from "./homeReducer";
import buildingsColors from "./buildingsColorsReducer";
import printTemplates from "./printTemplatesReducer";

const reducers = {
  menu,
  monthExpanses,
  budgetExecutions,
  summarizedSections,
  expansesCodes,
  generalSettings,
  summarizedBudgets,
  registeredMonths,
  registeredYears,
  registeredQuarters,
  settings,
  registeredBackups,
  monthlyStats,
  quarterlyStats,
  yearlyStats,
  modal,
  registeredReports,
  routes,
  savedNotification,
  routerPrompt,
  toggleSidebar,
  statistics,
  monthsChart,
  quartersChart,
  yearsChart,
  topChart,
  reports,
  print,
  fullscreen,
  buildings,
  home,
  buildingsColors,
  printTemplates
};

export default reducers;
