import React from 'react';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { Route, Switch, NavLink } from 'react-router-dom';
import ExpansesCodes from './pages/ExpansesCodes/ExpansesCodes';
import SummarizedSections from './pages/SummarizedSections/SummarizedSections';
import Reports from './pages/Reports/Reports';

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

const Management = ({ classes, match }, props) => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <Switch>
          <Route path={`${match.path}/קודי הנהלת חשבונות`} component={ExpansesCodes} />
          <Route path={`${match.path}/סעיפים מסכמים`} component={SummarizedSections} />
          <Route path={`${match.path}/הפקת דוחות`} component={Reports} />
          <Route component={Reports} />
        </Switch>
      </div>
    </div>
  );

}

export default withStyles(styles)(Management);