import React, { Component } from 'react';
import LoadingCircle from '../../common/LoadingCircle';
import Helper from '../../../helpers/Helper';
import Header from '../../layout/main/Header';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import summarizedBudgetActions from '../../../redux/actions/summarizedBudgetActions';
import PageControls from '../../common/PageControls/PageControls';
import DatePicker from '../../common/DatePicker/DatePicker';
import WithHeaderWrapper from '../../HOC/WithHeaderWrapper';

const FIXED_FLOAT = 2;

class SummarizedBudget extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    //important params that allows to pull the current data by
    //current quarter, month and year.
    let params = {
      buildingName: this.props.location.state.buildingNameEng,
      date: Helper.getCurrentDate(),
    }

    this.props.fetchSummarizeBudgets(params);
  }

  componentWillUnmount() {
  }

  loadSummarizedBudgetsByDate = ({ year }) => {
    //important params that allows to pull the current data by
    //current quarter, month and year.
    let params = {
      buildingName: this.props.location.state.buildingNameEng,
      date: {
        year: year
      }
    };
    this.props.fetchSummarizeBudgets(params);
  }

  cell(cellInfo) {
    const newValue = cellInfo.value === 0 ? null : parseFloat(cellInfo.value).toFixed(FIXED_FLOAT).replace(/[.,]00$/, "");
    return newValue;
  }

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
        Header: "רבעון 1",
        headerStyle: {
          fontWeight: "600",
          fontSize: "18px",
          background: "rgb(75, 145, 222)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "quarter1_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(75, 145, 222)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo),
            style: {
              padding: 0
            }
          },
          {
            accessor: "quarter1_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(75, 145, 222)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: "רבעון 2",
        headerStyle: {
          fontWeight: "600",
          fontSize: "18px",
          background: "rgb(150, 191, 60)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "quarter2_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(150, 191, 60)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo),
            style: {
              padding: 0
            }
          },
          {
            accessor: "quarter2_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(150, 191, 60)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: "רבעון 3",
        headerStyle: {
          fontWeight: "600",
          fontSize: "18px",
          background: "rgb(255, 99, 0)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "quarter3_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(255, 99, 0)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo),
            style: {
              padding: 0
            }
          },
          {
            accessor: "quarter3_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(255, 99, 0)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: "רבעון 4",
        headerStyle: {
          fontWeight: "600",
          fontSize: "18px",
          background: "rgb(42, 177, 218)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "quarter4_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(42, 177, 218)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo),
            style: {
              padding: 0
            }
          },
          {
            accessor: "quarter4_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(42, 177, 218)", fontWeight: "600" },
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
        Header: "סוף שנה",
        headerStyle: {
          fontWeight: "600",
          fontSize: "18px",
          background: "rgb(150, 0, 255)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "year_total_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(150, 0, 255)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          },
          {
            accessor: "year_total_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(150, 0, 255)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
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
      summarizedBudgets,
      headerTitle
    } = this.props.summarizedBudget;
    const buildingName = this.props.location.state.buildingName;
    return (
      <div>
        <WithHeaderWrapper>
          <div style={{ paddingBottom: "10px" }}>
            <Header
              title={headerTitle}
              subTitle={buildingName + " / " + date.quarterHeb + " / " + date.year}
              textColor={{ color: "rgb(253, 78, 78)" }}
            >
            </Header>
            <PageControls
              excel={{
                data: summarizedBudgets.data,
                fileName: Helper.getSummarizedBudgetFilename(buildingName, date),
                tabName: `שנה ${date.year}`
              }}
              print={{
                title: headerTitle,
                pageTitle: headerTitle + " - " + buildingName
              }}
              pageName={pageName}
            />
            <DatePicker
              years={[
                {
                  id: 1,
                  year: 2017
                },
                {
                  id: 2,
                  year: 2018
                },
                {
                  id: 3,
                  year: 2019
                }
              ]}
              date={date}
              loadDataByDateHandler={this.loadSummarizedBudgetsByDate}
              enableMonth={false}
              enableYear={true}
              enableQuarter={false}
            />
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
          loading={summarizedBudgets.isFetching}
          LoadingComponent={LoadingCircle}
          defaultPageSize={50}
          showPagination={true}
          data={summarizedBudgets.data}
          columns={this.generateHeaders()}
          resizable={true}
          minRows={0}
        />
      </div>
    );
  }

}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  fetchSummarizeBudgets: (payload) => dispatch(summarizedBudgetActions.fetchSummarizedBudgets(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(SummarizedBudget);