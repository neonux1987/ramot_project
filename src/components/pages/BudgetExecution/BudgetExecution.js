import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import budgetExecutionActions from '../../../redux/actions/budgetExecutionActions';
import Helper from '../../../helpers/Helper';
import LoadingCircle from '../../common/LoadingCircle';
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
      date: Helper.getCurrentQuarterDate(),
    }
    this.props.initState(this.props.location.state.buildingNameEng).then(() => {
      //get the building budget executions
      this.props.fetchBudgetExecutions(params);
    });

  }

  componentWillUnmount() {
    //on exit init table data
    this.props.cleanup(this.props.location.state.buildingNameEng);
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
        colored.background = "rgb(72, 187, 91)";
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
      const month = columnId.substring(0, columnId.length - 7);
      params.date.month = Helper.convertEngToHebMonth(month);
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
          background: "#6057ec",
          color: "#fff"
        },
        columns: [
          {
            accessor: months[0].column1.accessor,
            Header: months[0].column1.header,
            headerStyle: { color: "#fff", background: "#6057ec", fontWeight: "600" },
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: months[0].column2.accessor,
            Header: months[0].column2.header,
            headerStyle: { color: "#fff", background: "#6057ec", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: months[1].header,
        headerStyle: {
          fontWeight: "600",
          fontSize: "16px",
          background: "#4e89d4",
          color: "#fff"
        },
        columns: [
          {
            accessor: months[1].column1.accessor,
            Header: months[1].column1.header,
            headerStyle: { color: "#fff", background: "#4e89d4", fontWeight: "600" },
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: months[1].column2.accessor,
            Header: months[1].column2.header,
            headerStyle: { color: "#fff", background: "#4e89d4", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: months[2].header,
        headerStyle: {
          fontWeight: "600",
          fontSize: "16px",
          background: "rgb(60, 160, 199)",
          color: "#fff"
        },
        columns: [
          {
            accessor: months[2].column1.accessor,
            Header: months[2].column1.header,
            headerStyle: { color: "#fff", background: "rgb(60, 160, 199)", fontWeight: "600" },
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: months[2].column2.accessor,
            Header: months[2].column2.header,
            headerStyle: { color: "#fff", background: "rgb(60, 160, 199)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: "סוף רבעון",
        headerStyle: {
          fontWeight: "600",
          fontSize: "16px",
          background: "rgb(232, 87, 87)",//rgb(255, 55, 92)
          color: "#fff"
        },
        columns: [
          {
            accessor: "evaluation",
            Header: "הערכה",
            headerStyle: { color: "#fff", background: "rgb(232, 87, 87)", fontWeight: "600" },
            Cell: this.cell
          },
          {
            accessor: "total_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(232, 87, 87)", fontWeight: "600" },
            Cell: this.cell,
            style: {
              padding: 0
            }
          },
          {
            accessor: "total_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(232, 87, 87)", fontWeight: "600" },
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
      />;
    }
  }

  render() {
    const {
      pageName,
      headerTitle,
      pages,
      pageIndex
    } = this.props.budgetExecution;

    // building name
    const { buildingName, buildingNameEng } = this.props.location.state;

    if (pages.length === 0 ||
      pages[pageIndex] === undefined ||
      (!pages[pageIndex].isFetching && pages[pageIndex].status === "")) {
      return <AlignCenterMiddle><Spinner loadingText={"טוען עמוד"} /></AlignCenterMiddle>;
    }

    //date
    const { date } = pages[pageIndex];

    return (
      <Fragment>
        <Header>
          {headerTitle}
        </Header>

        <Section title={"סיכום הוצאות והכנסות רבעוני"}>
          <TotalStatsFetcher allMonthStatsByQuarter quarterStats params={{
            buildingName: buildingNameEng,
            date
          }}>
            {({ monthlyStats, quarterlyStats }) => {
              //generate quarter months stats
              const renderMonthlyStats = this.generateMonthlyStats(monthlyStats.data, date.quarter, monthlyStats.isFetching);
              //generate quarter total stats
              renderMonthlyStats.push(this.generateQuarterStats(quarterlyStats.data[0], date.quarter, quarterlyStats.isFetching))
              return <Stats stats={renderMonthlyStats} />;
            }}
          </TotalStatsFetcher>
        </Section>

        <Section title={"טבלת מעקב וביצוע רבעוני"}>
          <ReactTableContainer id={"react-table"} className="-highlight"
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
            headerControlsComponent={
              <TableControls
                rightPane={
                  <EditControls
                    editMode={this.state.editMode}
                    toggleEditMode={this.toggleEditMode}
                    addNewMode={this.state.addNewMode}
                    toggleAddNewMode={this.toggleAddNewMode}
                  />
                }
                middlePane={
                  <RegisteredDatesFetcher fetchYears fetchQuarters params={{
                    buildingName: buildingNameEng
                  }}>
                    {({ quarters, years }) => {
                      return <DatePicker
                        years={years}
                        quarters={quarters}
                        date={date}
                        loadDataByDateHandler={this.loadBudgetExecutionsByDate}
                      />
                    }}
                  </RegisteredDatesFetcher>
                }
                leftPane={
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
                }

              />
            }
          >

          </ReactTableContainer>
        </Section>



      </Fragment>
    );
  }

}

const mapStateToProps = state => ({
  budgetExecution: state.budgetExecution
});

const mapDispatchToProps = dispatch => ({
  fetchBudgetExecutions: (payload) => dispatch(budgetExecutionActions.fetchBudgetExecutions(payload)),
  cleanup: (buildingNameEng) => dispatch(budgetExecutionActions.cleanup(buildingNameEng)),
  initState: (page) => dispatch(budgetExecutionActions.initState(page)),
  updateBudgetExecution: (param, oldBudgetExecutionObj, newBudgetExecutionObj, index) => dispatch(budgetExecutionActions.updateBudgetExecution(param, oldBudgetExecutionObj, newBudgetExecutionObj, index)),
  addBudgetExecution: (payload, tableData) => dispatch(budgetExecutionActions.addBudgetExecution(payload, tableData))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetExecution);