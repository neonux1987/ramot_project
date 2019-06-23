import React from 'react';
import { withStyles, Tabs, Tab, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { Route, Switch, NavLink } from 'react-router-dom';
import Home from '../Home';

const styles = (theme) => ({
  tabs: {
    flexGrow: 1,
    backgroundColor: "#27354a"
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

const PAGE_NAME = "settings";

const Settings = ({ classes, match }, props) => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <Typography className={classes.headerTitle} variant="h3">
        הגדרות
      </Typography>
      <AppBar position="static">
        <Tabs classes={{ root: classes.tabs, indicator: classes.indicator }} value={value} onChange={handleChange}>
          <Tab classes={{ root: classes.tab, selected: classes.selected }} label="כללי" component={NavLink} to={{ pathname: `${match.path}/כללי` }} />
          <Tab classes={{ root: classes.tab, selected: classes.selected }} label="קישור סעיפים" component={NavLink} to={{ pathname: `${match.path}/קישור-סעיפים` }} />
          <Tab classes={{ root: classes.tab, selected: classes.selected }} label="גיבוי" component={NavLink} to={{ pathname: `${match.path}/גיבוי` }} />
        </Tabs>
      </AppBar>
      <div>
        <Switch>
          <Route path={`${match.path}/כללי`} render={() => <h3>Plasdsad</h3>} />
          <Route path={`${match.path}/קישור-סעיפים`} component={Home} />
          <Route path={`${match.path}/גיבוי`} component={Home} />
          <Route render={() => <h3>Please select a topic.</h3>} />
        </Switch>
      </div>
    </div>
  );

}

export default withStyles(styles)(Settings);