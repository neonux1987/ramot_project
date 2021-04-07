import React from 'react'

import './table.css';
import Spinner from '../Spinner/Spinner';

import { Virtuoso } from 'react-virtuoso';
import { useSelector } from 'react-redux';
import PrintHeader from './PrintHeader/PrintHeader';
import useTableComponents from '../../customHooks/useTableComponents';

const Table = ({
  GroupComponent,
  HeaderComponent,
  Row,
  isFetching,
  totalCount,
  printHeaderDetails
}) => {

  const printMode = useSelector(store => store.print.printMode);

  const [components] = useTableComponents();

  const printHeight = totalCount * 35;

  const table = <div className="_tableBody" style={{ height: printMode ? `${printHeight + 35}px` : "600px" }}>
    <Virtuoso
      style={{
        overflow: "overlay",
        direction: "rtl"
      }}
      totalCount={totalCount}
      itemContent={Row}
      overscan={10}
      components={components}
    />
  </div>;

  return (
    <div id="table">

      {/* TABLE HEADERS */}
      <div id="tableHeaders">

        {/* PRINT HEADER active only in print mode*/}
        <PrintHeader printHeaderDetails={printHeaderDetails} />

        {totalCount > 0 ? GroupComponent && GroupComponent() : null}

        {totalCount > 0 ? HeaderComponent && HeaderComponent() : null}

      </div>

      {/* SPINNER */}
      {isFetching ? <Spinner wrapperClass="spinnerWrapper" size={60} loadingText={"טוען נתונים..."} /> : null}

      {/* NO DATA */}
      {!isFetching && totalCount === 0 ? <div className="spinnerWrapper noDataText">לא נבחר תאריך.</div> : null}

      {/* TABLE */}
      {totalCount > 0 && !isFetching ? table : null}

      <div id="tableFooter"></div>

    </div>

  );
}

export default Table;