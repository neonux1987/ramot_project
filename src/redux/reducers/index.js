import { combineReducers } from 'redux';
import app from './appReducer';
import sidebar from './sidebarReducer';
import monthExpanses from './monthExpansesReducer';
import budgetExecution from './budgetExecutionReducer';
import summarizedSections from './summarizedSectionsReducer';
import expansesCodes from './expansesCodesReducer';

export default combineReducers({
  app,
  sidebar,
  monthExpanses,
  budgetExecution,
  summarizedSections,
  expansesCodes
});