import { combineReducers } from 'redux';
import sidebar from './sidebarReducer';
import summarizedSections from './summarizedSectionsReducer';
import expansesCodes from './expansesCodesReducer';
import generalSettings from './generalSettingsReducer';
import registeredMonths from './registeredMonthsReducer';
import registeredYears from './registeredYearsReducer';
import registeredQuarters from './registeredQuartersReducer';
import settings from './settingsReducer';
import services from './servicesReducer';
import registeredBackups from './registeredBackupsReducer';
import monthlyStats from './monthlyStatsReducer';
import quarterlyStats from './quarterlyStatsReducer';
import yearlyStats from './yearlyStatsReducer';
import tableSettings from './tableSettingsReducer';
import registeredReports from './registeredReportsReducer';
import routes from './routesReducer';
import date from './dateReducer';
import modal from './modalReducer';
import savedNotification from './savedNotificationReducer';
import { createPageReducer } from './util/util';

// init month expanses reducer
const monthExpanses = createPageReducer("MONTH_EXPANSES", {
  pageName: "monthExpanses",
  headerTitle: "מעקב הוצאות חודשיות",
  pages: {}
});

// init budget executions reducer
const budgetExecutions = createPageReducer("BUDGET_EXECUTIONS", {
  pageName: "budgetExecutions",
  headerTitle: "מעקב ביצוע מול תקציב",
  pages: {}
});

// init budget executions reducer
const summarizedBudgets = createPageReducer("SUMMARIZED_BUDGETS", {
  pageName: "summarizedBudgets",
  headerTitle: "סיכום תקציבי",
  pages: {}
});

export default combineReducers({
  sidebar,
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
  services,
  registeredBackups,
  monthlyStats,
  quarterlyStats,
  yearlyStats,
  tableSettings,
  date,
  modal,
  registeredReports,
  routes,
  savedNotification
});