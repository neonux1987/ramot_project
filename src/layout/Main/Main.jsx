import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import MainContainer from '../../Main/MainContainer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0
  }
}));

const Main = ({ settings, mainContainer }) => {
  const classes = useStyles();
  const showSidebar = useSelector(store => store.toggleSidebar.showSidebar);

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: showSidebar,
      })}
    >
      <div className={classes.drawerHeader} />
      <MainContainer mainContainer={mainContainer} settings={settings} />
    </main>
  );
}

export default Main;