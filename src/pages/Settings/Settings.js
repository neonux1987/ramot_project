import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import General from "./pages/General/General";
import Theme from "./pages/Theme/Theme";
import BackupAndRestore from "./pages/BackupAndRestore/BackupAndRestore";
import AppUpdates from "./pages/AppUpdates/AppUpdates";
import About from "./pages/About/About";
import SettingsNavigation from "./AppBarContainer/SettingsNavigation";
import RouterPrompt from "../../RouterPrompt/RouterPrompt";

const Settings = ({ match }) => {
  return (
    <Fragment>
      <SettingsNavigation match={match} />
      <Switch>
        <Route path={`${match.path}/כללי`} component={General} />
        <Route path={`${match.path}/עיצוב`} component={Theme} />
        <Route
          path={`${match.path}/גיבוי ושחזור`}
          component={BackupAndRestore}
        />
        <Route path={`${match.path}/עדכוני תוכנה`} component={AppUpdates} />
        <Route path={`${match.path}/אודות`} component={About} />
      </Switch>
      <RouterPrompt />
    </Fragment>
  );
};

export default Settings;
