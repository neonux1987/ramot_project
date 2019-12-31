import React from 'react'

import './table.css';
import Spinner from '../Spinner/Spinner';

import { Virtuoso } from 'react-virtuoso'

export default ({ GroupComponent, HeaderComponent, Row, isFetching, itemCount }) => {

  const Loading = isFetching ? <Spinner wrapperClass="spinnerWrapper" size={60} loadingText={"טוען נתונים..."} /> : <div className="_tableBody">
    <Virtuoso
      style={{ overflow: "overlay", direction: "rtl", overscrollBehavior: "contain" }}
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