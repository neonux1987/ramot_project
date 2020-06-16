import React, { lazy, Suspense } from 'react';
import { withStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

// LAZY LOAD PAGES
const ExpansesCodes = lazy(() => import('./pages/ExpansesCodes/ExpansesCodes'));
const SummarizedSections = lazy(() => import('./pages/SummarizedSections/SummarizedSections'));
const Reports = lazy(() => import('./pages/Reports/Reports'));

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
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route path={`${match.path}/קודי הנהלת חשבונות`} component={ExpansesCodes} />
          <Route path={`${match.path}/סעיפים מסכמים`} component={SummarizedSections} />
          <Route path={`${match.path}/הפקת דוחות`} component={Reports} />
          <Route component={Reports} />
        </Switch>
      </Suspense>
    </div>
  );

}

export default withStyles(styles)(Management);