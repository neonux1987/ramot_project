import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import ExpansesCodes from "./pages/ExpansesCodes/ExpansesCodes";
import SummarizedSections from "./pages/SummarizedSections/SummarizedSections";
import Reports from "./pages/Reports/Reports";
import BuildingsManagement from "./pages/BuildingsManagement/BuildingsManagement";

const Management = ({ match }) => {
  return (
    <Fragment>
      <Switch>
        <Route
          path={`${match.path}/ניהול קודי הנהלת חשבונות`}
          component={ExpansesCodes}
        />
        <Route
          path={`${match.path}/סעיפים מסכמים`}
          component={SummarizedSections}
        />
        <Route
          path={`${match.path}/ניהול בניינים`}
          component={BuildingsManagement}
        />
        <Route path={`${match.path}/הפקת דוחות`} component={Reports} />
        <Route component={Reports} />
      </Switch>
    </Fragment>
  );
};

export default Management;
