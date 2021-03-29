import menu from './menuReducer';
import summarizedSections from './summarizedSectionsReducer';
import expansesCodes from './expansesCodesReducer';
import generalSettings from './generalSettingsReducer';
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
import goodBye from './goodByeReducer';
import toggleSidebar from './toggleSidebarReducer';
import statistics from './statisticsReducer';
import monthsChart from './monthsChartReducer';
import quartersChart from './quartersChartReducer';
import yearsChart from './yearsChartReducer';
import topChart from './topChartReducer';

const reducers = {
  menu,
  summarizedSections,
  expansesCodes,
  generalSettings,
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
  savedNotification,
  goodBye,
  toggleSidebar,
  statistics,
  monthsChart,
  quartersChart,
  yearsChart,
  topChart
};

export default reducers;