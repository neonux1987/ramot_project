// LIBRARIES
import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

// ACTIONS
import * as budgetExecutionsActions from '../../redux/actions/budgetExecutionsActions';

// UTILS
import Helper from '../../helpers/Helper';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';

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
import InfoBox from '../../components/InfoBox/InfoBox';

// DATA FETHCERS
import RegisteredDatesFetcher from '../../renderProps/providers/RegisteredDatesFetcher';

// HOC
import withColumnColorLogic from '../../HOC/withColumnColorLogic';
import withTableLogic from '../../HOC/withTableLogic';

const FIXED_FLOAT = 2;

const EDITMODE_TEMPLATE = "minmax(60px,5%) minmax(60px,5%) repeat(12,1fr)";
const DEFAULT_TEMPLATE = "minmax(60px,5%) repeat(12,1fr)";

class BudgetExecutionsTable extends React.PureComponent {

  state = {
    editMode: false,
    addNewMode: false
  }

  static contextType = GlobalContext;

  componentDidMount() {

    const params = {
      date: this.props.date,
      buildingName: this.props.location.state.buildingNameEng
    }

    // init the state first
    this.props.initBudgetExecutionsState(params.buildingName).then(() => {
      // fetch budget executions
      this.props.fetchBudgetExecutions(params);
    });
  }

  componentWillUnmount() {
    //cleanup
    this.props.budgetExecutionsCleanup(this.props.location.state.buildingNameEng);
  }

  loadDataByDate = ({ year, quarter }) => {

    const { pageName } = this.props;
    const { buildingNameEng } = this.props.location.state;

    //important params that allow to pull the current data by
    //current quarter, month and year.
    let params = {
      buildingName: buildingNameEng,
      date: {
        quarter: quarter,
        quarterHeb: Helper.getQuarterHeb(quarter),
        quarterEng: Helper.getCurrentQuarterEng(quarter),
        year: year
      }
    };
    // fetch data
    this.props.fetchBudgetExecutions(params);

    // update global date
    this.props.dateActions.updateDate(pageName, buildingNameEng, params.date);
  }

  onBlurHandler = (e) => {
    //building names
    const { buildingNameEng } = this.getLocationState();

    // building data
    const { data } = this.getPage();

    // date
    const date = this.props.date;

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
    const newBudgetExecutionObj = this.prepareBudgetExecObj(budgetExecutionObj, date.quarter);

    //prepare the params object
    let params = {
      buildingName: buildingNameEng,
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

    //this.calculateMonthTotalBudget(copyData, cellInfo.column.id, prevValue, copyData[objIndex][cellInfo.column.id]);
    this.props.updateBudgetExecution(params, oldBudgetExecutionObj, newBudgetExecutionObj, index);
    e.target.blur();
  }

  /**
   * prepare budget executon object for update 
   * calculate the total budget and difference
   * @param {} budgetExec 
   * @param {*} date 
   */
  prepareBudgetExecObj(budgetExec, quarter) {

    const months = Helper.getQuarterMonthsEng(quarter);
    let totalBudget = 0;
    const objToSave = {};

    for (let monthName of months) {
      totalBudget += Number.parseFloat(budgetExec[monthName + "_budget"]);
      objToSave[monthName + "_budget"] = Number.parseFloat(budgetExec[monthName + "_budget"]);
    }

    objToSave["total_budget"] = totalBudget;
    //except the total month budget and total monh execution
    //they don't need the difference calculation
    if (budgetExec.summarized_section_id !== 32 && budgetExec.summarized_section_id !== 33) {
      objToSave["difference"] = totalBudget - Number.parseFloat(budgetExec["total_execution"]);
    }
    objToSave["notes"] = budgetExec["notes"];

    return objToSave;

  }

  calculateMonthTotalBudget = (data, columnName, prevValue, newValue) => {
    //data date
    const { date } = this.props.budgetExecution.pages[this.props.budgetExecution.pageIndex];
    //find the index of the object in the array
    const objIndex = Helper.findObjIndexById(33, data);
    //get month names
    const monthNames = Helper.getQuarterMonths(date.quarter);

    data[objIndex][columnName] = data[objIndex][columnName] - prevValue + newValue;
    data[objIndex].total_budget = data[objIndex][`${monthNames[0]}_budget`] + data[objIndex][`${monthNames[1]}_budget`] + data[objIndex][`${monthNames[2]}_budget`];
  }

  getGridTemplateColumns = () => {
    return this.props.editMode ? EDITMODE_TEMPLATE : DEFAULT_TEMPLATE;
  }

  onFetchData = (state) => {

    //building names
    const { buildingNameEng } = this.props.location.state;

    const { date } = this.props.budgetExecution.pages[buildingNameEng];

    const {
      pageSize
      , page
    } = state;

    // page 0 - no need to multpily pass only the page size
    // page > 0 multiply to get the next start element position
    const startElement = page === 0 ? 0 : pageSize * page;

    //important params that allows to pull the current data by
    //building name, current month and year.
    let params = {
      buildingName: this.props.location.state.buildingNameEng,
      date: date,
      range: {
        startElement,
        pageSize
      }
    };

    //get the building month expanses
    this.props.fetchBudgetExecutions(params);
  }

  getLocationState = () => {
    return this.props.location.state;
  }

  getPage = () => {
    return this.props.page;
  }

  getDataObject = (index) => {
    return this.getPage().data[index];
  }

  HeaderGroups = () => {
    const editMode = this.props.editMode;
    const { groupColors } = this.context;
    const { quarter } = this.props.date;

    const months = Helper.getQuarterMonths(quarter);

    const monthColumns = months.map((month, i) => {
      return <GroupColumn
        span={2}
        bgColor={groupColors[i]}
        key={i}
      >{month}</GroupColumn>;
    });

    const defaultStyle = {
      border: "none"
    }

    return <GroupRow
      gridTemplateColumns={this.getGridTemplateColumns()} >
      {editMode ? <GroupColumn style={defaultStyle}></GroupColumn> : null}
      <GroupColumn style={defaultStyle}></GroupColumn>
      <GroupColumn style={defaultStyle}></GroupColumn>
      {monthColumns}
      <GroupColumn
        span={3}
        bgColor={groupColors[3]}
      >{`סוף רבעון ${quarter}`}</GroupColumn>
      <GroupColumn style={defaultStyle}></GroupColumn>
      <GroupColumn style={defaultStyle}></GroupColumn>
    </GroupRow>
  }

  HeadersRow = () => {
    const editMode = this.props.editMode;

    const { groupColors } = this.context;

    const monthColumns = [];

    for (let i = 0; i < 3; i++) {
      monthColumns.push(<Column style={{ ...defaultheaderStyle, color: groupColors[i] }} key={`תקציב${i}`}>{"תקציב"}</Column>);
      monthColumns.push(<Column style={{ ...defaultheaderStyle, color: groupColors[i] }} key={`ביצוע${i}`}>{"ביצוע"}</Column>);
    }

    const quarterStyle = {
      ...defaultheaderStyle,
      color: groupColors[3]
    }

    return <HeaderRow gridTemplateColumns={this.getGridTemplateColumns()} >

      {editMode ? <Column style={defaultheaderStyle}>{"פעולות"}</Column> : null}
      <Column style={defaultheaderStyle}>{"שורה"}</Column>
      <Column style={defaultheaderStyle}>{"סעיף"}</Column>

      {monthColumns}

      <Column style={quarterStyle}>{"הערכה"}</Column>
      <Column style={quarterStyle}>{"תקציב"}</Column>
      <Column style={quarterStyle}>{"ביצוע"}</Column>

      <Column style={defaultheaderStyle}>{"הפרש"}</Column>
      <Column style={defaultheaderStyle}>{"הערות"}</Column>
    </HeaderRow>
  }

  Row = (index) => {
    const {
      editMode,
      textAreaInput,
      numberInput
    } = this.props;

    // row data
    const rowData = this.getDataObject(index);

    // list of months of specific quarter
    const months = Helper.getQuarterMonthsEng(this.props.date.quarter);

    const monthColumns = [];

    // generate month columns
    for (let i = 0; i < months.length; i++) {
      monthColumns.push(
        editMode ?
          numberInput(`${months[i]}_budget`, rowData[`${months[i]}_budget`], index, this.onBlurHandler) :
          <NonZeroNumberColumn key={`${months[i]}_budget${i}`}>{rowData[`${months[i]}_budget`]}</NonZeroNumberColumn>
      );
      monthColumns.push(<NonZeroNumberColumn key={`${months[i]}_budget_execution${i + 1}`}>{rowData[`${months[i]}_budget_execution`]}</NonZeroNumberColumn>);
    }

    const DifferenceColumn = withColumnColorLogic(NonZeroNumberColumn, rowData["difference"]);

    return <Row key={index} style={{ minHeight: "35px" }} gridTemplateColumns={this.getGridTemplateColumns()}>
      {editMode ? <TableActions deleteHandler={() => this.deleteExpanseHandler(rowData.id, index)} /> : null}
      <Column>{index + 1}</Column>
      <Column>{rowData["section"]}</Column>
      {monthColumns}
      {editMode ? numberInput("evaluation", rowData["evaluation"], index, this.onBlurHandler) : <NonZeroNumberColumn>{rowData["evaluation"]}</NonZeroNumberColumn>}
      <NonZeroNumberColumn>{rowData["total_budget"]}</NonZeroNumberColumn>
      <NonZeroNumberColumn>{rowData["total_execution"]}</NonZeroNumberColumn>
      <DifferenceColumn style={{ direction: "ltr" }}>{rowData["difference"]}</DifferenceColumn>
      {editMode ? textAreaInput("notes", rowData["notes"], index, this.onBlurHandler) : <Column style={{ marginLeft: "10px" }}>{rowData["notes"]}</Column>}
    </Row>
  }

  render() {

    //building names
    const { buildingName, buildingNameEng } = this.props.location.state;

    const page = this.props.page;

    if (page === undefined || page.data === undefined) {
      return <AlignCenterMiddle><Spinner loadingText={"טוען הגדרות טבלת מעקב ביצוע מול תקציב..."} /></AlignCenterMiddle>;
    }

    const {
      date,
      pageName,
      pageTitle,
      editMode,
      toggleEditMode,
      addNewMode,
      toggleAddNewMode
    } = this.props;

    // provider data
    const {
      data,
      isFetching,
      pageSettings,
    } = page;

    return (
      <TableWrapper>

        <TableControls
          rightPane={
            <EditControls
              editMode={editMode}
              toggleEditMode={toggleEditMode}
              addNewMode={addNewMode}
              toggleAddNewMode={toggleAddNewMode}
            />
          } // end rightPane
          middlePane={
            <RegisteredDatesFetcher fetchYears fetchQuarters params={{
              buildingName: buildingNameEng
            }}>
              {({ quarters, years }) => {
                return <DatePicker
                  years={years}
                  quarters={quarters}
                  date={date}
                  submitHandler={this.loadDataByDate}
                />
              }}
            </RegisteredDatesFetcher>
          } // end middlePane
          leftPane={
            <PageControls
              excel={{
                data: data,
                fileName: Helper.getBudgetExecutionFilename(buildingName, date),
                sheetTitle: `שנה ${date.year} רבעון ${date.quarter}`,
                header: `${buildingName} / ביצוע מול תקציב / רבעון ${date.quarter} / ${date.year}`,
                date: date
              }}
              print={{
                title: pageTitle,
                pageTitle: pageTitle + " - " + buildingName
              }}
              pageName={pageName}
            />
          } // end leftPane

        /> {/* End TableControls */}

        <InfoBox
          quarter={date.quarter}
          year={date.year}
          editMode={editMode}
        />

        <Table
          Row={this.Row}
          GroupComponent={this.HeaderGroups}
          HeaderComponent={this.HeadersRow}
          isFetching={isFetching || data.length === 0}
          itemCount={data.length}
          cache={this.cache}
        />

      </TableWrapper>
    );
  }

}

const mapStateToProps = (state, ownProps) => ({
  page: state.budgetExecutions.pages[ownProps.location.state.buildingNameEng]
});

const mapDispatchToProps = dispatch => ({
  fetchBudgetExecutions: (params) => dispatch(budgetExecutionsActions.fetchBudgetExecutions(params)),
  budgetExecutionsCleanup: (buildingName) => dispatch(budgetExecutionsActions.budgetExecutionsCleanup(buildingName)),
  initBudgetExecutionsState: (page) => dispatch(budgetExecutionsActions.initBudgetExecutionsState(page)),
  updateBudgetExecution: (param, oldBudgetExecutionObj, newBudgetExecutionObj, index) => dispatch(budgetExecutionsActions.updateBudgetExecution(param, oldBudgetExecutionObj, newBudgetExecutionObj, index)),
  addBudgetExecution: (payload, tableData) => dispatch(budgetExecutionsActions.addBudgetExecution(payload, tableData))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withTableLogic(BudgetExecutionsTable)
);

const headerStyle = {
  backgroundColor: "rgb(52, 58, 64)",
  color: "#ffffff",
  fontWeight: "600",
  justifyContent: "center",
  height: "27px",
  alignItems: "center"
};

const defaultheaderStyle = {
  backgroundColor: "rgb(232, 236, 241)",
  color: "#000000",
  fontWeight: "600",
  justifyContent: "center",
  height: "27px",
  alignItems: "center"
};