import React from "react";
import styles from './Toolbar.module.css';
import classnames from 'classnames';
import { Menu } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import sidebarActions from '../../../../redux/actions/sidebarActions';

const Toolbar = (props) => {

  const location = props.buildingName && props.header ? `${props.buildingName} > ${props.header}` : props.header;

  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>

      <div className={classnames(styles.section, styles.flex, styles.flexAlignRight)}>

        <div>
          <Menu onClick={() => dispatch(sidebarActions.toggleSidebar())} style={{ display: "flex" }} />
        </div>
        <div style={{ marginRight: "10px" }}>
          {`${location}`}
        </div>
      </div>

      {/* <div className={classnames(styles.section, styles.alignCenter)}>
        {`שנה ${props.year} / ${props.quarter} / חודש ${props.month}`}
      </div> */}

      <div className={classnames(styles.section, styles.flexAlignLeft)}>
        {`מע"מ נוכחי: ${props.tax}`}
      </div>

    </div>

  );

}

export default Toolbar;