import React, { Component } from 'react';
import { connect } from 'react-redux';
import BudgetExecutionController from '../../controllers/BudgetExecutionController';
import budgetExecutionActions from '../../redux/actions/budgetExecutionActions';
import dateActions from '../../redux/actions/dateActions';
import Helper from '../../helpers/Helper';
import saveToFile from '../../helpers/saveToFile';
import excel from '../../helpers/excel';
import ReactTable from 'react-table';
import Header from '../layout/main/Header';
import LoadingCircle from '../common/LoadingCircle';
import WithHeaderWrapper from '../HOC/WithHeaderWrapper';
import PageControls from '../common/PageControls/PageControls';
import DatePicker from '../common/DatePicker/DatePicker';



const PAGE_NAME = "budgetExecution";
const PAGE_TITLE = "מעקב ביצוע מול תקציב";

const FIXED_FLOAT = 2;

class BudgetExecution extends Component {

  constructor(props) {
    super(props);
    this.budgetExecutionController = new BudgetExecutionController();
    this.state = {
    };
    this._isMounted = false;
    //binds
    this.exportToExcel = this.exportToExcel.bind(this);
    this.generateHeaders = this.generateHeaders.bind(this);
    this.loadBudgetExecutionsByDate = this.loadBudgetExecutionsByDate.bind(this);
    this.cellTextInput = this.cellTextInput.bind(this);
    this.cellNumberInput = this.cellNumberInput.bind(this);
    this.cellInputOnBlurHandler = this.cellInputOnBlurHandler.bind(this);
  }

  componentDidMount() {

    //important params that allows to pull the current data by
    //current quarter, month and year.
    let params = {
      buildingName: this.props.location.state.engLabel,
      date: Helper.getCurrentDate(),
    }
    this.props.fetchBudgetExecutions(params);

  }

  exportToExcel() {
    let fileName = Helper.getBudgetExecutionFilename(this.props.location.state.parentLabel);
    saveToFile(fileName, (fullPath) => {
      if (fullPath)
        excel(fullPath, fileName, PAGE_NAME, this.state.data);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadBudgetExecutionsByDate(month, year, quarter) {
    //important params that allows to pull the current data by
    //current quarter, month and year.
    let params = {
      buildingName: this.props.location.state.engLabel,
      date: {
        quarter: quarter,
        quarterHeb: Helper.getQuarterHeb(quarter),
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
        colored.background = "red";
      } else if (value > 0) {
        colored.color = "#fff";
        colored.background = "green";
      } else {
        colored.background = "yellow";
      }
    }

    return colored;

  }

  cell(cellInfo) {
    const newValue = cellInfo.value === 0 ? null : parseFloat(cellInfo.value).toFixed(FIXED_FLOAT).replace(/[.,]00$/, "");
    return newValue;
  }

  cellInputOnBlurHandler(e, cellInfo) {
    const data = [...this.props.budgetExecution.budgetExecutions.data];
    data[cellInfo.index][cellInfo.column.id] = e.target.value;

    let params = {
      buildingName: this.props.location.state.engLabel
    };
    this.props.updateBudgetExecution(params, data);
  }

  cellTextInput(cellInfo) {
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

  cellNumberInput(cellInfo) {
    return <input
      type="number"
      className="cellRender"
      defaultValue={Number.parseFloat(cellInfo.value).toFixed(FIXED_FLOAT).replace(/[.,]00$/, "")}
      onBlur={(event) => this.cellInputOnBlurHandler(event, cellInfo)}
      onClick={e => {
        e.target.select()
      }}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          event.target.blur();
        }
      }}
    />
  };

  generateHeaders(months) {
    return [
      {
        Header: "",
        width: 100,
        columns: [
          {
            accessor: "summarized_section_id",
            Header: "ספרור",
            headerStyle: { background: "#000", color: "#fff" },
            width: 100
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
          fontSize: "18px",
          background: "rgb(255, 99, 0)",
          color: "#fff"
        },
        columns: [
          {
            accessor: months[0].column1.accessor,
            Header: months[0].column1.header,
            headerStyle: { color: "#fff", background: "rgb(255, 99, 0)", fontWeight: "600" },
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: months[0].column2.accessor,
            Header: months[0].column2.header,
            headerStyle: { color: "#fff", background: "rgb(255, 99, 0)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: months[1].header,
        headerStyle: {
          fontWeight: "600",
          fontSize: "18px",
          background: "rgb(75, 145, 222)",
          color: "#fff"
        },
        columns: [
          {
            accessor: months[1].column1.accessor,
            Header: months[1].column1.header,
            headerStyle: { color: "#fff", background: "rgb(75, 145, 222)", fontWeight: "600" },
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: months[1].column2.accessor,
            Header: months[1].column2.header,
            headerStyle: { color: "#fff", background: "rgb(75, 145, 222)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: months[2].header,
        headerStyle: {
          fontWeight: "600",
          fontSize: "18px",
          background: "rgb(152, 202, 43)",
          color: "#fff"
        },
        columns: [
          {
            accessor: months[2].column1.accessor,
            Header: months[2].column1.header,
            headerStyle: { color: "#fff", background: "rgb(152, 202, 43)", fontWeight: "600" },
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: months[2].column2.accessor,
            Header: months[2].column2.header,
            headerStyle: { color: "#fff", background: "rgb(152, 202, 43)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
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
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      }
      ,
      {
        Header: "סוף רבעון",
        headerStyle: {
          fontWeight: "600",
          fontSize: "18px",
          background: "rgb(150, 0, 255)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "total_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(150, 0, 255)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          },
          {
            accessor: "total_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(150, 0, 255)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
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
            Cell: (cellInfo) => this.cell(cellInfo),
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
        Cell: this.cellTextInput,
        style: {
          padding: 0
        }
      }
    ];
  }

  render() {
    const {
      date,
      pageName,
      budgetExecutions,
      headerTitle
    } = this.props.budgetExecution;
    const buildingName = this.props.location.state.parentLabel;
    return (
      <div>
        <WithHeaderWrapper>
          <div style={{ paddingBottom: "10px" }}>
            <Header
              title={PAGE_TITLE}
              subTitle={buildingName + " / " + date.quarterHeb + " / " + date.year}
              textColor={{ color: "rgb(130, 75, 204)" }}
            >
            </Header>
            <PageControls
              excel={{
                data: budgetExecutions.data,
                fileName: Helper.getBudgetExecutionFilename(buildingName, date)
              }}
              print={{
                title: headerTitle,
                pageTitle: headerTitle + " - " + buildingName
              }}
              pageName={pageName}
            />
            <DatePicker date={date} loadDataByDateHandler={this.loadBudgetExecutionsByDate} enableMonth={false} enableYear={true} enableQuarter={true} />
          </div>
        </WithHeaderWrapper>

        <ReactTable className="-striped"
          style={{
            width: "100%",
            textAlign: "center",
            borderRadius: "4px",
            height: "750px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
          getTbodyProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                overflow: "overlay"
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
          loading={budgetExecutions.isFetching}
          LoadingComponent={LoadingCircle}
          defaultPageSize={50}
          showPagination={true}
          data={budgetExecutions.data}
          columns={this.generateHeaders(Helper.getQuarterMonthsHeaders(date.quarter))}
          resizable={true}
        />
      </div>
    );
  }

}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  fetchBudgetExecutions: (payload) => dispatch(budgetExecutionActions.fetchBudgetExecutions(payload)),
  updateBudgetExecution: (payload, tableData) => dispatch(budgetExecutionActions.updateBudgetExecution(payload, tableData)),
  addBudgetExecution: (payload, tableData) => dispatch(budgetExecutionActions.addBudgetExecution(payload, tableData)),
  setCurrentDate: (payload) => dispatch(dateActions.setCurrentDate(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetExecution);