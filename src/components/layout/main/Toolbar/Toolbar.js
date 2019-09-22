import React from "react";
import styles from './Toolbar.module.css';

const Toolbar = (props) => {
  const location = props.buildingName && props.header ? `${props.buildingName} / ${props.header}` : props.header;
  return (
    <div className={styles.wrapper}>

      <div className={styles.section}>
        {`מיקום: ${location}`}
      </div>

      <div className={styles.section + " " + styles.alignCenter}>
        {`שנה ${props.year} / חודש ${props.month}`}
      </div>

      <div className={styles.section + " " + styles.alignLeft}>
        {`מע"מ נוכחי: ${props.tax}`}
      </div>

    </div>

  );

}

export default Toolbar;