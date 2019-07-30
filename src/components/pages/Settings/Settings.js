import React from 'react';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { Route, Switch, NavLink } from 'react-router-dom';
import Home from '../Home/Home';
import ExpansesCodes from './pages/ExpansesCodes/ExpansesCodes';
import General from './pages/General/General';

const styles = (theme) => ({
  tabs: {
    flexGrow: 1,
    backgroundColor: "#474d56"
    //backgroundColor: theme.palette.background.paper
  },
  tab: {
    fontSize: "16px"
  },
  indicator: {
    backgroundColor: "#fff"
  },
  selected: {
    backgroundColor: "#0a8fc1"
  },
  headerTitle: {
    marginBottom: "10px"
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
      <AppBar position="static" style={{ marginBottom: "30px" }}>
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
            label="גיבוי"
            component={NavLink}
            to={{
              pathname: `${match.path}/גיבוי`,
              state: {
                page: "גיבוי",
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
          <Route path={`${match.path}/סעיפים מסכמים`} component={ExpansesCodes} />
          <Route path={`${match.path}/גיבוי`} component={Home} />
          <Route component={General} />
        </Switch>
      </div>
    </div>
  );

}

export default withStyles(styles)(Settings);