// LIBRARIES
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

// ACTIONS
import {
  updateSummarizedBudget,
  updateDate
} from "../../redux/actions/summarizedBudgetActions";

// UTILS
import Helper from "../../helpers/Helper";

// COMPONENTS
import HeaderRow from "../../components/table/components/HeaderRow";
import GroupCell from "../../components/table/components/GroupCell";
import HeaderCell from "../../components/table/components/HeaderCell";
import TableRow from "../../components/table/components/TableRow";
import Cell from "../../components/table/components/Cell";
import NonZeroCell from "../../components/table/components/NonZeroCell";
import TableContainer from "../../components/table/TableContainer";
import GroupRow from "../../components/table/components/GroupRow";
import YearOnlyDatePicker from "../../components/DatePicker/YearOnlyDatePicker";
import TableSection from "../../components/Section/TableSection";
import SectionControlsContainer from "../../components/table/TableControls/SectionControlsContainer";

// HOC
import useTableLogic from "../../customHooks/useTableLogic";
import useTheme from "../../customHooks/useTheme";

const EDITMODE_TEMPLATE = "minmax(60px,5%) repeat(13,1fr)";
const DEFAULT_TEMPLATE = "minmax(60px,5%) repeat(13,1fr)";

const SummarizedBudgetsTableContainer = (props) => {
  const {
    date,
    data,
    isFetching,
    pageName,
    pageTitle,
    buildingName,
    buildingId
  } = props;

  const { toggleEditMode, editMode, textAreaInput, numberInput } =
    useTableLogic();

  const theme = useTheme();
  const dispatch = useDispatch();

  const onBlurHandler = (e) => {
    const target = e.target;

    const { key, index } = target.dataset;

    //copy old object so rollback would be possible
    const oldCopy = { ...data[index] };

    const newCopy = {};

    if (key === "notes") {
      const { innerText } = target;
      newCopy[key] = innerText;
    } else {
      const { value } = target;
      newCopy[key] = value === "" ? 0 : Number.parseFloat(value);
    }

    //prepare the params object
    let params = {
      buildingId,
      date,
      summarizedBudget: newCopy,
      summarized_section_id: oldCopy.summarized_section_id
    };

    dispatch(updateSummarizedBudget(params, oldCopy, newCopy, index));
    e.target.blur();
  };

  const getGridTemplateColumns = useCallback(() => {
    return editMode ? EDITMODE_TEMPLATE : DEFAULT_TEMPLATE;
  }, [editMode]);

  const getDataObject = useCallback(
    (index) => {
      return data[index];
    },
    [data]
  );

  const HeaderGroups = () => {
    const { colorSet } = theme;
    const { quarter, year } = date;

    const quarters = Helper.getYearQuarters(quarter);

    const quarterColumns = quarters.map((quarter, i) => {
      return (
        <GroupCell span={2} color={colorSet[i]} key={i}>
          {quarter}
        </GroupCell>
      );
    });

    return (
      <GroupRow gridTemplateColumns={getGridTemplateColumns()}>
        <GroupCell></GroupCell>
        <GroupCell></GroupCell>
        {quarterColumns}
        <GroupCell span={3} color={colorSet[4]}>{`סוף שנה ${year}`}</GroupCell>
        <GroupCell></GroupCell>
      </GroupRow>
    );
  };

  const HeadersRow = () => {
    const quarterColumns = [];

    for (let i = 0; i < 4; i++) {
      quarterColumns.push(<HeaderCell key={`תקציב${i}`}>{"תקציב"}</HeaderCell>);
      quarterColumns.push(<HeaderCell key={`ביצוע${i}`}>{"ביצוע"}</HeaderCell>);
    }

    return (
      <HeaderRow gridTemplateColumns={getGridTemplateColumns()}>
        <HeaderCell>{"שורה"}</HeaderCell>
        <HeaderCell>{"סעיף"}</HeaderCell>

        {quarterColumns}

        <HeaderCell editMode={editMode}>{"הערכה"}</HeaderCell>
        <HeaderCell>{"תקציב"}</HeaderCell>
        <HeaderCell>{"ביצוע"}</HeaderCell>

        <HeaderCell editMode={editMode}>{"הערות"}</HeaderCell>
      </HeaderRow>
    );
  };

  const Row = (index, row) => {
    // row data
    const rowData = row ? row : getDataObject(index);

    const quarterColumns = [];

    // generate month columns
    for (let i = 1; i < 5; i++) {
      quarterColumns.push(
        <NonZeroCell key={`quarter${i}_budget`}>
          {rowData[`quarter${i}_budget`]}
        </NonZeroCell>
      );
      quarterColumns.push(
        <NonZeroCell key={`quarter${i}_execution`}>
          {rowData[`quarter${i}_execution`]}
        </NonZeroCell>
      );
    }

    return (
      <TableRow key={index} gridTemplateColumns={getGridTemplateColumns()}>
        <Cell>{index + 1}</Cell>
        <Cell>{rowData["section"]}</Cell>
        {quarterColumns}
        {editMode ? (
          numberInput("evaluation", rowData["evaluation"], index, onBlurHandler)
        ) : (
          <NonZeroCell>{rowData["evaluation"]}</NonZeroCell>
        )}
        <NonZeroCell>{rowData["year_total_budget"]}</NonZeroCell>
        <NonZeroCell>{rowData["year_total_execution"]}</NonZeroCell>
        {editMode ? (
          textAreaInput("notes", rowData["notes"], index, onBlurHandler)
        ) : (
          <Cell style={{ paddingLeft: "10px" }}>{rowData["notes"]}</Cell>
        )}
      </TableRow>
    );
  };

  /**
   * only used in print mode
   * generates 2 extra rows of total income and outcome
   */
  const generateIncomeOutcomeData = useCallback(() => {
    if (data.length === 0) return;

    const row = { ...getDataObject(0) };

    const keys = Object.keys(row);

    keys.forEach((key) => {
      if (key !== "notes" || key !== "section") {
        row[key] = 0;
      } else {
        row[key] = "";
      }
    });

    const incomeRow = {
      ...row
    };
    incomeRow.section = "הכנסות";
    incomeRow.notes = "";

    const outcomeRow = {
      ...row
    };
    outcomeRow.section = "הוצאות";
    outcomeRow.notes = "";

    data.forEach((row) => {
      for (let i = 1; i < 5; i++) {
        incomeRow[`quarter${i}_budget`] += row[`quarter${i}_budget`];
        incomeRow[`quarter${i}_execution`] = 0;

        outcomeRow[`quarter${i}_budget`] = 0;
        outcomeRow[`quarter${i}_execution`] += row[`quarter${i}_execution`];
      }

      incomeRow.year_total_budget += row.year_total_budget;
      outcomeRow.year_total_execution += row.year_total_execution;
    });

    return {
      incomeRow,
      outcomeRow
    };
  }, [getDataObject, data]);

  const dataExist = data.length > 0;

  return (
    <TableSection>
      <SectionControlsContainer
        edit={true}
        editModeProps={{
          editMode,
          toggleEditMode,
          dataExist
        }}
        excel={true}
        excelProps={{
          data,
          fileName: Helper.getSummarizedBudgetsFilename(buildingName, date),
          buildingName,
          buildingId,
          date,
          pageName,
          dataExist
        }}
        print={true}
        printProps={{
          pageName,
          dataExist
        }}
      />
      <YearOnlyDatePicker
        date={date}
        buildingId={buildingId}
        updateDate={updateDate}
      />
      <TableContainer
        Row={Row}
        GroupComponent={HeaderGroups}
        HeaderComponent={HeadersRow}
        isFetching={isFetching}
        totalCount={data.length}
        printHeaderDetails={{
          pageTitle: buildingName + " - " + pageTitle,
          date: `שנה ${date.year}`
        }}
        generateIncomeOutcomeData={generateIncomeOutcomeData}
      />
    </TableSection>
  );
};

export default SummarizedBudgetsTableContainer;
