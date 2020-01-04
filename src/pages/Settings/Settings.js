import React from 'react';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { Route, Switch, NavLink } from 'react-router-dom';
import BackupAndRestore from './pages/BackupAndRestore/BackupAndRestore';
import ExpansesCodes from './pages/ExpansesCodes/ExpansesCodes';
import SummarizedSections from './pages/SummarizedSections/SummarizedSections';
import General from './pages/General/General';

const styles = (theme) => ({
  tabs: {
    flexGrow: 1,
    backgroundColor: "#333333"
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

  return (
    <div>
      <AppBar classes={{ root: classes.appBar }} position="static" style={{ margin: "20px 20px 30px 20px" }}>
        <Tabs classes={{ root: classes.tabs, indicator: classes.indicator }} value={value} onChange={handleChange}>
          <Tab
            classes={{ root: classes.tab, selected: classes.selected }}
            label="כללי"
            component={NavLink}
            to={{
              pathname: `${match.path}/כללי`,
              state: {
                page: "כללי",
                buildingName: "הגדרות"
              }
            }}
          />
          <Tab
            classes={{ root: classes.tab, selected: classes.selected }}
            label="קודי הנהלת חשבונות"
            component={NavLink}
            to={{
              pathname: `${match.path}/קודי הנהלת חשבונות`,
              state: {
                page: "קודי הנהלת חשבונות",
                buildingName: "הגדרות"
              }
            }}
          />
          <Tab
            classes={{ root: classes.tab, selected: classes.selected }}
            label="סעיפים מסכמים" component={NavLink}
            to={{
              pathname: `${match.path}/סעיפים מסכמים`,
              state: {
                page: "סעיפים מסכמים",
                buildingName: "הגדרות"
              }
            }}
          />
          <Tab
            classes={{ root: classes.tab, selected: classes.selected }}
            label="גיבוי ושחזור"
            component={NavLink}
            to={{
              pathname: `${match.path}/גיבוי ושחזור`,
              state: {
                page: "גיבוי ושחזור",
                buildingName: "הגדרות"
              }
            }}
          />
        </Tabs>
      </AppBar>
      <div>
        <Switch>
          <Route path={`${match.path}/כללי`} component={General} />
          <Route path={`${match.path}/קודי הנהלת חשבונות`} component={ExpansesCodes} />
          <Route path={`${match.path}/סעיפים מסכמים`} component={SummarizedSections} />
          <Route path={`${match.path}/גיבוי ושחזור`} component={BackupAndRestore} />
          <Route component={General} />
        </Switch>
      </div>
    </div>
  );

}

export default withStyles(styles)(Settings);