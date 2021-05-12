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
  printHeaderDetails,
  generateIncomeOutcomeData
}) => {

  const { printMode, colors } = useSelector(store => store.print);
  const isFullscreen = useSelector(store => store.fullscreen.isFullscreen);
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
  //useWindowScroll
  />;

  const tableHeight = GroupComponent && isFullscreen ? "94vh" : "94vh";
  const bodyHeight = GroupComponent && isFullscreen ? "80vh" : "85.7vh";

  return <TableWrapper id="table" printMode={printMode} colors={colors} height={tableHeight}>

    <Thead printMode={printMode}>

      {/* PRINT HEADER active only in print mode*/}
      {printMode ? <PrintHeader printHeaderDetails={printHeaderDetails} /> : null}

      {totalCount > 0 ? GroupComponent && GroupComponent() : null}

      {totalCount > 0 ? HeaderComponent && HeaderComponent() : null}

    </Thead>

    <Tbody
      printMode={printMode}
      divProps={{
        className: "_tableBody",
        style: { minHeight: isFullscreen ? "initial" : "600px", height: bodyHeight }
      }}
    >

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
