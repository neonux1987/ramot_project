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
import Tfoot from './components/Tfoot';

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
  printHeaderDetails,
  generateIncomeOutcomeData,
  noDataText
}) => {

  const { printMode, colors } = useSelector(store => store.print);
  const isFullscreen = useSelector(store => store.fullscreen.isFullscreen);
  const [components] = useTableComponents();

  // since the virutalized list causing problems
  // when trying to expand it to full height to
  // show all the items for print mode, we need
  // to generate the list of items regularely in
  // print mode only
  const generate = () => {

    const rows = [];
    for (let i = 0; i < totalCount; i++) {
      rows.push(<tr key={i}><td>{Row(i)}</td></tr>);
    }

    if (generateIncomeOutcomeData) {
      const incomeOutcomeData = generateIncomeOutcomeData();

      const incomeRow = <tr key="income"><td>{Row(totalCount + 1, incomeOutcomeData.incomeRow)}</td></tr>;
      const outcomeRow = <tr key="outcome"><td>{Row(totalCount + 2, incomeOutcomeData.outcomeRow)}</td></tr>;
      rows.push(incomeRow);
      rows.push(outcomeRow);
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

  // to be consistent tables with no group component, their height is lower 
  // and it leaves a margin from the bottom so we want that margin to be
  // with tables that do have group component instead of them sticking all 
  // the way to the bottom, so we add additional 40px to calculation when
  // group component exist.
  const bodyHeightClassName = GroupComponent && isFullscreen ? "tableBodyNoGroupHeader" : "";

  return <TableWrapper id="table" printMode={printMode} colors={colors}>

    <Thead printMode={printMode}>

      {/* PRINT HEADER active only in print mode*/}
      {printMode ? <PrintHeader printHeaderDetails={printHeaderDetails} /> : null}

      {totalCount > 0 ? GroupComponent && GroupComponent() : null}

      {totalCount > 0 ? HeaderComponent && HeaderComponent() : null}

    </Thead>

    <Tfoot printMode={printMode}>
      <div className="page-number"></div>
    </Tfoot>

    <Tbody
      printMode={printMode}
      divProps={{
        className: `_tableBody ${bodyHeightClassName}`,
        style: { minHeight: isFullscreen ? "initial" : "600px" }
      }}
    >

      {/* SPINNER */}
      {isFetching ? <CenteredLoader /> : null}

      {/* NO DATA */}
      {!isFetching && totalCount === 0 ? <NoData text={noDataText} /> : null}

      {/* TABLE */}
      {totalCount > 0 && !isFetching ? table : null}

    </Tbody>

  </TableWrapper>;

}

export default Table;
