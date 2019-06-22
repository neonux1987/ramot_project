import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, withStyles, Collapse } from '@material-ui/core';
import { Home, ExpandLess, ExpandMore, InsertChartOutlined, AssignmentTurnedIn, AttachMoney, Receipt, Label } from '@material-ui/icons';
import NavButton from './NavButton';

const styles = theme => ({
  listItemTextRoot: {
    padding: 0
  },
  menuItemWrapper: {
    marginBottom: "10px"
  },
  listItemText: {
    fontSize: "16px",
    color: "#f5f5f5"
  },
  listItemIcon: {
    color: "#5975ff"
  },
  listItem: {
    '&:hover': {

    }
  },
  navLink: {
    display: "block"
  },
  nested: {
    //paddingLeft: theme.spacing.unit * 4
  },
  expander: {
    color: "#5975ff"
  }
});

const activeButtonClass = "activeButton";

const Menuitem = (props) => {

  const generateIcon = (iconName) => {
    switch (iconName) {
      case "AttachMoney": return <AttachMoney classes={{ root: props.classes.listItemIcon }} />;
      case "AssignmentTurnedIn": return <AssignmentTurnedIn classes={{ root: props.classes.listItemIcon }} />;
      case "InsertChartOutlined": return <InsertChartOutlined classes={{ root: props.classes.listItemIcon }} />;
      case "Receipt": return <Receipt classes={{ root: props.classes.listItemIcon }} />;
      default: return <Label classes={{ root: props.classes.listItemIcon }} />
    };
  }

  let subMenuItems = props.item.submenu.map((item, index) => {
    return (<NavButton parentLabel={props.item.label} engLabel={props.item.engLabel} label={item.label} path={props.item.path + "/" + item.path} active={props.active.subMenuItemId === item.id}
      activeClass={activeButtonClass} clicked={() => (props.clicked(props.item.id, item.id))} key={index} iconStyle={{ root: props.classes.listItemIcon }}>
      {generateIcon(item.icon)}
    </NavButton>);
  });

  //covert 0 and 1 to true or false
  const expandedItem = props.item.expanded === 1 ? true : false;

  return (
    <div className={props.classes.menuItemWrapper}>

      <ListItem classes={{ root: props.classes.itemStyle }} onClick={() => props.expandClick(props.item.id)} button>
        <ListItemIcon classes={{ root: props.classes.listItemIcon }}><Home /></ListItemIcon>
        <ListItemText classes={{ root: props.classes.listItemTextRoot, primary: props.classes.listItemText }} primary={props.item.label} />
        {expandedItem ? <ExpandLess className={props.classes.expander} /> : <ExpandMore className={props.classes.expander} />}
      </ListItem>

      <Collapse in={expandedItem} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subMenuItems}
        </List>
      </Collapse>
    </div>
  );
};

//wrapping the component with withRouter so the props history, location etc... 
//will be passed to the nested components
export default withStyles(styles)(Menuitem);