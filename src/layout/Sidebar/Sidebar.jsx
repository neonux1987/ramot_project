import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';
import Logo from './Logo/Logo';
import Credits from './Credits/Credits';
import MenuContainer from './Menu/MenuContainer';
import CenteredLoader from '../../components/AnimatedLoaders/CenteredLoader';
import HomeButton from './HomeButton/HomeButton';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 5,
    overflow: "none"
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: "none",
    boxShadow: "-2px 0px 4px 4px #00000005",
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const Sidebar = ({ routes, isFetching, data }) => {
  const classes = useStyles();
  const showSidebar = useSelector(store => store.toggleSidebar.showSidebar);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={showSidebar}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Logo />
      <Divider />
      <HomeButton active={routes.active.state.page} />
      <Divider />
      {isFetching ? <CenteredLoader text="טוען תפריט" color="#ffffff" /> : <MenuContainer routes={routes} data={data} />}
      <Credits />
    </Drawer>
  );
}

export default Sidebar;