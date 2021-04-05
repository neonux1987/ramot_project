import React from 'react'

import './table.css';
import Spinner from '../Spinner/Spinner';

import { Virtuoso } from 'react-virtuoso';
import { useSelector } from 'react-redux';
import PrintHeader from './PrintHeader/PrintHeader';

const Table = ({ GroupComponent, HeaderComponent, Row, isFetching, itemCount, id, pageTitle, date }) => {

  const printMode = useSelector(store => store.print.printMode);
  const printHeight = itemCount * 35;
  const Loading = isFetching ? <Spinner wrapperClass="spinnerWrapper" size={60} loadingText={"טוען נתונים..."} /> :
    <div className="_tableBody">
      <Virtuoso
        style={{
          overflow: "overlay",
          direction: "rtl",
          height: printMode ? `${printHeight}px` : "40rem"
        }}//overscrollBehavior: "contain"
        totalCount={itemCount}
        item={Row}
        overscan={10}
      />
    </div>;

  return (
    <div className="_table" id={id}>

      {/* PRINT HEADER active only in print mode*/}
      <PrintHeader pageTitle={pageTitle} date={date} />

      {/* HEADERS GROUPS */}
      {itemCount > 0 ? GroupComponent && GroupComponent() : null}

      {/* HEADERS */}
      {itemCount > 0 ? HeaderComponent && HeaderComponent() : null}

      {!isFetching && itemCount === 0 ? <div className="spinnerWrapper noDataText">לא נבחר תאריך.</div> : Loading}

    </div>

  );
}

export default Table;