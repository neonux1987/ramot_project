import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as budgetExecutionActions from '../../../redux/actions/budgetExecutionActions';
import Helper from '../../../helpers/Helper';
import TableControls from '../../common/table/TableControls/TableControls';
import PageControls from '../../common/PageControls/PageControls';
import DatePicker from '../../common/DatePicker/DatePicker';
import EditControls from '../../common/EditControls/EditControls';
import { notify, notificationTypes } from '../../Notifications/Notification';
import { playSound, soundTypes } from '../../../audioPlayer/audioPlayer';
import Spinner from '../../common/Spinner/Spinner';
import { AlignCenterMiddle } from '../../common/AlignCenterMiddle/AlignCenterMiddle';
import StatBox from '../../common/Stats/StatBox/StatBox';
import ReactTableContainer from '../../common/table/ReactTableContainer/ReactTableContainer';
import Header from '../../common/Header/Header';
import Section from '../../common/Section/Section';
import StatLoadingBox from '../../common/Stats/StatLoadingBox/StatLoadingBox';
import Stats from '../../common/Stats/Stats';
import RegisteredDatesFetcher from '../../dataFetchers/RegisteredDatesFetcher';
import TotalStatsFetcher from '../../dataFetchers/TotalStatsFetcher';
import TableWrapper from '../../common/table/TableWrapper/TableWrapper';
import GroupColumn from '../../common/table/GroupColumn';
import HeaderRow from '../../common/table/HeaderRow';
import Column from '../../common/table/Column';
import Row from '../../common/table/Row';
import NonZeroNumberColumn from '../../common/table/NonZeroNumberColumn';
import TableActions from '../../common/table/TableActions/TableActions';

const FIXED_FLOAT = 2;

const PAGE_NAME = "budgetExecution";

class BudgetExecution extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
  }

  state = {
    editMode: false,
    addNewMode: false
  }

  componentDidMount() {
    this.props.initBudgetExecutionsState(this.props.location.state.buildingNameEng);
  }

  componentWillUnmount() {
    //on exit init table data
    this.props.budgetExecutionsCleanup(this.props.location.state.buildingNameEng);
  }

  loadBudgetExecutionsByDate = ({ year, quarter }) => {
    //important params that allow to pull the current data by
    //current quarter, month and year.
    let params = {
      buildingName: this.props.location.state.buildingNameEng,
      date: {
        quarter: quarter,
        quarterHeb: Helper.getQuarterHeb(quarter),
        quarterEng: Helper.getCurrentQuarterEng(quarter),
        year: year
      }
    };

    this.props.fetchBudgetExecutions(params);
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

  generateHeaders = (months) => {

    const month1Color = "rgb(76, 139, 218)";
    const month2Color = "rgb(107, 187, 139)";
    const month3Color = "rgb(218, 87, 87)";
    const quarterColor = "rgb(75, 81, 95)";
    const defaultColor = "#343a40";

    const headerStyle = (bgColor) => ({
      background: bgColor,
      fontWeight: "600",
      fontSize: "15px",
      color: "#fff"
    });

    return [
      {
        Header: "",
        width: 80,
        columns: [
          {
            accessor: "summarized_section_id",
            Header: "שורה",
            headerStyle: headerStyle(defaultColor),
            width: 80,
            Cell: (row) => {
              return <span>{row.viewIndex + 1}</span>;
            },
          }
        ]
      },
      {
        Header: "",
        columns: [
          {
            accessor: "section",
            Header: "סעיף",
            headerStyle: headerStyle(defaultColor)
          }
        ]
      },
      {
        Header: months[0].header,
        headerStyle: headerStyle(month1Color),
        columns: [
          {
            accessor: months[0].column1.accessor,
            Header: months[0].column1.header,
            headerStyle: headerStyle(month1Color),
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: months[0].column2.accessor,
            Header: months[0].column2.header,
            headerStyle: headerStyle(month1Color),
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: months[1].header,
        headerStyle: headerStyle(month2Color),
        columns: [
          {
            accessor: months[1].column1.accessor,
            Header: months[1].column1.header,
            headerStyle: headerStyle(month2Color),
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: months[1].column2.accessor,
            Header: months[1].column2.header,
            headerStyle: headerStyle(month2Color),
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: months[2].header,
        headerStyle: headerStyle(month3Color),
        columns: [
          {
            accessor: months[2].column1.accessor,
            Header: months[2].column1.header,
            headerStyle: headerStyle(month3Color),
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: months[2].column2.accessor,
            Header: months[2].column2.header,
            headerStyle: headerStyle(month3Color),
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: "סוף רבעון",
        headerStyle: headerStyle(quarterColor),
        columns: [
          {
            accessor: "evaluation",
            Header: "הערכה",
            headerStyle: headerStyle(quarterColor),
            Cell: this.cell
          },
          {
            accessor: "total_budget",
            Header: "תקציב",
            headerStyle: headerStyle(quarterColor),
            Cell: this.cell,
            style: {
              padding: 0
            }
          },
          {
            accessor: "total_execution",
            Header: "ביצוע",
            headerStyle: headerStyle(quarterColor),
            Cell: this.cell
          }
        ]
      },
      {
        accessor: "difference",
        Header: "הפרש",
        headerStyle: headerStyle(defaultColor),
        Cell: this.cell,
        style: {
          direction: "ltr"
        },
        getProps: (state, rowInfo, column) => {
          return (rowInfo !== undefined && column !== undefined) ? {
            style: {
              ...this.colorCell(column.id, rowInfo.row.difference)
            }
          } : {}
        }
      },
      {
        accessor: "notes",
        Header: "הערות",
        headerStyle: headerStyle(defaultColor),
        Cell: this.cellTextAreaInput,
        style: {
          padding: 0,
          paddingLeft: "10px"
        }
      }
    ];
  }

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

  /******************************************************************
   * generates month stats
   * @param {*} monthStats list of month stats
   * @param {*} quarter the quarter which the months belong to
   * @param {*} isFetching if the data is fetching
   ******************************************************************/
  generateMonthlyStats(monthStats, quarter, isFetching) {

    // list of strings of qurter months
    const quarterMonths = Helper.getQuarterMonths(quarter);

    // where the boxes will be stored fo render
    const returnStats = [];

    for (let i = 0; i < quarterMonths.length; i++) {

      // render loading if still fetching the stats
      if (isFetching || monthStats.length === 0) {
        returnStats[i] = <StatLoadingBox key={i} title={`טוען נתוני חודש ${quarterMonths[i]}`} />;
      } else {

        returnStats[i] = <StatBox
          key={i}
          title={monthStats[i].month}
          outcome={`${monthStats[i].outcome} ${Helper.shekelUnicode}`}
          income={`${monthStats[i].income} ${Helper.shekelUnicode}`}
          bgColor={Helper.quarterMonthsColors[i]}
        />;

      }

    } // end loop

    return returnStats;

  }

  generateQuarterStats(quarterStat, quarter, isFetching) {
    //render loading if still fetching the stats
    if (isFetching || quarterStat === undefined) {
      return <StatLoadingBox key={3} title={`טוען נתוני סוף רבעון ${quarter}`} />
    } else {
      return <StatBox
        key={3}
        title={`רבעון ${quarterStat.quarter}`}
        outcome={`${quarterStat.outcome} ${Helper.shekelUnicode}`}
        income={`${quarterStat.income} ${Helper.shekelUnicode}`}
        bgColor={Helper.endQuarterColor}
      />;
    }
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

  getDataObject = (index) => {
    // building name
    const { buildingNameEng } = this.props.location.state;
    // data
    const { data } = this.props.budgetExecution.pages[buildingNameEng];
    return data[index];
  }

  HeaderGroups = (months) => {
    return () => {
      const { groupColors } = this.context;

      // column settings
      const gridTemplateColumns = `${this.state.editMode ? "80px" : ""}  100px 1fr 1fr 1fr 1fr 1fr 1fr`;

      return <HeaderRow gridTemplateColumns={gridTemplateColumns}>
        <GroupColumn show={this.state.editMode}></GroupColumn>
        <GroupColumn></GroupColumn>
        <GroupColumn bgColor={groupColors[1]} span={2}>2</GroupColumn>
        <GroupColumn bgColor={groupColors[2]} span={2}>3</GroupColumn>
        <GroupColumn bgColor={groupColors[3]} span={2}>4</GroupColumn>
      </HeaderRow>
    }
  }

  HeadersRow = () => {
    // column settings
    const gridTemplateColumns = `${this.state.editMode ? "80px" : ""}  100px 1fr 1fr 1fr 1fr 1fr 1fr`;

    return <HeaderRow gridTemplateColumns={gridTemplateColumns}>
      {headers().map((header, index) => {
        return (
          <Column
            show={header.title === "פעולות" && !this.state.editMode}
            key={index} style={{
              display: header.title === "פעולות" && !this.state.editMode ? "none" : "flex",
              ...header.style
            }}>{header.title}</Column>);
      })}
    </HeaderRow>
  }

  Row = (months) => {
    return ({ index, style }) => {
      // row data
      const rowData = this.getDataObject(index);
      // column settings
      const gridTemplateColumns = `${this.state.editMode ? "80px" : ""}  100px 1fr 1fr 1fr 1fr 1fr 1fr`;

      return <Row style={style} gridTemplateColumns={gridTemplateColumns}>
        <Column show={this.state.editMode}>
          <TableActions deleteHandler={this.deleteExpanseHandler(rowData.id, index)} />
        </Column>
        <Column>{index + 1}</Column>
        <Column>{rowData["code"]}</Column>
        <Column>{rowData["codeName"]}</Column>
        <Column>{rowData["section"]}</Column>
        <Column>{this.state.editMode ? this.textInput("supplierName", rowData["supplierName"], rowData, index) : rowData["supplierName"]}</Column>
        <NonZeroNumberColumn>{this.state.editMode ? this.numberInput("sum", rowData["sum"], rowData, index) : rowData["sum"]}</NonZeroNumberColumn>
        <Column>{this.state.editMode ? this.textAreaInput("notes", rowData["notes"], rowData, index) : rowData["notes"]}</Column>
      </Row>;
    }
  }

  render() {

    //building names
    const { buildingName, buildingNameEng } = this.props.location.state;

    const page = this.props.budgetExecution.pages[buildingNameEng];

    if (page === undefined) {
      return <AlignCenterMiddle><Spinner loadingText={"טוען עמוד"} /></AlignCenterMiddle>;
    }

    // page info
    const {
      pageName,
      headerTitle
    } = this.props.budgetExecution;

    // building data
    const {
      isFetching,
      data,
      date,
      pageSettings
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
                title: headerTitle,
                pageTitle: headerTitle + " - " + buildingName
              }}
              pageName={pageName}
            />
          } // end leftPane

        /> {/* End TableControls */}

        <ReactTableContainer
          loading={isFetching}
          data={data}
          dataCount={100}
          columns={this.generateHeaders(Helper.getQuarterMonthsHeaders(date.quarter))}
          onFetchData={this.onFetchData}
          pageNameSettings={pageName}
        />


      </TableWrapper> {/* end TableWrapper */ }
    );
  }

}

const mapStateToProps = state => ({
  budgetExecution: state.budgetExecution
});

const mapDispatchToProps = dispatch => ({
  fetchBudgetExecutions: (payload) => dispatch(budgetExecutionActions.fetchBudgetExecutions(payload)),
  budgetExecutionsCleanup: (buildingNameEng) => dispatch(budgetExecutionActions.budgetExecutionsCleanup(buildingNameEng)),
  initBudgetExecutionsState: (page) => dispatch(budgetExecutionActions.initBudgetExecutionsState(page)),
  updateBudgetExecution: (param, oldBudgetExecutionObj, newBudgetExecutionObj, index) => dispatch(budgetExecutionActions.updateBudgetExecution(param, oldBudgetExecutionObj, newBudgetExecutionObj, index)),
  addBudgetExecution: (payload, tableData) => dispatch(budgetExecutionActions.addBudgetExecution(payload, tableData))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetExecution);

const headers = () => {
  const style = {
    backgroundColor: "rgb(52, 58, 64)",
    color: "#ffffff",
    fontWeight: "600",
    justifyContent: "center",
    height: "27px",
    alignItems: "center"
  }
  return [
    {
      title: "פעולות",
      style
    },
    {
      title: "שורה",
      style
    },
    {
      title: "תקציב",
      style: {
        ...style,
        backgroundcolor: "blue"
      }
    },
    {
      title: "ביצוע",
      style
    },
    {
      title: "תקציב",
      style: {
        ...style,
        backgroundcolor: "blue"
      }
    },
    {
      title: "ביצוע",
      style
    },
    {
      title: "תקציב",
      style: {
        ...style,
        backgroundcolor: "blue"
      }
    },
    {
      title: "ביצוע",
      style
    },
    {
      title: "הערכה",
      style
    },
    {
      title: "תקציב",
      style: {
        ...style,
        backgroundcolor: "blue"
      }
    },
    {
      title: "ביצוע",
      style
    },
    {
      title: "הפרש",
      style
    },
    {
      title: "הערות",
      style
    }
  ]
};