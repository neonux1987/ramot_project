import React from 'react'
import { FixedSizeList as List } from 'react-window';
import styles from './Table.module.css';
import Spinner from '../Spinner/Spinner';

export default ({ GroupComponent, HeaderComponent, Row, isFetching }) => {


  const Loading = isFetching ? <Spinner size={60} loadingText={"טוען הגדרות טבלה..."} /> : <List
    className="row"
    style={{ overflow: "overlay" }}
    direction="rtl"
    height={650}
    itemCount={880}
    itemSize={30}

  >
    {Row}
  </List>;


  return (
    <div className={styles.table}>

      {/* HEADERS GROUPS */}
      {GroupComponent}
      {/* END HEADERS GROUPS */}

      {/* HEADERS */}
      {HeaderComponent()}
      {/* END HEADERS */}

      {Loading}

    </div>

  );
}