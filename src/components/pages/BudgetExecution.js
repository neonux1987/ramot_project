import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import BudgetExecutionController from '../../controllers/BudgetExecutionController';
import Helper from '../../helpers/Helper';
import saveToFile from '../../helpers/saveToFile';
import excel from '../../helpers/excel';
import ReactTable from 'react-table';
import Header from '../layout/main/Header';
import LoadingCircle from '../common/LoadingCircle';

const styles = (theme) => ({
  loadingWrapper: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    color: "#000",
    fontSize: "34px",
    margin: "0 auto"
  },
  header: {
    display: "inline-block",
  },
  total: {
    display: "inline-block",
    float: "right",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px"
  },
  headerTitleTextColor: {
    color: "rgb(130, 75, 204)"
  }
});

const PAGE_NAME = "budgetExecution";
const PAGE_TITLE = "מעקב ביצוע מול תקציב";

const FIXED_FLOAT = 2;

class BudgetExecution extends Component {

  constructor(props) {
    super(props);
    this.budgetExecutionController = new BudgetExecutionController();
    this.state = {
      data: [],
      cellEditMode: {
        rowNum: -1,
        cellHeader: ""
      },
      date: Helper.getCurrentDate(),
      loadingData: true
    };
    this._isMounted = false;
    //binds
    this.exportToExcel = this.exportToExcel.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.generateHeaders = this.generateHeaders.bind(this);
    this.loadBudgetExecutionsByDate = this.loadBudgetExecutionsByDate.bind(this);
    this.cellTextInput = this.cellTextInput.bind(this);
    this.cellNumberInput = this.cellNumberInput.bind(this);
    this.cellInputOnBlurHandler = this.cellInputOnBlurHandler.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    //important params that allows to pull the current data by
    //current quarter, month and year.
    let params = {
      buildingName: this.props.location.state.engLabel,
      date: Helper.getCurrentDate()
    }
    //get the building execution data
    this.budgetExecutionController.getAllBudgetExecutions(params, (result) => {
      if (this._isMounted) {
        this.setState((state, props) => ({
          ...state,
          data: result,
          loadingData: false
        }));
      }
    });

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

  toggleEdit(event, cellHeader, rowNum) {
    this.setState({
      ...this.state,
      cellEditMode: {
        rowNum: rowNum,
        cellHeader: cellHeader
      }
    });
  }

  loadBudgetExecutionsByDate(month, year, quarter) {

    //important params that allows to pull the current data by
    //current quarter, month and year.
    let params = {
      buildingName: this.props.location.state.engLabel,
      quarter: quarter,
      year: year
    }

    //get the building budget executions
    this.budgetExecutionController.getAllBudgetExecutions(params, (result) => {
      this.setState((prevState, props) => ({
        ...this.state,
        date: {
          ...prevState.date,
          year: year,
          quarter: quarter,
          quarterHeb: Helper.getCurrentQuarterHeb(quarter)
        },
        data: result
      }));
    });

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

  cellInputOnBlurHandler(e, cellInfo) {
    const data = [...this.state.data];
    data[cellInfo.index][cellInfo.column.id] = e.target.value;
    this.setState({ data });
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

  generateHeaders() {
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
        Header: "חודש אפריל",
        headerStyle: {
          fontWeight: "600",
          fontSize: "18px",
          background: "rgb(255, 99, 0)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "april_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(255, 99, 0)", fontWeight: "600" },
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: "april_budget_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(255, 99, 0)", fontWeight: "600" },
            Cell: (cellInfo) => cellInfo.value === 0 ? "" : cellInfo.value.toFixed(FIXED_FLOAT).replace(/[.,]00$/, "")
          }
        ]
      },
      {
        Header: "חודש מאי",
        headerStyle: {
          fontWeight: "600",
          fontSize: "18px",
          background: "rgb(140, 193, 24)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "may_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(140, 193, 24)", fontWeight: "600" },
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: "may_budget_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(140, 193, 24)", fontWeight: "600" },
            Cell: (cellInfo) => cellInfo.value === 0 ? "" : cellInfo.value.toFixed(FIXED_FLOAT).replace(/[.,]00$/, "")
          }
        ]
      },
      {
        Header: "חודש יוני",
        headerStyle: {
          fontWeight: "600",
          fontSize: "18px",
          background: "rgb(75, 145, 222)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "june_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(75, 145, 222)", fontWeight: "600" },
            Cell: this.cellNumberInput,
            style: {
              padding: 0
            }
          },
          {
            accessor: "june_budget_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(75, 145, 222)", fontWeight: "600" },
            Cell: (cellInfo) => cellInfo.value === 0 ? "" : cellInfo.value.toFixed(FIXED_FLOAT).replace(/[.,]00$/, "")
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
            Cell: (cellInfo) => cellInfo.value === 0 ? "" : cellInfo.value.toFixed(FIXED_FLOAT).replace(/[.,]00$/, "")
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
            Cell: (cellInfo) => cellInfo.value === 0 ? "" : cellInfo.value.toFixed(FIXED_FLOAT).replace(/[.,]00$/, "")
          },
          {
            accessor: "total_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(150, 0, 255)", fontWeight: "600" },
            Cell: (cellInfo) => cellInfo.value === 0 ? "" : cellInfo.value.toFixed(FIXED_FLOAT).replace(/[.,]00$/, "")
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
            Cell: (cellInfo) => cellInfo.value === 0 ? "" : cellInfo.value.toFixed(FIXED_FLOAT).replace(/[.,]00$/, ""),
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
    console.log(this.state)
    return (
      <div>
        <Header
          title={PAGE_TITLE}
          subTitle={this.props.location.state.parentLabel + " / " + this.state.date.quarterHeb + " / " + this.state.date.year}
          textColor={this.props.classes.headerTitleTextColor}
        >
        </Header>

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
              onClick: () => console.log(rowInfo)
            }
          }}
          loadingText={"טוען..."}
          noDataText={"המידע לא נמצא"}
          loading={this.state.loadingData}
          LoadingComponent={LoadingCircle}
          defaultPageSize={50}
          showPagination={true}
          data={this.state.data}
          columns={this.generateHeaders()}
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
  //formChangedAction: (payload) => dispatch(formChangedAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(
    BudgetExecution
  )
);