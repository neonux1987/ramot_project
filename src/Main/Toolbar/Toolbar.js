// LIBRARIES
import React, { useEffect, useState } from "react";
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// CSS
import styles from './Toolbar.module.css';

// COMPONENTS
import ToggleButton from "./ToggleButton/ToggleButton";
import BreadcrumbsContainer from "./Breadcrumbs/BreadcrumbsContainer";

// ACTIONS
import { toggleSidebar } from '../../redux/actions/toggleSidebarActions';
import { Slide } from "@material-ui/core";
import { useLocation } from "react-router";

const Toolbar = () => {

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [show, setShow] = useState(true);

  const onClick = () => {
    dispatch(toggleSidebar());
  };

  // make the tool bar hide and re-appear on page change
  // to create a cool animation :D
  useEffect(() => {
    setShow(false);

    setTimeout(() => {
      setShow(true);
    }, 400);
  }, [pathname]);

  const themeSettings = useSelector(store => store.settings.data.theme);

  const noFollowRule = !themeSettings.sticky_toolbar ? styles.noFollow : "";

  return <Slide direction="down" in={show} timeout={400}>
    <div className={classnames(styles.wrapper, noFollowRule)} id="toolbar">

      <div className={classnames(styles.section, styles.flex, styles.flexAlignRight)}>
        <ToggleButton onClick={onClick} />
        <BreadcrumbsContainer pathname={pathname} />
      </div>

    </div>
  </Slide>;

}

export default React.memo(Toolbar);