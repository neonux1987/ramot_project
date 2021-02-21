import React from 'react';
import styles from './AppFrameContainer.module.css';
import classnames from 'classnames';
import Logo from './Logo/Logo';
import ToggleButton from '../Main/Toolbar/ToggleButton/ToggleButton';
import { toggleSidebar } from '../redux/actions/sidebarActions';
import FrameControls from './FrameControls/FrameControls';
import { useDispatch } from 'react-redux';

const AppFrameContainer = ({ handlers }) => {

  const dispatch = useDispatch();

  const toggleClick = () => {
    dispatch(toggleSidebar())
  }

  return (
    <div className={styles.appFrame}>

      <div className={styles.draggableRegion}>
        {/* <div className={styles.section}>
          <Logo />
        </div> */}

        <div className={styles.section} style={{ flex: "1 1", display: "flex", justifyContent: "end" }}>
          <ToggleButton className={classnames(styles.toggleBtn, styles.noDrag)} onClick={toggleClick} />
        </div>

        <div className={styles.section} style={{ flex: "1 1" }}>

          <FrameControls className={styles.actions} handlers={handlers} />

        </div>

      </div>

    </div>
  );
}

export default AppFrameContainer;