// LIBRARIES
import React from "react";
import { Menu, Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import styles from './MoreMenu.module.css';
import { ExpandLess, ExpandMore, Description, TableChart, ChangeHistory, Settings } from "@material-ui/icons";
import SubMenu from "./SubMenu/SubMenu";
import CustomNavLink from "../../../components/CustomNavLink/CustomNavLink";
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";

const MoreMenu = ({ anchorEl, handleClose, restartAppHandler, taxClickHandler }) => {

  const [open, setOpen] = React.useState(false);

  const expandClick = () => {
    setOpen(!open);
  };

  const upgradedHandleClose = () => {
    handleClose();
    setOpen(false)
  }

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={upgradedHandleClose}
    >

      <ListItem
        button
        component={CustomNavLink}
        onClick={upgradedHandleClose}
        className={styles.menuItemLink}
        to={{
          pathname: "/ניהול/הפקת דוחות",
          state: {
            page: "הפקת דוחות",
            buildingName: "ניהול",
            buildingNameEng: "management"
          }
        }}
        exact
      >
        <ListItemIcon className={styles.listIcon}>
          <Description />
        </ListItemIcon>
        <ListItemText primary="הפקת דוחות" />
      </ListItem>


      <ListItem
        button
        component={CustomNavLink}
        onClick={upgradedHandleClose}
        className={styles.menuItemLink}
        to={{
          pathname: "/ניהול/קודי הנהלת חשבונות",
          state: {
            page: "קודי הנהלת חשבונות",
            buildingName: "ניהול",
            buildingNameEng: "management"
          }
        }}
        exact
      >
        <ListItemIcon className={styles.listIcon}>
          <TableChart />
        </ListItemIcon>
        <ListItemText primary="ניהול קודי הנהלת חשבונות" />
      </ListItem>

      <ListItem
        button
        component={CustomNavLink}
        onClick={upgradedHandleClose}
        className={styles.menuItemLink}
        to={{
          pathname: "/ניהול/סעיפים מסכמים",
          state: {
            page: "סעיפים מסכמים",
            buildingName: "ניהול",
            buildingNameEng: "management"
          }
        }}
        exact
      >
        <ListItemIcon className={styles.listIcon}>
          <TableChart />
        </ListItemIcon>
        <ListItemText primary="ניהול סעיפים מסכמים" />
      </ListItem>

      <ListItem
        component={ButtonWithSound}
        onClick={taxClickHandler}
        className={styles.menuItemLink}
      >
        <ListItemIcon className={styles.listIcon}>
          <ChangeHistory />
        </ListItemIcon>
        <ListItemText primary={`שינוי מע"מ`} />
      </ListItem>

      <Divider style={{ margin: "8px" }} />

      <ListItem
        button
        component={ButtonWithSound}
        onClick={expandClick}
        className={styles.menuItemLink}
      >
        <ListItemIcon className={styles.listIcon}>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="עוד..." />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <SubMenu open={open} restartAppHandler={restartAppHandler} />

    </Menu>
  );

}

export default React.memo(MoreMenu);