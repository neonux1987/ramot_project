import React from 'react';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import BackupAndRestore from './pages/BackupAndRestore/BackupAndRestore';
import Services from './pages/Services/Services';
import General from './pages/General/General';
import Locations from './pages/Locations/Locations';
import { useSelector } from 'react-redux';

const styles = (theme) => ({
  tabs: {
    flexGrow: 1,
    backgroundColor: "rgb(46, 55, 62)"
    //backgroundColor: theme.palette.background.paper
  },
  tab: {
    fontSize: "16px"
  },
  indicator: {
    backgroundColor: "#fff"
  },
  selected: {
    backgroundColor: "#ffffff2e"
  },
  headerTitle: {
    marginBottom: "10px"
  },
  appBar: {
    width: "initial"
  }
});

//const PAGE_NAME = "settings";

const Settings = ({ classes, match }, props) => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const currentActive = useSelector(store => store.routes.active);
  const pageState = currentActive.state;

  return (
    <div>
      <AppBar classes={{ root: classes.appBar }} position="static" style={{ margin: "20px 20px 30px 20px" }}>
        <Tabs
          classes={{ root: classes.tabs, indicator: classes.indicator }}
          value={value}
          TabIndicatorProps={{ style: { background: "none" } }}
          onChange={handleChange}
        >
          <Tab
            classes={{ root: classes.tab }}
            label="כללי"
            component={NavLink}
            to={{
              pathname: `${match.path}/כללי`,
              state: {
                page: "כללי",
                buildingName: "הגדרות"
              }
            }}
            className={pageState.page === "כללי" ? "activeButton2" : ""}
          />
          <Tab
            classes={{ root: classes.tab }}
            label="גיבוי ושחזור"
            component={NavLink}
            to={{
              pathname: `${match.path}/גיבוי ושחזור`,
              state: {
                page: "גיבוי ושחזור",
                buildingName: "הגדרות"
              }
            }}
            className={pageState.page === "גיבוי ושחזור" ? "activeButton2" : ""}
          />
          <Tab
            classes={{ root: classes.tab }}
            label="מיקום קבצים"
            component={NavLink}
            to={{
              pathname: `${match.path}/מיקום קבצים`,
              state: {
                page: "מיקום קבצים",
                buildingName: "הגדרות"
              }
            }}
            className={pageState.page === "מיקום קבצים" ? "activeButton2" : ""}
          />
          <Tab
            classes={{ root: classes.tab }}
            label="שירותי מערכת"
            component={NavLink}
            to={{
              pathname: `${match.path}/שירותי מערכת`,
              state: {
                page: "שירותי מערכת",
                buildingName: "הגדרות"
              }
            }}
            className={pageState.page === "שירותי מערכת" ? "activeButton2" : ""}
          />
        </Tabs>
      </AppBar>
      <div>
        <Switch>
          <Route path={`${match.path}/כללי`} component={General} />
          <Route path={`${match.path}/גיבוי ושחזור`} component={BackupAndRestore} />
          <Route path={`${match.path}/מיקום קבצים`} component={Locations} />
          <Route path={`${match.path}/שירותי מערכת`} component={Services} />
          <Redirect
            exact
            from="/הגדרות"
            to={{
              pathname: "/הגדרות/כללי",
              state: {
                page: "כללי",
                buildingName: "הגדרות",
                buildingNameEng: "settings"
              }
            }}
          />
        </Switch>
      </div>
    </div>
  );

}

export default withStyles(styles)(Settings);