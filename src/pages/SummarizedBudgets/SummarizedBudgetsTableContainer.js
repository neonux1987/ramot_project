// LIBRARIES
import React, { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';

// ACTIONS
import {
  updateSummarizedBudget,
  updateDate
} from '../../redux/actions/summarizedBudgetActions';

// UTILS
import Helper from '../../helpers/Helper';

// CONTEXT
import ThemeContext from '../../context/ThemeContext';

// COMPONENTS
import TableControls from '../../components/table/TableControls/TableControls';
import PageControls from '../../components/PageControls/PageControls';
import EditControls from '../../components/EditControls/EditControls';
import HeaderRow from '../../components/table/components/HeaderRow';
import GroupCell from '../../components/table/components/GroupCell';
import HeaderCell from '../../components/table/components/HeaderCell';
import TableRow from '../../components/table/components/TableRow';
import Cell from '../../components/table/components/Cell';
import NonZeroCell from '../../components/table/components/NonZeroCell';
import TableActions from '../../components/table/TableActions/TableActions';
import Table from '../../components/table/Table';
import GroupRow from '../../components/table/components/GroupRow';

// HOC 
import useTableLogic from '../../customHooks/useTableLogic';
import YearOnlyDatePicker from '../../components/DatePicker/YearOnlyDatePicker';
import TableSection from '../../components/Section/TableSection';

const EDITMODE_TEMPLATE = "minmax(60px,5%) minmax(60px,5%) repeat(13,1fr)";
const DEFAULT_TEMPLATE = "minmax(60px,5%) repeat(13,1fr)";

const SummarizedBudgetsTableContainer = props => {

  const {
    date,
    data,
    isFetching,
    pageName,
    pageTitle,
    buildingName,
    buildingId
  } = props;

  const {
    toggleEditMode,
    editMode,
    textAreaInput,
    numberInput
  } = useTableLogic();

  const themeContext = useContext(ThemeContext);

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
  }

  const deleteHandler = (id, summarized_section_id) => {

  }

  const getGridTemplateColumns = useCallback(() => {
    return editMode ? EDITMODE_TEMPLATE : DEFAULT_TEMPLATE;
  }, [editMode]);


  const getDataObject = useCallback(index => {
    return data[index];
  }, [data]);

  const HeaderGroups = () => {

    const { colorSet } = themeContext;
    const { quarter, year } = date;

    const quarters = Helper.getYearQuarters(quarter);

    const quarterColumns = quarters.map((quarter, i) => {
      return <GroupCell
        span={2}
        color={colorSet[i]}
        key={i}
      >{quarter}</GroupCell>;
    });

    return <GroupRow
      gridTemplateColumns={getGridTemplateColumns()}>
      {editMode ? <GroupCell></GroupCell> : null}
      <GroupCell></GroupCell>
      <GroupCell></GroupCell>
      {quarterColumns}
      <GroupCell
        span={3}
        color={colorSet[4]}
      >{`סוף שנת ${year}`}</GroupCell>
      <GroupCell></GroupCell>
    </GroupRow>
  }

  const HeadersRow = () => {
    const { colorSet } = themeContext;

    const quarterColumns = [];

    for (let i = 0; i < 4; i++) {
      quarterColumns.push(<HeaderCell style={{ color: colorSet[i] }} key={`תקציב${i}`}>{"תקציב"}</HeaderCell>);
      quarterColumns.push(<HeaderCell style={{ color: colorSet[i] }} key={`ביצוע${i}`}>{"ביצוע"}</HeaderCell>);
    }

    const yearStyle = {
      color: colorSet[4]
    }

    return <HeaderRow gridTemplateColumns={getGridTemplateColumns()}>

      {editMode ? <HeaderCell>{"פעולות"}</HeaderCell> : null}
      <HeaderCell>{"שורה"}</HeaderCell>
      <HeaderCell>{"סעיף"}</HeaderCell>

      {quarterColumns}

      <HeaderCell editMode={editMode} style={yearStyle}>{"הערכה"}</HeaderCell>
      <HeaderCell style={yearStyle}>{"תקציב"}</HeaderCell>
      <HeaderCell style={yearStyle}>{"ביצוע"}</HeaderCell>

      <HeaderCell editMode={editMode}>{"הערות"}</HeaderCell>
    </HeaderRow>
  }

  const Row = (index, row) => {

    // row data
    const rowData = row ? row : getDataObject(index);

    const quarterColumns = [];

    // generate month columns
    for (let i = 1; i < 5; i++) {
      quarterColumns.push(<NonZeroCell key={`quarter${i}_budget`}>{rowData[`quarter${i}_budget`]}</NonZeroCell>);
      quarterColumns.push(<NonZeroCell key={`quarter${i}_execution`}>{rowData[`quarter${i}_execution`]}</NonZeroCell>);
    }

    return <TableRow key={index} gridTemplateColumns={getGridTemplateColumns()}>
      {editMode ? <TableActions deleteHandler={() => deleteHandler(rowData.id, index)} /> : null}
      <Cell>{index + 1}</Cell>
      <Cell>{rowData["section"]}</Cell>
      {quarterColumns}
      {editMode ? numberInput("evaluation", rowData["evaluation"], index, onBlurHandler) : <NonZeroCell>{rowData["evaluation"]}</NonZeroCell>}
      <NonZeroCell>{rowData["year_total_budget"]}</NonZeroCell>
      <NonZeroCell>{rowData["year_total_execution"]}</NonZeroCell>
      {editMode ? textAreaInput("notes", rowData["notes"], index, onBlurHandler) : <Cell style={{ paddingLeft: "10px" }}>{rowData["notes"]}</Cell>}
    </TableRow>
  }

  /**
   * only used in print mode
   * generates 2 extra rows on total income and outcome
   */
  const generateIncomeOutcomeData = useCallback(() => {
    if (data.length === 0)
      return;

    const row = { ...getDataObject(0) };

    const keys = Object.keys(row);

    keys.forEach(key => {
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

    data.forEach(row => {

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
    }
  }, [getDataObject, data]);

  return (
    <TableSection
      bgColor="#415365"
      header={
        <TableControls
          rightPane={
            <EditControls
              editMode={editMode}
              toggleEditMode={toggleEditMode}
              dataExist={data.length > 0}
            />
          } // end rightPane
          middlePane={
            <YearOnlyDatePicker
              date={date}
              buildingId={buildingId}
              updateDate={updateDate}
            />
          } // end middlePane
          leftPane={<PageControls
            dataExist={data.length > 0}
            excel={{
              data,
              fileName: Helper.getSummarizedBudgetsFilename(buildingName, date),
              buildingName,
              buildingId,
              date
            }}
            print={{
              pageName
            }}
            pageName={pageName}
          />} // end leftPane

        />  //End TableControls
      }
    >
      <Table
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

}

export default SummarizedBudgetsTableContainer;