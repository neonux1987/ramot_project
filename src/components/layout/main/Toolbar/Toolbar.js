import React from "react";
import styles from './Toolbar.module.css';

const Toolbar = (props) => {
  return (
    <div className={styles.wrapper}>

      <div className={styles.section}>
        {`מיקום: ${props.buildingName} / ${props.header}`}
      </div>

      <div className={styles.section + " " + styles.alignCenter}>
        {`שנה ${props.year} / חודש ${props.month}`}
      </div>

      <div className={styles.section + " " + styles.alignLeft}>
        {`מע"מ: ${props.tax}`}
      </div>

    </div>

  );

}

export default Toolbar;