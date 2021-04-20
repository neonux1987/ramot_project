import React from 'react'

import './table.css';
import Spinner from '../Spinner/Spinner';

import { Virtuoso } from 'react-virtuoso';
import { useSelector } from 'react-redux';
import PrintHeader from './PrintHeader/PrintHeader';
import useTableComponents from '../../customHooks/useTableComponents';

/*
  in print mode we must render table content without
  the virtualized list since it causes problems with full height
  when in print mode it's not capturing the render of all rows
*/
const Table = ({
  GroupComponent,
  HeaderComponent,
  Row,
  isFetching,
  totalCount,
  printHeaderDetails
}) => {

  const printMode = true;

  const [components] = useTableComponents();

  const element = printMode ? document.getElementById("tableBody") : null;
  const printHeight = element ? element.style.height : "600px";

  const generate = () => {
    const rows = [];
    for (let i = 0; i < totalCount; i++) {
      rows.push(Row(i));
    }

    return rows;
  }

  const table = printMode ? generate() : <Virtuoso
    style={{
      overflow: "overlay",
      direction: "rtl"
    }}
    totalCount={totalCount}
    itemContent={Row}
    overscan={10}
    components={components}
  />;

  return <TableWrapper id="table" printMode={printMode}>

    {/* TABLE HEADERS */}
    <Thead printMode={printMode}>

      {/* PRINT HEADER active only in print mode*/}
      <PrintHeader printHeaderDetails={printHeaderDetails} />

      {totalCount > 0 ? GroupComponent && GroupComponent() : null}

      {totalCount > 0 ? HeaderComponent && HeaderComponent() : null}

    </Thead>

    <Tbody printMode={printMode}>

      <div className="_tableBody" style={{ minHeight: "600px" }}>
        {/* SPINNER */}
        {isFetching ? <Spinner wrapperClass="spinnerWrapper" size={60} loadingText={"טוען נתונים..."} /> : null}

        {/* NO DATA */}
        {!isFetching && totalCount === 0 ? <div className="spinnerWrapper noDataText">לא נבחר תאריך.</div> : null}

        {/* TABLE */}
        {totalCount > 0 && !isFetching ? table : null}
      </div>

    </Tbody>

  </TableWrapper>;

}

export default Table;

const TableWrapper = ({ printMode, children, id }) => {

  return printMode ? <table id={id}>{children}</table> : <div id={id}>{children}</div>;

}

const Thead = ({ printMode, children }) => {
  return printMode ? <thead>
    <tr>
      <th>
        {children}
      </th>
    </tr>
  </thead> : <div>{children}</div>;
}

const Tbody = ({ printMode, children }) => {
  return printMode ? <tbody>
    <tr>
      <td>
        {children}
      </td>
    </tr>
  </tbody> : <div>{children}</div>;
}