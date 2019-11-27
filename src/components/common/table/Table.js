import React from 'react'
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import { StylesContext } from '@material-ui/styles/StylesProvider';
import styles from './Table.module.css';

export default ({ groupColumns, headerColumns, Row, editMode }) => {

  /* const groups = groupColumns.map(({ title, bgColor, textColor, span = 1 }) => {
    return (
      <div
        className={styles.headerColumn}
        style={{
          gridColumn: `span ${span}`,
          background: bgColor
        }}>
        <span style={{ color: textColor }}>{title}</span>
      </div>
    );
  }); */

  const headers = headerColumns.map(({ title, bgColor, textColor }, index) => {
    return (
      <div key={index} className={styles.headerColumn} style={{ display: title === "פעולות" && !editMode ? "none" : "block" }}>
        <span style={{
          backgroundColor: bgColor,
          color: textColor
        }}>{title}</span>
      </div>);
  });

  return (
    <div className={styles.grid}>

      {/* HEADERS GROUPS */}
      {/* <div className={styles.row}>
        {groups}
      </div> */}{/* END HEADERS GROUPS */}

      {/* HEADERS */}
      <div className={styles.row}>
        {headers}
      </div>{/* END HEADERS */}

      <AutoSizer>
        {({ height, width }) => (
          <List
            className="row"
            direction="rtl"
            height={650}
            itemCount={880}
            itemSize={35}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>

  );
}