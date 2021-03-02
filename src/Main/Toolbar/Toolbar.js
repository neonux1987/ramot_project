// LIBRARIES
import React from "react";
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// CSS
import styles from './Toolbar.module.css';

// COMPONENTS
import ToggleButton from "./ToggleButton/ToggleButton";
import BreadcrumbsContainer from "./Breadcrumbs/BreadcrumbsContainer";

// ACTIONS
import { toggleSidebar } from '../../redux/actions/sidebarActions';

const Toolbar = () => {

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(toggleSidebar());
  };

  const themeSettings = useSelector(store => store.settings.data.theme);

  const noFollowRule = !themeSettings.sticky_toolbar ? styles.noFollow : "";

  return (
    <div className={classnames(styles.wrapper, noFollowRule)}>

      <div className={classnames(styles.section, styles.flex, styles.flexAlignRight)}>
        <ToggleButton onClick={onClick} />
        <BreadcrumbsContainer />
      </div>

    </div>

  );

}

export default React.memo(Toolbar);