// LIBRARIES
import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import {
  initBudgetExecutionsState,
  fetchBudgetExecutions,
  updateBudgetExecution,
  deleteBudgetExecution,
  budgetExecutionsCleanup
} from '../../redux/actions/budgetExecutionsActions';

// UTILS
import Helper from '../../helpers/Helper';
import { areEqual } from '../util';

// CONTEXT
import GlobalContext from '../../context/GlobalContext';

// COMPONENTS
import TableControls from '../../components/table/TableControls/TableControls';
import PageControls from '../../components/PageControls/PageControls';
import DatePicker from '../../components/DatePicker/DatePicker';
import EditControls from '../../components/EditControls/EditControls';
import Spinner from '../../components/Spinner/Spinner';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import TableWrapper from '../../components/table/TableWrapper/TableWrapper';
import GroupColumn from '../../components/table/GroupColumn';
import HeaderRow from '../../components/table/HeaderRow';
import Column from '../../components/table/Column';
import Row from '../../components/table/Row';
import NonZeroNumberColumn from '../../components/table/NonZeroNumberColumn';
import TableActions from '../../components/table/TableActions/TableActions';
import Table from '../../components/table/Table';
import GroupRow from '../../components/table/GroupRow';

// HOC
import withColumnColorLogic from '../../HOC/withColumnColorLogic';
import withTableLogic from '../../HOC/withTableLogic';
import ConfirmDeleteBudgetExecution from '../../components/modals/ConfirmDeleteBudgetExecution/ConfirmDeleteBudgetExecution';

// HOOKS
import useModalLogic from '../../customHooks/useModalLogic';
import AddNewContainer from './AddNewContainer/AddNewContainer';
import HeaderColumn from '../../components/table/HeaderColumn';

const EDITMODE_TEMPLATE = "minmax(60px,5%) minmax(60px,5%) repeat(12,1fr)";
const DEFAULT_TEMPLATE = "minmax(60px,5%) repeat(12,1fr)";

const BudgetExecutionsTable = props => {
  // building names
  const { buildingName, buildingNameEng } = props.location.state;

  const {
    date,
    dateActions,
    pageName,
    pageTitle,
    editMode,
    toggleEditMode,
    addNewMode,
    toggleAddNewMode
  } = props;

  const globalContext = useContext(GlobalContext);
  const { showModal } = useModalLogic();
  const dispatch = useDispatch();

  // page data
  const page = useSelector(store => store.budgetExecutions.pages[buildingNameEng]);

  useEffect(() => {

    const cleanup = () => {
      //cleanup
      dispatch(budgetExecutionsCleanup(buildingNameEng));
    }

    const buildingInfo = {
      buildingName: buildingNameEng,
      buildingNameHeb: buildingName
    };

    // how many rows of data to pull from the database
    const range = {
      startElement: 0,
      pageSize: 1000
    };

    const returnedPromise = dispatch(initBudgetExecutionsState(buildingNameEng));

    returnedPromise.then(() => {
      if (date.year !== undefined || date.quarter !== undefined)
        dispatch(fetchBudgetExecutions(buildingInfo, date, range));
    })

    return cleanup;
  }, [date, buildingNameEng, buildingName, dispatch]);


  const loadDataByDate = ({ year, quarter }) => {

    const { pageName } = props;
    const { buildingNameEng } = props.location.state;

    //important params that allow to pull the current data by
    //current quarter, month and year.
    let params = {
      buildingName: buildingNameEng,
      date: {
        quarter,
        quarterHeb: Helper.getQuarterHeb(quarter),
        quarterEng: Helper.getCurrentQuarterEng(quarter),
        year
      }
    };

    // fetch data
    dispatch(fetchBudgetExecutions(params));

    // update global date
    dispatch(dateActions.updateDate(pageName, buildingNameEng, params.date));
  }

  const onBlurHandler = (e) => {

    // building data
    const { data } = page;

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
      buildingName: buildingNameEng,
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

  const deleteHandler = (index, rowData) => {
    showModal(ConfirmDeleteBudgetExecution, {
      onAgreeHandler: () => onAgreeHandler(buildingNameEng, date, index, rowData)
    });
  }

  const onAgreeHandler = async (buildingNameEng, date, index, rowData) => {
    dispatch(deleteBudgetExecution(buildingNameEng, date, index, rowData));
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

  const getGridTemplateColumns = () => {
    return props.editMode ? EDITMODE_TEMPLATE : DEFAULT_TEMPLATE;
  }

  const getDataObject = (index) => {
    return page.data[index];
  }

  const HeaderGroups = () => {
    const editMode = props.editMode;
    const { groupColors } = globalContext;
    const { quarter } = date;

    const months = Helper.getQuarterMonths(quarter);

    const defaultStyle = {
      border: "none",
      height: "34px"
    }

    const monthColumns = months.map((month, i) => {
      return <GroupColumn
        span={2}
        color={groupColors[i]}
        key={i}
        style={defaultStyle}
      >{month}</GroupColumn>;
    });

    return <GroupRow gridTemplateColumns={getGridTemplateColumns()} style={{ backgroundColor: "#f5f6f9" }}>
      {editMode ? <GroupColumn style={defaultStyle}></GroupColumn> : null}
      <GroupColumn style={defaultStyle}></GroupColumn>
      <GroupColumn style={defaultStyle}></GroupColumn>
      {monthColumns}
      <GroupColumn
        span={3}
        color={groupColors[3]}
        style={defaultStyle}
      >{`סוף רבעון ${quarter}`}</GroupColumn>
      <GroupColumn style={defaultStyle}></GroupColumn>
      <GroupColumn style={defaultStyle}></GroupColumn>
    </GroupRow>
  }

  const HeadersRow = () => {
    const editMode = props.editMode;

    const { groupColors } = globalContext;

    const monthColumns = [];

    for (let i = 0; i < 3; i++) {
      monthColumns.push(<HeaderColumn editMode={editMode} style={{ ...defaultheaderStyle, color: groupColors[i] }} key={`תקציב${i}`}>{"תקציב"}</HeaderColumn>);
      monthColumns.push(<HeaderColumn style={{ ...defaultheaderStyle, color: groupColors[i] }} key={`ביצוע${i}`}>{"ביצוע"}</HeaderColumn>);
    }

    const quarterStyle = {
      ...defaultheaderStyle,
      color: groupColors[3]
    }

    return <HeaderRow gridTemplateColumns={getGridTemplateColumns()} style={{ backgroundColor: "#f5f6f9" }}>

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
    const {
      textAreaInput,
      numberInput
    } = props;

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

    const DifferenceColumn = withColumnColorLogic(NonZeroNumberColumn, rowData["difference"]);

    const odd = index % 2 === 0 ? "" : "";

    return <Row key={index} style={{ minHeight: "35px", backgroundColor: odd }} gridTemplateColumns={getGridTemplateColumns()}>
      {editMode ? <TableActions deleteHandler={() => deleteHandler(index, rowData)} /> : null}
      <Column>{index + 1}</Column>
      <Column>{rowData["section"]}</Column>
      {monthColumns}
      {editMode ? numberInput("evaluation", rowData["evaluation"], index, onBlurHandler) : <NonZeroNumberColumn>{rowData["evaluation"]}</NonZeroNumberColumn>}
      <NonZeroNumberColumn>{rowData["total_budget"]}</NonZeroNumberColumn>
      <NonZeroNumberColumn>{rowData["total_execution"]}</NonZeroNumberColumn>
      <DifferenceColumn style={{ direction: "ltr" }}>{rowData["difference"]}</DifferenceColumn>
      {editMode ? textAreaInput("notes", rowData["notes"], index, onBlurHandler) : <Column style={{ marginLeft: "10px" }}>{rowData["notes"]}</Column>}
    </Row>
  }

  if (page === undefined || page.data === undefined) {
    return <AlignCenterMiddle><Spinner loadingText={"טוען הגדרות טבלת מעקב ביצוע מול תקציב..."} /></AlignCenterMiddle>;
  }

  // provider data
  const {
    data,
    isFetching,
    //pageSettings
  } = page;

  const addNewBox = addNewMode ? <AddNewContainer date={date} buildingName={buildingNameEng} /> : null;

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
            buildingName={buildingNameEng}
            submitHandler={loadDataByDate}
            pageName={pageName}
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

const ConnectedComponent = withTableLogic(BudgetExecutionsTable);

export default React.memo(ConnectedComponent, areEqual);

const defaultheaderStyle = {
  color: "#000000",
  fontWeight: "600",
  justifyContent: "center",
  height: "34px",
  alignItems: "center"
};