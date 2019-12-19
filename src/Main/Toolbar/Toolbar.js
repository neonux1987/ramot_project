import React from "react";
import { Notifications, Settings } from '@material-ui/icons';

import styles from './Toolbar.module.css';
import classnames from 'classnames';
import { Menu } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import sidebarActions from '../../redux/actions/sidebarActions';
import Spinner from "../../components/Spinner/Spinner";

const Toolbar = ({ buildingName, page }) => {

  const navigationPath = buildingName && page ? `${buildingName} > ${page}` : page;

  const dispatch = useDispatch();

  const { isFetching, data } = useSelector(store => store.generalSettings.generalSettings);

  const tax = isFetching ?
    <Spinner spinnerClass={styles.spinner} size={16} color={"#404040"} /> :
    <span style={{ marginRight: "5px" }}>{`${data[0].tax}%`}</span>;

  return (
    <div className={styles.wrapper}>

      <div className={classnames(styles.section, styles.flex, styles.flexAlignRight)}>

        <div>
          <Menu onClick={() => dispatch(sidebarActions.toggleSidebar())} style={{ display: "flex" }} />
        </div>
        <div style={{ marginRight: "10px" }}>
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

        <button className={styles.notifBtn}>
          <Notifications />
        </button>

      </div>

    </div>

  );

}

export default Toolbar;