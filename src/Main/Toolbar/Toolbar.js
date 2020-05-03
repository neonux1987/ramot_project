// LIBRARIES
import React, { useEffect } from "react";
import { Notifications, MoreVert } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider } from "@material-ui/core";
import classnames from 'classnames';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

// CSS
import styles from './Toolbar.module.css';

// COMPONENTS
import Spinner from "../../components/Spinner/Spinner";
import EditVatModal from "../../components/modals/EditVatModal/EditVatModal";

// ACTIONS
import { toggleSidebar } from '../../redux/actions/sidebarActions';
import generalSettingsActions from '../../redux/actions/generalSettingsActions';

// HOOKS
import useModalLogic from "../../customHooks/useModalLogic";
import { restartApp } from "../../services/mainProcess.svc";

const Toolbar = ({ buildingName, page }) => {

  const navigationPath = buildingName && page ? `${buildingName} > ${page}` : page;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const { showModal } = useModalLogic();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const taxClickHandler = () => {
    handleClose();
    showModal(EditVatModal);
  }

  const dispatch = useDispatch();

  const { isFetching, data } = useSelector(store => store.generalSettings.generalSettings);

  useEffect(() => {
    dispatch(generalSettingsActions.fetchGeneralSettings());
  }, [dispatch]);

  const restartAppHandler = () => {
    restartApp();
  }

  const tax = isFetching ?
    <Spinner spinnerClass={styles.spinner} size={16} color={"#404040"} /> :
    <span style={{ marginRight: "5px" }}>{`${data[0].tax}%`}</span>;

  return (
    <div className={styles.wrapper}>

      <div className={classnames(styles.section, styles.flex, styles.flexAlignRight)}>

        <button
          className={styles.toggleBtn}
          onClick={() => dispatch(toggleSidebar())}
        >
          <MenuIcon style={{ display: "flex" }} />
        </button>
        <div style={{ marginRight: "10px", fontWeight: "600", fontSize: "15px" }}>
          {`${navigationPath}`}
        </div>
      </div>

      {/* <div className={classnames(styles.section, styles.alignCenter)}>
        {`שנה ${props.year} / ${props.quarter} / חודש ${props.month}`}
      </div> */}

      <div className={classnames(styles.section, styles.flexAlignLeft)}>

        <div className={styles.vatWrapper}>
          <span>מע"מ נוכחי: </span>{tax}
        </div>

        <button className={styles.notificationBtn}>
          <Notifications />
        </button>

        <button className={styles.moreBtn} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <MoreVert />
        </button>

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
            אתחל אפליקציה
          </MenuItem>

        </Menu>

      </div>

    </div>

  );

}

export default Toolbar;