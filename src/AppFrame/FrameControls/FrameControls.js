import React from 'react';
import styles from './FrameControls.module.css';
import classnames from 'classnames';
import { Minimize, CheckBoxOutlineBlank, Close } from '@material-ui/icons';


const FrameControls = ({ className, handlers }) => {

  return (
    <div className={className}>
      <button className={classnames(styles.button, styles.minimize)} onClick={handlers.minimize}><Minimize /></button>
      <button className={classnames(styles.button, styles.maximize)} onClick={handlers.maximize}><CheckBoxOutlineBlank /></button>
      <button className={classnames(styles.button, styles.close)} onClick={handlers.close}><Close /></button>
    </div>
  );
}

export default FrameControls;