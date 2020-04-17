import { combineReducers } from 'redux';
import app from './appReducer';
import sidebar from './sidebarReducer';
import summarizedSections from './summarizedSectionsReducer';
import expansesCodes from './expansesCodesReducer';
import generalSettings from './generalSettingsReducer';
import registeredMonths from './registeredMonthsReducer';
import registeredYears from './registeredYearsReducer';
import registeredQuarters from './registeredQuartersReducer';
import settings from './settingsReducer';
import services from './servicesReducer';
import backupsNames from './backupsNamesReducer';
import monthlyStats from './monthlyStatsReducer';
import quarterlyStats from './quarterlyStatsReducer';
import yearlyStats from './yearlyStatsReducer';
import tableSettings from './tableSettingsReducer';
import registeredReports from './registeredReportsReducer';
import date from './dateReducer';
import modal from './modalReducer';
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
  app,
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
  backupsNames,
  monthlyStats,
  quarterlyStats,
  yearlyStats,
  tableSettings,
  date,
  modal,
  registeredReports
});