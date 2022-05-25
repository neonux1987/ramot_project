import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Logo from './Logo/Logo';
import Credits from './Credits/Credits';
import MenuContainer from './Menu/MenuContainer';
import CenteredLoader from '../../components/AnimatedLoaders/CenteredLoader';
import { useSelector } from 'react-redux';
import img from '../../assets/images/Virtual-Grass-for-ALL-iPhone-AR72014.jpeg';
import { urlAlphabet } from 'nanoid';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 5,
    overflow: "unset",
    background: "#000000"
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: "none",
    boxShadow: "-2px 0px 4px 4px #00000005",
    overflow: "hidden",
    //background: `url(${img})`
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
  const { isFullscreen } = useSelector(store => store.fullscreen);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={showSidebar}
      classes={{
        paper: classes.drawerPaper,
      }}
      id="sidebar"
      style={{ display: isFullscreen ? "none" : "initial" }}
    >
      <Logo />
      <Divider />
      {isFetching ? <CenteredLoader text="טוען תפריט" color="#ffffff" /> : <MenuContainer routes={routes} data={data} />}
      <Credits />
    </Drawer>
  );
}

export default Sidebar;