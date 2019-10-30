import { combineReducers } from 'redux';
import app from './appReducer';
import sidebar from './sidebarReducer';
import monthExpanses from './monthExpansesReducer';
import budgetExecution from './budgetExecutionReducer';
import summarizedSections from './summarizedSectionsReducer';
import expansesCodes from './expansesCodesReducer';
import generalSettings from './generalSettingsReducer';
import summarizedBudget from './summarizedBudgetReducer';
import registeredMonths from './registeredMonthsReducer';
import registeredYears from './registeredYearsReducer';
import registeredQuarters from './registeredQuartersReducer';
import settings from './settingsReducer';
import backupsNames from './backupsNamesReducer';
import monthTotal from './monthTotalReducer';
import quarterTotal from './quarterTotalReducer';

export default combineReducers({
  app,
  sidebar,
  monthExpanses,
  budgetExecution,
  summarizedSections,
  expansesCodes,
  generalSettings,
  summarizedBudget,
  registeredMonths,
  registeredYears,
  registeredQuarters,
  settings,
  backupsNames,
  monthTotal,
  quarterTotal
});