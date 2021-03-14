// LIBRARIES
import React, { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';

// ACTIONS
import {
  fetchBudgetExecutions,
  updateBudgetExecution,
  deleteBudgetExecution,
  updateDate,
} from '../../redux/actions/budgetExecutionsActions';

// UTILS
import Helper from '../../helpers/Helper';

// CONTEXT
import ThemeContext from '../../context/ThemeContext';

// COMPONENTS
import TableControls from '../../components/table/TableControls/TableControls';
import PageControls from '../../components/PageControls/PageControls';
import DatePicker from '../../components/DatePicker/DatePicker';
import EditControls from '../../components/EditControls/EditControls';
import TableWrapper from '../../components/table/TableWrapper/TableWrapper';
import GroupColumn from '../../components/table/GroupColumn';
import HeaderRow from '../../components/table/HeaderRow';
import Column from '../../components/table/Column';
import Row from '../../components/table/Row';
import NonZeroNumberColumn from '../../components/table/NonZeroNumberColumn';
import TableActions from '../../components/table/TableActions/TableActions';
import Table from '../../components/table/Table';
import GroupRow from '../../components/table/GroupRow';
import ConfirmDeleteBudgetExecution from '../../components/modals/ConfirmDeleteBudgetExecution/ConfirmDeleteBudgetExecution';

// HOOKS
import useModalLogic from '../../customHooks/useModalLogic';
import AddNewContainer from './AddNewContainer/AddNewContainer';
import HeaderColumn from '../../components/table/HeaderColumn';
import useTableLogic from '../../customHooks/useTableLogic';
import useDifferenceColor from '../../customHooks/useDifferenceColor';

const EDITMODE_TEMPLATE = "minmax(60px,5%) minmax(60px,5%) repeat(12,1fr)";
const DEFAULT_TEMPLATE = "minmax(60px,5%) repeat(12,1fr)";

const BudgetExecutionsTableContainer = props => {

  const {
    date,
    buildingName,
    buildingNameEng,
    pageName,
    pageTitle,
    data,
    isFetching
  } = props;

  const {
    toggleEditMode,
    editMode,
    toggleAddNewMode,
    addNewMode,
    textAreaInput,
    numberInput
  } = useTableLogic();

  const themeContext = useContext(ThemeContext);
  const { showModal } = useModalLogic();
  const dispatch = useDispatch();

  const [whichColor] = useDifferenceColor();

  const onBlurHandler = (e) => {

    const target = e.target;

    const { value } = target;

    const { key, index } = target.dataset;

    //copy old object so rollback would be possible
    const oldBudgetExecutionObj = { ...data[index] };

    // new budget execution copy
    const budgetExecutionObj = { ...oldBudgetExecutionObj };

    if (key === "notes") {
      const { innerText } = e.target;
      //replace the value
      budgetExecutionObj[key] = innerText === "" ? "" : innerText;
    } else {
      //replace the value
      budgetExecutionObj[key] = value === "" ? 0 : parseFloat(value);
    }

    //prepare the budget execution object
    const newBudgetExecutionObj = prepareBudgetExecObj(budgetExecutionObj, date.quarter);

    //prepare the params object
    let params = {
      buildingNameEng,
      pageName,
      date,
      budgetExec: newBudgetExecutionObj,
      summarized_section_id: budgetExecutionObj.summarized_section_id
    };

    //check if it's a month budget column,
    //if it is set the date month params to the month
    //column that was updated
    if (key.includes("_budget")) {
      params.date.month = key.substring(0, key.length - 7);
      params.date.monthHeb = Helper.convertEngToHebMonth(params.date.month);
    }

    //calculateMonthTotalBudget(copyData, cellInfo.column.id, prevValue, copyData[objIndex][cellInfo.column.id]);
    dispatch(updateBudgetExecution(params, oldBudgetExecutionObj, newBudgetExecutionObj, index));
    e.target.blur();
  }


  const onAgreeHandler = async (buildingNameEng, date, index, rowData) => {
    dispatch(deleteBudgetExecution(buildingNameEng, date, index, rowData));
  }

  const deleteHandler = (index, rowData) => {
    showModal(ConfirmDeleteBudgetExecution, {
      onAgreeHandler: () => onAgreeHandler(buildingNameEng, date, index, rowData)
    });
  }

  /**
   * prepare budget executon object for update 
   * calculate the total budget and difference
   * @param {} budgetExec 
   * @param {*} date 
   */
  const prepareBudgetExecObj = (budgetExec, quarter) => {
    const months = Helper.getQuarterMonthsEng(quarter);
    let totalBudget = 0;
    const objToSave = {};

    for (let monthName of months) {
      totalBudget += Number.parseFloat(budgetExec[monthName + "_budget"]);
      objToSave[monthName + "_budget"] = Number.parseFloat(budgetExec[monthName + "_budget"]);
    }

    objToSave["evaluation"] = Number.parseFloat(budgetExec["evaluation"]);
    objToSave["total_budget"] = totalBudget;
    //except the total month budget and total monh execution
    //they don't need the difference calculation
    if (budgetExec.summarized_section_id !== 32 && budgetExec.summarized_section_id !== 33) {
      objToSave["difference"] = totalBudget - Number.parseFloat(budgetExec["total_execution"]);
    }
    objToSave["notes"] = budgetExec["notes"];

    return objToSave;
  }

  const getGridTemplateColumns = useCallback(() => {
    return editMode ? EDITMODE_TEMPLATE : DEFAULT_TEMPLATE;
  }, [editMode]);

  const getDataObject = useCallback(index => {
    return data[index];
  }, [data]);

  const HeaderGroups = () => {
    const { colorSet } = themeContext;
    const { quarter } = date;

    const months = Helper.getQuarterMonths(quarter);

    const monthColumns = months.map((month, i) => {
      return <GroupColumn
        span={2}
        color={colorSet[i]}
        key={i}
      >{month}</GroupColumn>;
    });

    return <GroupRow gridTemplateColumns={getGridTemplateColumns()}>
      {editMode ? <GroupColumn></GroupColumn> : null}
      <GroupColumn></GroupColumn>
      <GroupColumn></GroupColumn>
      {monthColumns}
      <GroupColumn span={3} color={colorSet[3]}>{`סוף רבעון ${quarter}`}</GroupColumn>
      <GroupColumn></GroupColumn>
      <GroupColumn></GroupColumn>
    </GroupRow>
  }

  const HeadersRow = () => {

    const { colorSet } = themeContext;

    const monthColumns = [];

    for (let i = 0; i < 3; i++) {
      monthColumns.push(<HeaderColumn editMode={editMode} style={{ ...defaultheaderStyle, color: colorSet[i] }} key={`תקציב${i}`}>{"תקציב"}</HeaderColumn>);
      monthColumns.push(<HeaderColumn style={{ ...defaultheaderStyle, color: colorSet[i] }} key={`ביצוע${i}`}>{"ביצוע"}</HeaderColumn>);
    }

    const quarterStyle = {
      ...defaultheaderStyle,
      color: colorSet[3]
    }

    return <HeaderRow gridTemplateColumns={getGridTemplateColumns()} /* style={{ backgroundColor: "#f5f6f9" }} */>

      {editMode ? <HeaderColumn style={defaultheaderStyle}>{"פעולות"}</HeaderColumn> : null}
      <HeaderColumn style={defaultheaderStyle}>{"שורה"}</HeaderColumn>
      <HeaderColumn style={defaultheaderStyle}>{"סעיף"}</HeaderColumn>

      {monthColumns}

      <HeaderColumn editMode={editMode} style={quarterStyle}>{"הערכה"}</HeaderColumn>
      <HeaderColumn style={quarterStyle}>{"תקציב"}</HeaderColumn>
      <HeaderColumn style={quarterStyle}>{"ביצוע"}</HeaderColumn>

      <HeaderColumn style={defaultheaderStyle}>{"הפרש"}</HeaderColumn>
      <HeaderColumn editMode={editMode} style={defaultheaderStyle}>{"הערות"}</HeaderColumn>
    </HeaderRow>
  }

  const TableRow = (index) => {
    // row data
    const rowData = getDataObject(index);

    // list of months of specific quarter
    const months = Helper.getQuarterMonthsEng(date.quarter);

    const monthColumns = [];

    // generate month columns
    for (let i = 0; i < months.length; i++) {
      monthColumns.push(
        editMode ?
          numberInput(`${months[i]}_budget`, rowData[`${months[i]}_budget`], index, onBlurHandler) :
          <NonZeroNumberColumn key={`${months[i]}_budget${i}`}>{rowData[`${months[i]}_budget`]}</NonZeroNumberColumn>
      );
      monthColumns.push(<NonZeroNumberColumn key={`${months[i]}_budget_execution${i + 1}`}>{rowData[`${months[i]}_budget_execution`]}</NonZeroNumberColumn>);
    }

    const differenceColor = whichColor(rowData["difference"]);

    const odd = index % 2 === 0 ? "" : "";

    return <Row key={index} style={{ minHeight: "35px", backgroundColor: odd }} gridTemplateColumns={getGridTemplateColumns()}>
      {editMode ? <TableActions deleteHandler={() => deleteHandler(index, rowData)} /> : null}
      <Column>{index + 1}</Column>
      <Column>{rowData["section"]}</Column>
      {monthColumns}
      {editMode ? numberInput("evaluation", rowData["evaluation"], index, onBlurHandler) : <NonZeroNumberColumn>{rowData["evaluation"]}</NonZeroNumberColumn>}
      <NonZeroNumberColumn>{rowData["total_budget"]}</NonZeroNumberColumn>
      <NonZeroNumberColumn>{rowData["total_execution"]}</NonZeroNumberColumn>
      <NonZeroNumberColumn style={{ direction: "ltr", ...differenceColor }}>{rowData["difference"]}</NonZeroNumberColumn>
      {editMode ? textAreaInput("notes", rowData["notes"], index, onBlurHandler) : <Column style={{ marginLeft: "10px" }}>{rowData["notes"]}</Column>}
    </Row>
  }

  const addNewBox = addNewMode ? <AddNewContainer date={date} buildingNameEng={buildingNameEng} /> : null;

  return (
    <TableWrapper>

      <TableControls
        editMode={editMode}
        rightPane={
          <EditControls
            editMode={editMode}
            toggleEditMode={toggleEditMode}
            addNewMode={addNewMode}
            toggleAddNewMode={toggleAddNewMode}
          />
        } // end rightPane
        middlePane={
          <DatePicker
            quarter
            date={date}
            buildingNameEng={buildingNameEng}
            pageName={pageName}
            updateDate={updateDate}
          />
        } // end middlePane
        leftPane={
          <PageControls
            excel={{
              data,
              fileName: Helper.getBudgetExecutionFilename(buildingName, date),
              buildingName,
              buildingNameEng,
              date
            }}
            print={{
              title: pageTitle,
              pageTitle: pageTitle + " - " + buildingName,
              date: `שנה ${date.year}\\רבעון ${date.quarter}`,
              Row: TableRow,
              GroupComponent: HeaderGroups,
              HeaderComponent: HeadersRow,
              itemCount: data.length
            }}
            pageName={pageName}
          />
        } // end leftPane

      /> {/* End TableControls */}

      {addNewBox}

      <Table
        Row={TableRow}
        GroupComponent={HeaderGroups}
        HeaderComponent={HeadersRow}
        isFetching={isFetching}
        itemCount={data.length}
      />

    </TableWrapper>
  );
}

export default React.memo(BudgetExecutionsTableContainer);

const defaultheaderStyle = {
  color: "#000000",
  fontWeight: "500",
  justifyContent: "center",
  height: "34px",
  alignItems: "center"
};