import React from 'react';
import { withStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

// PAGES
import ExpansesCodes from './pages/ExpansesCodes/ExpansesCodes';
import SummarizedSections from './pages/SummarizedSections/SummarizedSections';
import Reports from './pages/Reports/Reports';

const styles = () => ({
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

const Management = ({ match }) => {

  return (
    <div style={{ paddingTop: "50px", height: "100%" }}>
      <Switch>
        <Route path={`${match.path}/קודי הנהלת חשבונות`} component={ExpansesCodes} />
        <Route path={`${match.path}/סעיפים מסכמים`} component={SummarizedSections} />
        <Route path={`${match.path}/הפקת דוחות`} component={Reports} />
        <Route component={Reports} />
      </Switch>
    </div>
  );

}

export default withStyles(styles)(Management);