import React from 'react'
import {
  List,
  AutoSizer
} from 'react-virtualized';
import './table.css';
import Spinner from '../Spinner/Spinner';

import { Virtuoso } from 'react-virtuoso'

export default ({ GroupComponent, HeaderComponent, Row, isFetching, itemCount, cache }) => {

  const Loading = isFetching ? <Spinner wrapperClass="spinnerWrapper" size={60} loadingText={"טוען נתונים..."} /> : <div className="_tableBody">
    {/* <AutoSizer disableHeight>
      {({ width }) => {
        return <List
          style={{ overflow: "overlay", direction: "rtl", paddingLeft: "10px" }}
          width={width}
          height={630}
          rowCount={itemCount}
          rowHeight={cache.rowHeight}
          minHeight={cache.minHeight}
          deferredMeasurementCache={cache}
          rowRenderer={Row}
        />;
      }}
    </AutoSizer> */}

    <Virtuoso
      style={{ overflow: "overlay", direction: "rtl" }}
      totalCount={itemCount}
      item={Row}
      overscan={200}
    />

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