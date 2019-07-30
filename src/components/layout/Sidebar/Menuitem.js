import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, withStyles, Collapse } from '@material-ui/core';
import { Home, ArrowDropUp, ArrowDropDown, InsertChartOutlined, AssignmentTurnedIn, AttachMoney, Receipt, Label } from '@material-ui/icons';
import NavButton from './NavButton';

const styles = theme => ({
  listItemTextRoot: {
    padding: 0
  },
  menuItemWrapper: {
    //marginBottom: "10px"
  },
  listItemText: {
    fontSize: "16px",
    color: "#cbcdda"
  },
  listItemIcon: {
    color: "#cbcdda"
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
    color: "#cbcdda"
  },
  collapse: {
    background: "#22272f",
    paddingTop: "10px",
    paddingBottom: "6px",
    boxShadow: "inset 0px 1px 1px #050606, inset 0px -1px 1px #050606",
    borderTop: "1px solid #262b2f",
    borderBottom: "1px solid #262b2f"
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
    return (<NavButton buildingName={props.item.label} buildingNameEng={props.item.engLabel} page={item.label} path={props.item.path + "/" + item.path} active={props.active.subMenuItemId === item.id}
      activeClass={activeButtonClass} clicked={() => (props.clicked(props.item.id, item.id))} key={index} iconStyle={{ root: props.classes.listItemIcon }}>
      {generateIcon(item.icon)}
    </NavButton>);
  });

  //covert 0 and 1 to true or false
  const expandedItem = props.item.expanded === 1 ? true : false;

  return (
    <div className={props.classes.menuItemWrapper}>

      <ListItem classes={{ root: props.classes.itemStyle }} onClick={() => props.expandClick(props.item.id, props.item)} button>
        <ListItemIcon classes={{ root: props.classes.listItemIcon }}><Home /></ListItemIcon>
        <ListItemText classes={{ root: props.classes.listItemTextRoot, primary: props.classes.listItemText }} primary={props.item.label} />
        {expandedItem ? <ArrowDropUp className={props.classes.expander} /> : <ArrowDropDown className={props.classes.expander} />}
      </ListItem>

      <Collapse in={expandedItem} timeout="auto" unmountOnExit>
        <List className={props.classes.collapse} component="div" disablePadding>
          {subMenuItems}
        </List>
      </Collapse>
    </div>
  );
};

//wrapping the component with withRouter so the props history, location etc... 
//will be passed to the nested components
export default withStyles(styles)(Menuitem);