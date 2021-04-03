import React from 'react'

import './table.css';
import Spinner from '../Spinner/Spinner';

import { Virtuoso } from 'react-virtuoso';
import { useSelector } from 'react-redux';
import PrintHeader from './PrintHeader/PrintHeader';

const Table = ({ GroupComponent, HeaderComponent, Row, isFetching, itemCount, id, pageTitle, date }) => {

  const enabled = useSelector(store => store.print.enabled);

  const Loading = isFetching ? <Spinner wrapperClass="spinnerWrapper" size={60} loadingText={"טוען נתונים..."} /> : <div className="_tableBody">
    <Virtuoso
      style={{
        overflow: "overlay",
        direction: "rtl",
        height: enabled ? "100vh" : "40rem"
      }}//overscrollBehavior: "contain"
      totalCount={itemCount}
      item={Row}
      overscan={10}
    />
  </div>;

  return (
    <div className="_table" id={id}>

      {
        !enabled ? null : <PrintHeader pageTitle={pageTitle} date={date} />
      }

      {/* HEADERS GROUPS */}
      {itemCount > 0 ? GroupComponent && GroupComponent() : null}
      {/* END HEADERS GROUPS */}

      {/* HEADERS */}
      {itemCount > 0 ? HeaderComponent && HeaderComponent() : null}
      {/* END HEADERS */}

      {!isFetching && itemCount === 0 ? <div className="spinnerWrapper noDataText">לא נבחר תאריך.</div> : Loading}

    </div>

  );
}

export default Table;