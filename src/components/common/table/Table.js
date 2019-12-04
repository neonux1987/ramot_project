import React from 'react'
import { VariableSizeList as List } from 'react-window';
import './table.css';
import Spinner from '../Spinner/Spinner';

export default ({ GroupComponent, HeaderComponent, Row, isFetching, itemSize, itemCount }) => {

  const Loading = isFetching ? <Spinner wrapperClass="spinnerWrapper" size={60} loadingText={"טוען נתונים..."} /> : <div className="_tableBody">
    <List
      style={{ overflow: "overlay" }}
      direction="rtl"
      height={630}
      itemCount={880}
      itemSize={itemSize}
    >
      {Row}
    </List>
  </div>;


  return (
    <div className="_table">

      {/* HEADERS GROUPS */}
      {GroupComponent && GroupComponent()}
      {/* END HEADERS GROUPS */}

      {/* HEADERS */}
      {HeaderComponent()}
      {/* END HEADERS */}

      {Loading}

    </div>

  );
}