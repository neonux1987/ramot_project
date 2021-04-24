import React from 'react'
import { Virtuoso } from 'react-virtuoso';
import { useSelector } from 'react-redux';
import './table.css';

import PrintHeader from './PrintHeader/PrintHeader';
import useTableComponents from '../../customHooks/useTableComponents';
import CenteredLoader from '../AnimatedLoaders/CenteredLoader';
import NoData from './components/NoData';
import Thead from './components/Thead';
import Tbody from './components/Tbody';
import TableWrapper from './components/TableWrapper';

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

  const printMode = useSelector(store => store.print.printMode);
  const [components] = useTableComponents();

  // since the virutalized list causing problems
  // when ytrying to expand it to full height to
  // show all the items for print mode, we need
  // to generate the list of items regularely in
  // print mode only
  const generate = () => {
    const rows = [];
    for (let i = 0; i < totalCount; i++) {
      rows.push(<tr key={i}><td>{Row(i)}</td></tr>);
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

    <Thead printMode={printMode}>

      {/* PRINT HEADER active only in print mode*/}
      <PrintHeader printHeaderDetails={printHeaderDetails} />

      {totalCount > 0 ? GroupComponent && GroupComponent() : null}

      {totalCount > 0 ? HeaderComponent && HeaderComponent() : null}

    </Thead>

    <Tbody
      printMode={printMode}
      divProps={{
        className: "_tableBody",
        style: { minHeight: "600px" }
      }}>

      {/* SPINNER */}
      {isFetching ? <CenteredLoader /> : null}

      {/* NO DATA */}
      {!isFetching && totalCount === 0 ? <NoData /> : null}

      {/* TABLE */}
      {totalCount > 0 && !isFetching ? table : null}

    </Tbody>

  </TableWrapper>;

}

export default Table;
