import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import Routes from './Routes';

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
  main: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    display: "block",
    zIndex: 990,
    position: "relative"
  },
  mainShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0
  },
  content: {
    height: "100%",
    overflow: "overlay"
  }
}));

const Main = ({ mainContainerRef }) => {
  const classes = useStyles();
  const showSidebar = useSelector(store => store.toggleSidebar.showSidebar);

  return (
    <main
      id="mainContainer"
      className={clsx(classes.main, {
        [classes.mainShift]: showSidebar,
      })}
    >
      {/* top margin space */}
      <div className={classes.drawerHeader} />

      <div className={classes.content} ref={mainContainerRef}>
        <Route render={({ location }) => (
          <Routes location={location} />
        )} />
      </div>
    </main>
  );
}

export default Main;