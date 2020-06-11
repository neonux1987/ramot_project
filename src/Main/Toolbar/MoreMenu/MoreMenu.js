// LIBRARIES
import React from "react";
import { NavLink } from "react-router-dom";
import { MenuItem, Menu, Divider } from "@material-ui/core";
import styles from './MoreMenu.module.css';

const MoreMenu = ({ anchorEl, handleClose, restartAppHandler, taxClickHandler }) => {
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem className={styles.menuItem} onClick={handleClose}>
        <NavLink
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
          הפקת דוחות
            </NavLink>
      </MenuItem>

      <MenuItem className={styles.menuItem} onClick={handleClose}>
        <NavLink
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
          ניהול קודי הנהלת חשבונות
            </NavLink>
      </MenuItem>

      <MenuItem className={styles.menuItem} onClick={handleClose}>
        <NavLink
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
          ניהול סעיפים מסכמים
            </NavLink>
      </MenuItem>

      <MenuItem onClick={taxClickHandler}>
        שינוי מע"מ
          </MenuItem>

      <Divider style={{ margin: "0 10px" }} />

      <MenuItem className={styles.menuItem} onClick={handleClose}>
        <NavLink
          className={styles.menuItemLink}
          to={{
            pathname: "/הגדרות",
            state: {
              page: "הגדרות",
              buildingName: "הגדרות",
              buildingNameEng: "settings"
            }
          }}
          exact
        >
          הגדרות
            </NavLink>
      </MenuItem>

      <MenuItem className={styles.menuItem} onClick={restartAppHandler}>
        <NavLink
          className={styles.menuItemLink}
          to={{}}
          exact
        >
          אתחל אפליקציה
            </NavLink>

      </MenuItem>

    </Menu>
  );

}

export default React.memo(MoreMenu);