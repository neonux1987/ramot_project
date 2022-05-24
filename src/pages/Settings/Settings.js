import React from 'react';
import { Box } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import General from './pages/General/General';
import Theme from './pages/Theme/Theme';
import BackupAndRestore from './pages/BackupAndRestore/BackupAndRestore';
import AppUpdates from './pages/AppUpdates/AppUpdates';
import About from './pages/About/About';
import SettingsNavigation from './AppBarContainer/SettingsNavigation';

const Settings = ({ match }) => {
  return (
    <Box>
      <SettingsNavigation match={match} />
      <Box>
        <Switch>
          <Route exact path={match.path} component={General} />
          <Route exact path={`${match.path}/כללי`} component={General} />
          <Route path={`${match.path}/עיצוב`} component={Theme} />
          <Route path={`${match.path}/גיבוי ושחזור`} component={BackupAndRestore} />
          <Route path={`${match.path}/עדכוני תוכנה`} component={AppUpdates} />
          <Route path={`${match.path}/אודות`} component={About} />
        </Switch>
      </Box>

    </Box>
  );

}

export default Settings;