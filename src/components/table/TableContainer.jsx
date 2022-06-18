import React from "react";
import { useSelector } from "react-redux";
import useTableComponents from "../../customHooks/useTableComponents";
import usePrintRef from "../../customHooks/usePrintRef";
import Table from "./Table";

/*
  in print mode we must render table content without
  the virtualized list since it causes problems with full height
  when in print mode it's not capturing the render of all rows
*/
const TableContainer = ({
  GroupComponent,
  HeaderComponent,
  Row,
  isFetching,
  totalCount,
  printHeaderDetails,
  generateIncomeOutcomeData,
  noDataText
}) => {
  const { printMode, colors } = useSelector((store) => store.print);
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);
  const [components] = useTableComponents();
  const tableRef = usePrintRef();

  // since the virutalized list causing problems
  // when trying to expand it to full height to
  // show all the items for print mode, we need
  // to generate the list of items regularely in
  // print mode only
  const generate = () => {
    const rows = [];
    for (let i = 0; i < totalCount; i++) {
      rows.push(
        <tr key={i}>
          <td>{Row(i)}</td>
        </tr>
      );
    }

    if (generateIncomeOutcomeData) {
      const incomeOutcomeData = generateIncomeOutcomeData();

      const incomeRow = (
        <tr key="income">
          <td>{Row(totalCount + 1, incomeOutcomeData.incomeRow)}</td>
        </tr>
      );
      const outcomeRow = (
        <tr key="outcome">
          <td>{Row(totalCount + 2, incomeOutcomeData.outcomeRow)}</td>
        </tr>
      );
      rows.push(incomeRow);
      rows.push(outcomeRow);
    }

    return rows;
  };

  return (
    <Table
      printMode={printMode}
      colors={colors}
      isFullscreen={isFullscreen}
      tableRef={tableRef}
      printHeaderDetails={printHeaderDetails}
      GroupComponent={GroupComponent}
      HeaderComponent={HeaderComponent}
      totalCount={totalCount}
      isFetching={isFetching}
      generate={generate}
      components={components}
      Row={Row}
      noDataText={noDataText}
    />
  );
};

export default TableContainer;
