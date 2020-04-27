import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Menu from './Menu';
import { withStyles, Drawer } from '@material-ui/core';
import Logo from './Logo/Logo'
import PropTypes from 'prop-types';
import NavButton from './NavButton';
import { Dashboard, Tune } from '@material-ui/icons';
import LoadingCircle from '../components/LoadingCircle';
import sidebarActions from '../redux/actions/sidebarActions';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Menuitem from './Menuitem';
import bgImage from '../assets/images/texture.jpg';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    //backgroundImage: `url('${bgImage}')`,
    //backgroundPosition: "center top",
    //backgroundSize: "cover",
    zIndex: 2,
    boxShadow: "none"
  },
  drawerPaper: {
    width: drawerWidth,
    //background: "rgb(33,39,49)",
    //boxShadow: "inset -15px 0px 23px -5px rgba(0, 0, 0, 0.52)",
    //background: "linear-gradient(315deg, rgba(33, 39, 49, 0.95) 0%, rgba(46, 55, 62, 0.95) 100%)",
    background: "linear-gradient(315deg, rgba(33, 39, 49, 0.96) 0%, rgb(46, 55, 62) 100%)",
    overflow: "initial",
    position: "relative",
    border: "none",
    //boxShadow: "none"
  },
  loadingWrapper: {
    display: "flex",
    height: "50%",
    alignItems: "center",
    margin: "0 auto"
  },
  loadingText: {
    color: "#fff",
    fontSize: "22px"
  },
  loadingCircle: {
    margin: theme.spacing() * 2,
    color: "#fff"
  },
  settingsWrapper: {
    position: "fixed",
    bottom: "0",
    width: "220px",
    marginLeft: "10px"
  },
  listItemIcon: {
    color: "#cbcdda",
    fontSize: "22px"
  },
});

const activeButtonClass = "activeButton";

const DEFAULT_SELECTED_PAGE = "הוצאות חודשי";

class Sidebar extends Component {

  constructor(props) {
    super(props);
    //binds
    this.activeItem = this.activeItem.bind(this);
    this.expandMenuItem = this.expandMenuItem.bind(this);
    //init state
    this.state = {
      active: {
        menuItemId: 0,
        subMenuItemId: 0
      },
      homeButtonId: 99,
      settingsButtonId: 100,
      sidebarOpen: true
    };
    this.toggleSidebarAnimation = "";
  }

  componentDidMount() {
    this.props.fetchSidebar();
  }

  //handle menu button click to expand
  expandMenuItem(id, menuItem) {
    //copy the menu and add the new value
    let copyMenu = [...this.props.sidebar.sidebar.data];

    //copy active object
    let active = { ...this.state.active }

    //set the expanded menu item id
    active.menuItemId = id;

    copyMenu.forEach((item) => {
      //find the chosen menu item by id
      if (item.id === id) {
        //flip the state of the expanded item
        item.expanded = item.expanded === 1 ? 0 : 1;
        //this.props.history.push("/לב-תל-אביב/הוצאות-חודשיות"); console.log(this.props);
        //when a menu item closes meaning not expanded
        //on first click automatically put default selected page as
        //active, if the item is expanded already on click do nothing except close it
        if (item.expanded !== 0) {
          item.submenu.forEach((subItem) => {
            //search for the default page
            //and activate it
            if (subItem.label === DEFAULT_SELECTED_PAGE) {
              subItem.selected = 1;
              active.subMenuItemId = subItem.id;
              this.activeItem(id, subItem.id);
            }
          });
        }
        //update menu state
        this.setState(() => {
          if (item.expanded) {
            const state = {
              page: menuItem.submenu[0].label,
              buildingName: menuItem.label,
              buildingNameEng: menuItem.engLabel,
              active: {
                pageName: menuItem.submenu[0].label,
                parent: {
                  pageName: menuItem.label,
                  parent: null
                }
              }
            }
            this.props.history.replace(`/${menuItem.path}/הוצאות-חודשי`, state);
          }
          return { menu: copyMenu };
        });
      }
    });


  }

  activeItem(menuItemId, subMenuItemId) {

    //copy active object
    let active = { ...this.state.active }

    active.menuItemId = menuItemId;
    active.subMenuItemId = subMenuItemId;

    this.setState(() => ({ active: active }));

  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { sidebar, showSidebar } = this.props.sidebar;

    if (sidebar.isFetching) {
      return <LoadingCircle wrapperStyle={this.props.classes.loadingWrapper} textStyle={this.props.classes.loadingText} circleStyle={this.props.classes.loadingCircle} />;
    }

    const NavigationBtn = ({ page, path, active, activeClass, clicked }) => {
      return <NavButton
        page={page}
        path={path}
        active={active}
        activeClass={activeClass}
        clicked={clicked}
      >
        <Dashboard classes={{ root: this.props.classes.listItemIcon }} />
      </NavButton>;
    }

    this.toggleSidebarAnimation = !showSidebar ? "hideAnimation" : "showAnimation";

    const menuItems = sidebar.data.map((item, index) => {
      return (<Menuitem item={item} key={index} active={this.state.active} clicked={this.activeItem} expandClick={this.expandMenuItem} />)
    });

    return (
      <Drawer id="sidebar" variant="permanent" classes={{ paper: this.props.classes.drawerPaper }} anchor="left" className={classnames(this.props.classes.drawer, this.toggleSidebarAnimation)}>

        <Logo />

        <NavigationBtn
          page="דף הבית"
          path="דף-הבית"
          active={this.state.active.subMenuItemId === this.state.homeButtonId || this.state.active.subMenuItemId === 0}
          activeClass={activeButtonClass}
          clicked={() => (this.activeItem(this.state.homeButtonId, this.state.homeButtonId))}
        />

        <Menu>
          {menuItems}
        </Menu>

        <div className={this.props.classes.settingsWrapper}>
          <NavButton style={{ marginRight: 0 }} page="הגדרות" path="הגדרות" active={this.state.active.subMenuItemId === this.state.settingsButtonId}
            activeClass={activeButtonClass} clicked={() => (this.activeItem(this.state.settingsButtonId, this.state.settingsButtonId))} >
            <Tune classes={{ root: this.props.classes.listItemIcon }} />
          </NavButton>
        </div>
      </Drawer>
    );
  }

}

const mapStateToProps = state => ({
  sidebar: state.sidebar
});

const mapDispatchToProps = dispatch => ({
  fetchSidebar: () => dispatch(sidebarActions.fetchSidebar())
});

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(
    Sidebar
  ))
);

