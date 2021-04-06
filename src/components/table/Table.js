import React from 'react'

import './table.css';
import Spinner from '../Spinner/Spinner';

import { Virtuoso } from 'react-virtuoso';
import { useSelector } from 'react-redux';
import PrintHeader from './PrintHeader/PrintHeader';

const Table = ({
  GroupComponent,
  HeaderComponent,
  Row,
  isFetching,
  itemCount,
  printHeaderDetails
}) => {

  const printMode = useSelector(store => store.print.printMode);
  const printHeight = itemCount * 35;

  const table = <div className="_tableBody">
    <Virtuoso
      style={{
        overflow: "overlay",
        direction: "rtl",
        //height: printMode ? `${printHeight + 35}px` : "40rem"
      }}
      totalCount={itemCount}
      item={Row}
      overscan={10}
    />
  </div>;

  return (
    <div className="_table">

      {/* PRINT HEADER active only in print mode*/}
      <PrintHeader printHeaderDetails={printHeaderDetails} />

      {/* HEADERS GROUPS */}
      {itemCount > 0 ? GroupComponent && GroupComponent() : null}

      {/* HEADERS */}
      {itemCount > 0 ? HeaderComponent && HeaderComponent() : null}

      {/* SPINNER */}
      {isFetching ? <Spinner wrapperClass="spinnerWrapper" size={60} loadingText={"טוען נתונים..."} /> : null}

      {/* NO DATA */}
      {!isFetching && itemCount === 0 ? <div className="spinnerWrapper noDataText">לא נבחר תאריך.</div> : null}

      {/* TABLE */}
      {itemCount > 0 && !isFetching ? table : null}

      <div id="tableFooter"></div>

    </div>

  );
}

export default Table;