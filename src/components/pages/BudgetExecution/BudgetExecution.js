import React, { Component } from 'react';
import { connect } from 'react-redux';
import budgetExecutionActions from '../../../redux/actions/budgetExecutionActions';
import Helper from '../../../helpers/Helper';
import ReactTable from 'react-table';
import Header from '../../layout/main/Header';
import LoadingCircle from '../../common/LoadingCircle';
import WithHeaderWrapper from '../../HOC/WithHeaderWrapper';
import PageControls from '../../common/PageControls/PageControls';
import DatePicker from '../../common/DatePicker/DatePicker';
import EditControls from '../../common/EditControls/EditControls';
import registeredQuartersActions from '../../../redux/actions/registeredQuartersActions';
import registeredYearsActions from '../../../redux/actions/registeredYearsActions';
import { notify, notificationTypes } from '../../Notifications/Notification';
import { playSound, soundTypes } from '../../../audioPlayer/audioPlayer';
import Spinner from '../../common/Spinner/Spinner';
import { AlignCenterMiddle } from '../../common/AlignCenterMiddle/AlignCenterMiddle';
import Stats from './Stats/Stats';
import monthTotalActions from '../../../redux/actions/monthTotalActions';
import quarterTotalActions from '../../../redux/actions/quarterTotalActions';

const FIXED_FLOAT = 2;

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

    //important params that allows to pull the current data by
    //current quarter, month and year.
    let params = {
      buildingName: this.props.location.state.buildingNameEng,
      date: Helper.getCurrentDate(),
    }
    this.props.initState(this.props.location.state.buildingNameEng).then(() => {
      //get the building budget executions
      this.props.fetchBudgetExecutions(params);
    });

    //fetch date registered months
    this.props.fetchRegisteredQuarters(params);

    //fetch date registered months
    this.props.fetchRegisteredYears(params);

    //fetch quarter months total stats
    this.props.fetchQuarterMonthsTotalStats(params);

    //fetch quarter total
    this.props.fetchQuarterTotalStats(params);

  }

  componentWillUnmount() {
    //on exit init table data
    this.props.cleanup(this.props.location.state.buildingNameEng);

    //cleanup quarters
    this.props.cleanupQuarters();

    this.props.cleanupMonthTotal();

    this.props.cleanupQuarterTotal();
  }

  loadBudgetExecutionsByDate = ({ year, quarter }) => {
    //important params that allows to pull the current data by
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
        colored.background = "#ff4444";
      } else if (value > 0) {
        colored.color = "#fff";
        colored.background = "#64bd37";
      } else {
        colored.background = "yellow";
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
    //find the index of the object in the array
    const objIndex = Helper.findObjIndexById(cellInfo.original.id, data);
    let prevValue = data[objIndex][cellInfo.column.id];
    if (cellInfo.column.id === "notes") {
      //replace the value
      data[objIndex][cellInfo.column.id] = e.target.value === "" ? "" : e.target.value;
    } else {
      //replace the value
      data[objIndex][cellInfo.column.id] = e.target.value === "" ? 0 : e.target.value;
    }

    //prepare the budget execution object
    const preparedObj = this.prepareBudgetExecObj(data[objIndex], date.quarter);
    data[objIndex] = {
      ...data[objIndex],
      ...preparedObj
    };

    //prepare the params object
    let params = {
      buildingName: this.props.location.state.buildingNameEng,
      date: {
        ...date
      },
      budgetExec: preparedObj,
      summarized_section_id: data[objIndex].summarized_section_id
    };
    //this.calculateMonthTotalBudget(data, cellInfo.column.id, prevValue, data[objIndex][cellInfo.column.id]);
    this.props.updateBudgetExecution(params, data);
    e.target.blur();
  }

  /**
   * prepare budget executon object for update 
   * calculate the total budget and difference
   * @param {} budgetExec 
   * @param {*} date 
   */
  prepareBudgetExecObj(budgetExec, quarter) {

    const months = Helper.getQuarterMonths(quarter);
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

    return [
      {
        Header: "",
        width: 80,
        columns: [
          {
            accessor: "summarized_section_id",
            Header: "ספרור",
            headerStyle: { background: "#000", color: "#fff" },
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
            headerStyle: { background: "#000", color: "#fff" }
          }
        ]
      },
      {
        Header: months[0].header,
        headerStyle: {
          fontWeight: "600",
          fontSize: "16px",
          background: "#fb434a",
          color: "#fff"
        },
        columns: [
          {
            accessor: months[0].column1.accessor,
            Header: months[0].column1.header,
            headerStyle: { color: "#fff", background: "#fb434a", fontWeight: "600" },
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: months[0].column2.accessor,
            Header: months[0].column2.header,
            headerStyle: { color: "#fff", background: "#fb434a", fontWeight: "600" },
            Cell: this.cell
          }
        ]
      },
      {
        Header: months[1].header,
        headerStyle: {
          fontWeight: "600",
          fontSize: "16px",
          background: "#0290fe",
          color: "#fff"
        },
        columns: [
          {
            accessor: months[1].column1.accessor,
            Header: months[1].column1.header,
            headerStyle: { color: "#fff", background: "#0290fe", fontWeight: "600" },
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: months[1].column2.accessor,
            Header: months[1].column2.header,
            headerStyle: { color: "#fff", background: "#0290fe", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: months[2].header,
        headerStyle: {
          fontWeight: "600",
          fontSize: "16px",
          background: "#46bf8a",
          color: "#fff"
        },
        columns: [
          {
            accessor: months[2].column1.accessor,
            Header: months[2].column1.header,
            headerStyle: { color: "#fff", background: "#46bf8a", fontWeight: "600" },
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: months[2].column2.accessor,
            Header: months[2].column2.header,
            headerStyle: { color: "#fff", background: "#46bf8a", fontWeight: "600" },
            Cell: this.cell
          }
        ]
      },
      {
        Header: "",
        columns: [
          {
            accessor: "evaluation",
            Header: "הערכה",
            headerStyle: { background: "#000", color: "#fff" },
            Cell: this.cell
          }
        ]
      }
      ,
      {
        Header: "סוף רבעון",
        headerStyle: {
          fontWeight: "600",
          fontSize: "16px",
          background: "rgb(150, 70, 191)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "total_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(150, 70, 191)", fontWeight: "600" },
            Cell: this.cell,
            style: {
              padding: 0
            }
          },
          {
            accessor: "total_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(150, 70, 191)", fontWeight: "600" },
            Cell: this.cell
          }
        ]
      },
      {
        Header: "",
        columns: [
          {
            accessor: "difference",
            Header: "הפרש",
            headerStyle: { background: "#000", color: "#fff" },
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
          }
        ]
      },
      {
        accessor: "notes",
        Header: "הערות",
        headerStyle: { background: "#000", color: "#fff" },
        Cell: this.cellTextAreaInput,
        style: {
          padding: 0,
          paddingLeft: "10px"
        }
      }
    ];
  }

  toggleEditMode = () => {
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

  render() {
    const {
      pageName,
      headerTitle,
      pages,
      pageIndex
    } = this.props.budgetExecution;
    const buildingName = this.props.location.state.buildingName;
    if (pages.length === 0 ||
      pages[pageIndex] === undefined ||
      (!pages[pageIndex].isFetching && pages[pageIndex].status === "")) {
      return <AlignCenterMiddle><Spinner loadingText={"טוען עמוד"} /></AlignCenterMiddle>;
    }
    const {
      date
    } = pages[pageIndex];

    //used for date picker
    const quarters = this.props.registeredQuarters.registeredQuarters.data;

    //used for date picker
    const years = this.props.registeredYears.registeredYears.data;

    return (
      <div>
        <WithHeaderWrapper>
          <div style={{ paddingBottom: "10px" }}>
            <Header
              title={headerTitle}
              subTitle={buildingName + " / " + date.quarterHeb + " / " + date.year}
              textColor={{ color: "#6057ec" }}
            >
            </Header>
            <PageControls
              excel={{
                data: [...pages[pageIndex].data],
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
            <DatePicker
              years={years}
              quarters={quarters}
              date={date}
              loadDataByDateHandler={this.loadBudgetExecutionsByDate}
              enableMonth={false}
              enableYear={true}
              enableQuarter={true}
            />
          </div>
          <EditControls
            editMode={this.state.editMode}
            toggleEditMode={this.toggleEditMode}
            addNewMode={this.state.addNewMode}
            toggleAddNewMode={this.toggleAddNewMode}
          />

          <Stats
            monthStats={this.props.monthTotal.monthTotal.data}
            quarterStats={this.props.quarterTotal.quarterTotal.data}
            quarter={date.quarter}
            isFetchingMonthStats={this.props.monthTotal.monthTotal.isFetching}
            isFetchingQuarterStats={this.props.quarterTotal.quarterTotal.isFetching}
          />

        </WithHeaderWrapper>

        <ReactTable className="-highlight -striped"
          style={{
            width: "100%",
            textAlign: "center",
            borderRadius: "4px",
            //height: "750px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
          getTbodyProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                overflow: "overlay",
                height: "630px"
              }
            }
          }}
          getTdProps={(state, rowInfo, column) => {
            return {
              //onClick: () => console.log(rowInfo)
            }
          }}
          loadingText={"טוען..."}
          noDataText={"המידע לא נמצא"}
          loading={pages[pageIndex].isFetching}
          LoadingComponent={LoadingCircle}
          defaultPageSize={100}
          showPagination={true}
          data={pages[pageIndex].data}
          columns={this.generateHeaders(Helper.getQuarterMonthsHeaders(date.quarter))}
          resizable={true}
        //minRows={0}
        />
      </div>
    );
  }

}

const mapStateToProps = state => ({
  budgetExecution: state.budgetExecution,
  registeredQuarters: state.registeredQuarters,
  registeredYears: state.registeredYears,
  monthTotal: state.monthTotal,
  quarterTotal: state.quarterTotal
});

const mapDispatchToProps = dispatch => ({
  fetchBudgetExecutions: (payload) => dispatch(budgetExecutionActions.fetchBudgetExecutions(payload)),
  cleanup: (buildingNameEng) => dispatch(budgetExecutionActions.cleanup(buildingNameEng)),
  initState: (page) => dispatch(budgetExecutionActions.initState(page)),
  receiveBudgetExecutions: (payload) => dispatch(budgetExecutionActions.receiveBudgetExecutions(payload)),
  updateBudgetExecution: (payload, tableData) => dispatch(budgetExecutionActions.updateBudgetExecution(payload, tableData)),
  addBudgetExecution: (payload, tableData) => dispatch(budgetExecutionActions.addBudgetExecution(payload, tableData)),
  fetchRegisteredQuarters: (buildingName) => dispatch(registeredQuartersActions.fetchRegisteredQuarters(buildingName)),
  cleanupQuarters: () => dispatch(registeredQuartersActions.cleanupQuarters()),
  fetchRegisteredYears: (buildingName) => dispatch(registeredYearsActions.fetchRegisteredYears(buildingName)),
  cleanupYears: () => dispatch(registeredYearsActions.cleanupYears()),
  fetchQuarterMonthsTotalStats: (params) => dispatch(monthTotalActions.fetchQuarterMonthsTotalStats(params)),
  cleanupMonthTotal: () => dispatch(monthTotalActions.cleanupMonthTotal()),
  fetchQuarterTotalStats: (params) => dispatch(quarterTotalActions.fetchQuarterTotalStats(params)),
  cleanupQuarterTotal: () => dispatch(quarterTotalActions.cleanupQuarterTotal())
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetExecution);