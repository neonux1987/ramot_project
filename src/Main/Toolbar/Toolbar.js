import React from "react";
import { Notifications, MoreVert, Settings } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './Toolbar.module.css';
import classnames from 'classnames';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import sidebarActions from '../../redux/actions/sidebarActions';
import Spinner from "../../components/Spinner/Spinner";
import useModalLogic from "../../customHooks/useModalLogic";
import EditTaxModal from "../../components/modals/EditTaxModal/EditTaxModal";

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
    showModal(EditTaxModal);

  }

  const dispatch = useDispatch();

  const { isFetching, data } = useSelector(store => store.generalSettings.generalSettings);

  const tax = isFetching ?
    <Spinner spinnerClass={styles.spinner} size={16} color={"#404040"} /> :
    <span style={{ marginRight: "5px" }}>{`${data[0].tax}%`}</span>;

  return (
    <div className={styles.wrapper}>

      <div className={classnames(styles.section, styles.flex, styles.flexAlignRight)}>

        <button
          className={styles.toggleBtn}
          onClick={() => dispatch(sidebarActions.toggleSidebar())}
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

        </Menu>

      </div>

    </div>

  );

}

export default Toolbar;