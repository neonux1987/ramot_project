// LIBRARIES
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

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
import { notify, notificationTypes } from '../../components/Notifications/Notification';
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

// DATA FETHCERS
import RegisteredDatesFetcher from '../../renderProps/providers/RegisteredDatesFetcher';

const FIXED_FLOAT = 2;

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

  loadBudgetExecutionsByDate = ({ year, quarter }) => {

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

  colorCell(title, value) {

    let colored = {
      color: "",
      background: ""
    }

    value = Number.parseFloat(value);

    if (title === "difference") {
      if (value < 0) {
        colored.color = "#fff";
        colored.background = "rgb(234, 70, 70)";
      } else if (value > 0) {
        colored.color = "#fff";
        colored.background = "rgb(47, 195, 73)";
      } else {
        colored.background = "rgb(242, 255, 59)";
      }
    }

    return colored;

  }

  cell(cellInfo) {
    const newValue = cellInfo.value === 0 || cellInfo.value === undefined ? null : parseFloat(cellInfo.value).toFixed(FIXED_FLOAT).replace(/[.,]00$/, "");
    return newValue;
  }

  cellInputOnBlurHandler = (e, cellInfo) => {
    //copy data
    const data = [...this.props.budgetExecution.pages[this.props.budgetExecution.pageIndex].data];
    //data date
    const { date } = this.props.budgetExecution.pages[this.props.budgetExecution.pageIndex];
    //index of the object in the array
    const objIndex = cellInfo.index;
    //column id, the title of the column
    const columnId = cellInfo.column.id;

    //copy old object so rollback would be possible
    const oldBudgetExecutionObj = { ...data[objIndex] };

    if (columnId === "notes") {
      //replace the value
      data[objIndex][columnId] = e.target.value === "" ? "" : e.target.value;
    } else {
      //replace the value
      data[objIndex][columnId] = e.target.value === "" ? 0 : parseFloat(e.target.value);
    }


    //prepare the budget execution object
    const newBudgetExecutionObj = this.prepareBudgetExecObj(data[objIndex], date.quarter);

    //prepare the params object
    let params = {
      buildingName: this.props.location.state.buildingNameEng,
      date: {
        ...date
      },
      budgetExec: newBudgetExecutionObj,
      summarized_section_id: data[objIndex].summarized_section_id
    };


    //check if it's a month budget column,
    //if it is set the date month params to the month
    //column that was updated
    if (columnId.includes("_budget")) {
      params.date.month = columnId.substring(0, columnId.length - 7);
      params.date.monthHeb = Helper.convertEngToHebMonth(params.date.month);
    }

    //this.calculateMonthTotalBudget(data, cellInfo.column.id, prevValue, data[objIndex][cellInfo.column.id]);
    this.props.updateBudgetExecution(params, oldBudgetExecutionObj, newBudgetExecutionObj, objIndex);
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

  cellTextAreaInput = (cellInfo) => {
    if (!this.state.editMode) {
      return cellInfo.value;
    }
    return <textarea
      type="text"
      className="cellRender"
      defaultValue={cellInfo.value}
      onBlur={(event) => this.cellInputOnBlurHandler(event, cellInfo)}
      onClick={e => {
        e.target.select()
      }}
    />
  };

  cellNumberInput = (cellInfo) => {
    if (cellInfo.row.summarized_section_id === 32 || cellInfo.row.summarized_section_id === 33) {
      return this.cell(cellInfo);
    }
    const newValue = cellInfo.value === 0 || cellInfo.value === undefined ? null : Number.parseFloat(cellInfo.value).toFixed(FIXED_FLOAT).replace(/[.,]00$/, "");
    if (!this.state.editMode) {
      return newValue;
    }
    return <input
      type="number"
      className="cellRender"
      defaultValue={newValue}
      onBlur={(event) => this.cellInputOnBlurHandler(event, cellInfo)}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          event.target.blur();
        }
      }}
      onClick={e => {
        e.target.select()
      }}
    />
  };

  toggleEditMode = (event) => {
    this.setState({
      ...this.state,
      editMode: !this.state.editMode
    }, () => {
      if (this.state.editMode) {
        notify({
          type: notificationTypes.message,
          message: "הופעל מצב עריכה"
        });
      } else {
        notify({
          type: notificationTypes.message,
          message: "מצב עריכה בוטל"
        });
      }
      playSound(soundTypes.message);
    });
  };

  toggleAddNewMode = () => {
    this.setState({
      ...this.state,
      addNewMode: !this.state.addNewMode
    })
  };

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

  getPage = () => {
    return this.props.page;
  }

  getDataObject = (index) => {
    return this.getPage().data[index];
  }

  HeaderGroups = () => {
    const { groupColors } = this.context;
    const { quarter } = this.props.date;
    // column settings
    const gridTemplateColumns = `${this.state.editMode ? "80px" : ""}  80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr`;

    const months = Helper.getQuarterMonths(quarter);

    const monthColumns = months.map((month, i) => {
      return <GroupColumn
        span={2}
        bgColor={groupColors[i]}
        key={i}
      >{month}</GroupColumn>;
    });

    return <HeaderRow gridTemplateColumns={gridTemplateColumns} style={{ borderBottom: "1px solid #fff" }}>
      {this.state.editMode ? <GroupColumn></GroupColumn> : null}
      <GroupColumn></GroupColumn>
      <GroupColumn></GroupColumn>
      {monthColumns}
      <GroupColumn
        span={3}
        bgColor={groupColors[3]}
      >{`סוף רבעון ${quarter}`}</GroupColumn>
      <GroupColumn></GroupColumn>
      <GroupColumn></GroupColumn>
    </HeaderRow>
  }

  HeadersRow = () => {
    const { groupColors } = this.context;

    // column settings
    const gridTemplateColumns = `${this.state.editMode ? "80px" : ""}  80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr`;

    const monthColumns = [];

    for (let i = 0; i < 3; i++) {
      monthColumns.push(<Column style={{ ...headerStyle, backgroundColor: groupColors[i] }} key={`תקציב${i}`}>{"תקציב"}</Column>);
      monthColumns.push(<Column style={{ ...headerStyle, backgroundColor: groupColors[i] }} key={`ביצוע${i}`}>{"ביצוע"}</Column>);
    }

    const quarterStyle = {
      ...headerStyle,
      backgroundColor: groupColors[3]
    }

    return <HeaderRow gridTemplateColumns={gridTemplateColumns}>

      {this.state.editMode ? <Column style={headerStyle}>{"פעולות"}</Column> : null}
      <Column style={headerStyle}>{"שורה"}</Column>
      <Column style={headerStyle}>{"סעיף"}</Column>

      {monthColumns}

      <Column style={quarterStyle}>{"הערכה"}</Column>
      <Column style={quarterStyle}>{"תקציב"}</Column>
      <Column style={quarterStyle}>{"ביצוע"}</Column>

      <Column style={headerStyle}>{"הפרש"}</Column>
      <Column style={headerStyle}>{"הערות"}</Column>
    </HeaderRow>
  }

  Row = (index) => {
    // row data
    const rowData = this.getDataObject(index);
    // column settings
    const gridTemplateColumns = `${this.state.editMode ? "80px" : ""}  80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr`;

    const months = Helper.getQuarterMonthsEng(this.props.date.quarter);

    const monthColumns = [];

    months.map((month, i) => {
      monthColumns.push(<Column key={`${month}_budget${i}`}>{rowData[`${month}_budget`]}</Column>);
      monthColumns.push(<Column key={`${month}_budget_execution${i + 1}`}>{rowData[`${month}_budget_execution`]}</Column>);
    });

    return <Row key={index} style={{ minHeight: "35px" }} gridTemplateColumns={gridTemplateColumns}>
      {this.state.editMode ? <TableActions deleteHandler={() => this.deleteExpanseHandler(rowData.id, index)} /> : null}
      <Column>{index + 1}</Column>
      <Column>{rowData["section"]}</Column>
      {monthColumns}
      <Column>{rowData["evaluation"]}</Column>
      <Column>{rowData["total_budget"]}</Column>
      <Column>{rowData["total_execution"]}</Column>
      <Column>{rowData["difference"]}</Column>
      <Column>{rowData["notes"]}</Column>
      {/*     {this.state.editMode ? this.textAreaInput("supplierName", rowData["supplierName"], index) : <Column>{rowData["supplierName"]}</Column>}
      {this.state.editMode ? this.numberInput("sum", rowData["sum"], index) : <NonZeroNumberColumn>{rowData["sum"]}</NonZeroNumberColumn>}
      {this.state.editMode ? this.textAreaInput("notes", rowData["notes"], index) : <Column style={{ whiteSpace: "pre-wrap" }}>{rowData["notes"]}</Column>} */}
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
      pageTitle
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
              editMode={this.state.editMode}
              toggleEditMode={this.toggleEditMode}
              addNewMode={this.state.addNewMode}
              toggleAddNewMode={this.toggleAddNewMode}
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
                  submitHandler={this.loadBudgetExecutionsByDate}
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

export default connect(mapStateToProps, mapDispatchToProps)(BudgetExecutionsTable);

const headerStyle = {
  backgroundColor: "rgb(52, 58, 64)",
  color: "#ffffff",
  fontWeight: "600",
  justifyContent: "center",
  height: "27px",
  alignItems: "center"
};

// table headers
const headers = [
  {
    title: "שורה",
    headerStyle
  },
  {
    title: "קוד הנהח\"ש",
    headerStyle
  },
  {
    title: "שם חשבון",
    headerStyle
  },
  {
    title: "מקושר לסעיף",
    headerStyle
  },
  {
    title: "ספק",
    headerStyle
  },
  {
    title: "סכום",
    headerStyle
  },
  {
    title: "הערות",
    headerStyle
  }
];