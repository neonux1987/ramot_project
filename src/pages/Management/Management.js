import React from 'react';
import { Route, Switch } from 'react-router-dom';

// PAGES
import ExpansesCodes from './pages/ExpansesCodes/ExpansesCodes';
import SummarizedSections from './pages/SummarizedSections/SummarizedSections';
import Reports from './pages/Reports/Reports';

//const PAGE_NAME = "management";

const Management = ({ match }) => {

  return (
    <Switch>
      <Route path={`${match.path}/קודי הנהלת חשבונות`} component={ExpansesCodes} />
      <Route path={`${match.path}/סעיפים מסכמים`} component={SummarizedSections} />
      <Route path={`${match.path}/הפקת דוחות`} component={Reports} />
      <Route component={Reports} />
    </Switch>
  );

}

export default Management;