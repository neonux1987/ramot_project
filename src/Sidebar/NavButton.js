import React from 'react';
import { ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateRoute } from '../redux/actions/routesActions';

const styles = theme => ({
  navLinkHome: {
    display: "block",
    marginBottom: "10px",
    paddingLeft: "9px",
    borderRadius: "4px"
  },
  listItemTextRoot: {
    padding: 0
  },
  listItemText: {
    fontSize: "15px",
    color: "#f5f5f5"
  },
  icon: {
    fontSize: "14px",
    color: "#5975ff"
  },
  listItemIcon: {
    fontSize: "15px",
    color: "#fff"
  },
  listItem: {
    '&:hover': {

    }
  }
})

const NavButton = (props) => {

  let active = props.active ? props.activeClass : "";

  const dispatch = useDispatch();

  const onClickHandler = () => {
    const active = {
      pageName: props.page,
      parent: {
        pageName: props.buildingName,
        parent: null
      }
    };
    dispatch(updateRoute(active));
    props.clicked();
  }
  return (
    <NavLink style={props.style} className={props.classes.navLinkHome + " " + active} to={{
      pathname: "/" + props.path,
      state: {
        page: props.page,
        buildingName: props.buildingName,
        buildingNameEng: props.buildingNameEng
      }
    }}
      exact
    >
      <ListItem classes={{ root: props.classes.listItem }} onClick={onClickHandler} button>
        <ListItemIcon classes={{ root: props.classes.listItemIcon }} children={props.children} />
        <ListItemText classes={{ root: props.classes.listItemTextRoot, primary: props.classes.listItemText }} primary={props.page} />
      </ListItem>
    </NavLink>
  );
}

export default withStyles(styles)(NavButton);