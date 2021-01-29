import React from 'react';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// PAGES
import General from './pages/General/General';
import Theme from './pages/Theme/Theme';
import BackupAndRestore from './pages/BackupAndRestore/BackupAndRestore';
import Services from './pages/Services/Services';
import AppUpdates from './pages/AppUpdates/AppUpdates';
import About from './pages/About/About';
import ButtonNavLinkWithSound from '../../componentsWithSound/ButtonNavLinkWithSound/ButtonNavLinkWithSound';

const styles = (theme) => ({
  tabs: {
    flexGrow: 1,
  },
  tab: {
    fontSize: "16px",
    color: "#000000",
    fontWeight: "600"
  },
  indicator: {
    backgroundColor: "rgba(0, 0, 0, 0.04)"
  },
  selected: {
    backgroundColor: "rgba(0, 0, 0, 0.04)"
  },
  headerTitle: {
    marginBottom: "10px"
  },
  appBar: {
    width: "initial",
    boxShadow: "none",
    //backgroundColor: "#3b4b5d",
    background: "none",
    //borderRadius: "5px !important"
    borderBottom: "1px solid #e3e5ec"
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
    <div style={{ height: "100%" }}>
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
            component={ButtonNavLinkWithSound}
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
            label="עיצוב"
            component={ButtonNavLinkWithSound}
            to={{
              pathname: `${match.path}/עיצוב`,
              state: {
                page: "עיצוב",
                buildingName: "הגדרות"
              }
            }}
            className={pageState.page === "עיצוב" ? "activeButton2" : ""}
          />
          <Tab
            classes={{ root: classes.tab }}
            label="גיבוי ושחזור"
            component={ButtonNavLinkWithSound}
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
            label="שירותי מערכת"
            component={ButtonNavLinkWithSound}
            to={{
              pathname: `${match.path}/שירותי מערכת`,
              state: {
                page: "שירותי מערכת",
                buildingName: "הגדרות"
              }
            }}
            className={pageState.page === "שירותי מערכת" ? "activeButton2" : ""}
          />
          <Tab
            classes={{ root: classes.tab }}
            label="עדכוני תוכנה"
            component={ButtonNavLinkWithSound}
            to={{
              pathname: `${match.path}/עדכוני תוכנה`,
              state: {
                page: "עדכוני תוכנה",
                buildingName: "הגדרות"
              }
            }}
            className={pageState.page === "עדכוני תוכנה" ? "activeButton2" : ""}
          />
          <Tab
            classes={{ root: classes.tab }}
            label="אודות"
            component={ButtonNavLinkWithSound}
            to={{
              pathname: `${match.path}/אודות`,
              state: {
                page: "אודות",
                buildingName: "הגדרות"
              }
            }}
            className={pageState.page === "אודות" ? "activeButton2" : ""}
          />
        </Tabs>
      </AppBar>
      <div style={{ height: "100%" }}>
        <Switch>
          <Route path={`${match.path}/כללי`} component={General} />
          <Route path={`${match.path}/עיצוב`} component={Theme} />
          <Route path={`${match.path}/גיבוי ושחזור`} component={BackupAndRestore} />
          <Route path={`${match.path}/שירותי מערכת`} component={Services} />
          <Route path={`${match.path}/עדכוני תוכנה`} component={AppUpdates} />
          <Route path={`${match.path}/אודות`} component={About} />
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