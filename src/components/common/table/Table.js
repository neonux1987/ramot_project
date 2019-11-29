import React from 'react'
import { FixedSizeList as List } from 'react-window';
import './table.css';
import Spinner from '../Spinner/Spinner';

export default ({ GroupComponent, HeaderComponent, Row, isFetching }) => {


  const Loading = isFetching ? <Spinner size={60} loadingText={"טוען הגדרות טבלה..."} /> : <div className="_tableBody">
    <List
      style={{ overflow: "overlay" }}
      direction="rtl"
      height={630}
      itemCount={880}
      itemSize={35}

    >
      {Row}
    </List>
  </div>;


  return (
    <div className="_table">

      {/* HEADERS GROUPS */}
      {GroupComponent()}
      {/* END HEADERS GROUPS */}

      {/* HEADERS */}
      {HeaderComponent()}
      {/* END HEADERS */}

      {Loading}

    </div>

  );
}