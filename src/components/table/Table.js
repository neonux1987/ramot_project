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

  const element = printMode ? document.getElementById("tableBody") : null;
  const printHeight = element ? element.style.height : "600px";

  const table = <Virtuoso
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

      <div className="_tableBody" style={{ minHeight: printHeight }}>
        {/* SPINNER */}
        {isFetching ? <Spinner wrapperClass="spinnerWrapper" size={60} loadingText={"טוען נתונים..."} /> : null}

        {/* NO DATA */}
        {!isFetching && totalCount === 0 ? <div className="spinnerWrapper noDataText">לא נבחר תאריך.</div> : null}

        {/* TABLE */}
        {totalCount > 0 && !isFetching ? table : null}
      </div>

    </Tbody>

    <Tfoot />

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

const Tfoot = ({ printMode, children }) => {
  return printMode ? <tfoot>{children}</tfoot> : null;
}