import React from "react";
import { Virtuoso } from "react-virtuoso";
import "./table.css";
import PrintHeader from "./PrintHeader/PrintHeader";
import CenteredLoader from "../AnimatedLoaders/CenteredLoader";
import NoData from "./components/NoData";
import Thead from "./components/Thead";
import Tbody from "./components/Tbody";
import TableWrapper from "./components/TableWrapper";
import Tfoot from "./components/Tfoot";

/*
  in print mode we must render table content without
  the virtualized list since it causes problems with full height
  when in print mode it's not capturing the render of all rows
*/
const Table = ({
  printMode,
  colors,
  isFullscreen,
  tableRef,
  printHeaderDetails,
  GroupComponent,
  HeaderComponent,
  totalCount,
  isFetching,
  generate,
  components,
  Row,
  noDataText
}) => {
  const table = printMode ? (
    generate()
  ) : (
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
  );

  // to be consistent tables with no group component, their height is lower
  // and it leaves a margin from the bottom so we want that margin to be
  // with tables that do have group component instead of them sticking all
  // the way to the bottom, so we add additional 40px to calculation when
  // group component exist.
  const bodyHeightClassName =
    GroupComponent && isFullscreen ? "tableBodyNoGroupHeader" : "";

  return (
    <TableWrapper
      id="table"
      printMode={printMode}
      colors={colors}
      isFullscreen={isFullscreen}
      tableRef={tableRef}
    >
      <Thead printMode={printMode}>
        {/* PRINT HEADER active only in print mode*/}
        {printMode ? (
          <PrintHeader printHeaderDetails={printHeaderDetails} />
        ) : null}

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
    </TableWrapper>
  );
};

export default Table;
