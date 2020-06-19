// LIBRARIES
import React from "react";
import { Menu, Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import styles from './MoreMenu.module.css';
import { ExpandLess, ExpandMore, Description, TableChart, ChangeHistory, Settings } from "@material-ui/icons";
import SubMenu from "./SubMenu/SubMenu";
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import ButtonNavLinkWithSound from "../../../componentsWithSound/ButtonNavLinkWithSound/ButtonNavLinkWithSound";
import { initiateDbBackup } from '../../../services/dbBackup.svc';
import { toastManager } from "../../../toasts/ToastManager";
import ToastRender from "../../../components/ToastRender/ToastRender";

const MoreMenu = ({ anchorEl, handleClose, restartAppHandler, taxClickHandler }) => {

  const [open, setOpen] = React.useState(false);

  const expandClick = () => {
    setOpen(!open);
  };

  const upgradedHandleClose = () => {
    handleClose();
    setOpen(false)
  }

  const dbBackupHandler = async () => {
    const id = toastManager.info(<ToastRender spinner={true} message={"גיבוי בסיס נתונים החל..."} />, {
      autoClose: false
    });

    const promise = await initiateDbBackup().catch((result) => {
      toastManager.update(id, {
        render: <ToastRender message={result.error} />,
        type: toastManager.types.ERROR,
        delay: 3000,
        autoClose: 2500
      });
    });

    // success
    if (promise)
      toastManager.update(id, {
        render: <ToastRender done={true} message={"גיבוי בסיס הנתונים הסתיים בהצלחה."} />,
        type: toastManager.types.SUCCESS,
        delay: 2000,
        autoClose: 1500
      });

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
        component={ButtonNavLinkWithSound}
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
        component={ButtonNavLinkWithSound}
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
        component={ButtonNavLinkWithSound}
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

      <SubMenu open={open} restartAppHandler={restartAppHandler} dbBackupHandler={dbBackupHandler} />

    </Menu>
  );

}

export default React.memo(MoreMenu);