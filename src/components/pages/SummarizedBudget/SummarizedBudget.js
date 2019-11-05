import React, { Component,Fragment } from 'react';
import LoadingCircle from '../../common/LoadingCircle';
import Helper from '../../../helpers/Helper';
import Header from '../../layout/main/Header';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import summarizedBudgetActions from '../../../redux/actions/summarizedBudgetActions';
import registeredYearsActions from '../../../redux/actions/registeredYearsActions';
import PageControls from '../../common/PageControls/PageControls';
import DatePicker from '../../common/DatePicker/DatePicker';
import WithTableControlsWrapper from '../../HOC/WithTableControlsWrapper';
import Spinner from '../../common/Spinner/Spinner';
import { AlignCenterMiddle } from '../../common/AlignCenterMiddle/AlignCenterMiddle';
import WithTableWrapper from '../../HOC/WithTableWrapper';

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

    this.props.initState(this.props.location.state.buildingNameEng).then(() => {
      //get the summarized budgets
      this.props.fetchSummarizeBudgets(params);
    });

    //fetch date registered months
    this.props.fetchRegisteredYears(params);

  }

  componentWillUnmount() {
    //on exit init table data
    this.props.cleanup(this.props.location.state.buildingNameEng);
    //cleanup years
    this.props.cleanupYears();
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
            width: 100,
            Cell: (row) => {
              return <span>{row.viewIndex + 1}</span>;
            }
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
          fontSize: "16px",
          background: "rgb(251, 38, 38)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "quarter1_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(251, 38, 38)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo),
            style: {
              padding: 0
            }
          },
          {
            accessor: "quarter1_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(251, 38, 38)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: "רבעון 2",
        headerStyle: {
          fontWeight: "600",
          fontSize: "16px",
          background: "rgb(103, 101, 208)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "quarter2_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(103, 101, 208)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo),
            style: {
              padding: 0
            }
          },
          {
            accessor: "quarter2_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(103, 101, 208)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: "רבעון 3",
        headerStyle: {
          fontWeight: "600",
          fontSize: "16px",
          background: "rgb(24, 135, 199)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "quarter3_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(24, 135, 199)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo),
            style: {
              padding: 0
            }
          },
          {
            accessor: "quarter3_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(24, 135, 199)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: "רבעון 4",
        headerStyle: {
          fontWeight: "600",
          fontSize: "16px",
          background: "rgb(29, 186, 143)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "quarter4_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(29, 186, 143)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo),
            style: {
              padding: 0
            }
          },
          {
            accessor: "quarter4_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(29, 186, 143)", fontWeight: "600" },
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
          fontSize: "16px",
          background: "rgb(143, 78, 191)",
          color: "#fff"
        },
        columns: [
          {
            accessor: "year_total_budget",
            Header: "תקציב",
            headerStyle: { color: "#fff", background: "rgb(143, 78, 191)", fontWeight: "600" },
            Cell: (cellInfo) => this.cell(cellInfo)
          },
          {
            accessor: "year_total_execution",
            Header: "ביצוע",
            headerStyle: { color: "#fff", background: "rgb(143, 78, 191)", fontWeight: "600" },
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
      pageName,
      headerTitle,
      pages,
      pageIndex
    } = this.props.summarizedBudget;
    const buildingName = this.props.location.state.buildingName;
    if (pages.length === 0 ||
      pages[pageIndex] === undefined ||
      (!pages[pageIndex].isFetching && pages[pageIndex].status === "")) {
      return <AlignCenterMiddle><Spinner loadingText={"טוען עמוד"} /></AlignCenterMiddle>;
    }
    const {
      date
    } = pages[pageIndex];

    //registered years used for date picker
    const years = this.props.registeredYears.registeredYears.data;

    return (
      <Fragment>

        <Header
          title={headerTitle}
          style={{ color: "#000",fontSize: "42px",fontWeight: "600" }}
          subTitle={""}
        />

        <WithTableWrapper>
        <WithTableControlsWrapper>
          <div style={{ paddingBottom: "10px" }}>
            <PageControls
              excel={{
                data: pages[pageIndex].data,
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
              years={years}
              date={date}
              loadDataByDateHandler={this.loadSummarizedBudgetsByDate}
              enableMonth={false}
              enableYear={true}
              enableQuarter={false}
            />
          </div>
        </WithTableControlsWrapper>

          <ReactTable 
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
                  height: "700px"
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
            defaultPageSize={50}
            showPagination={true}
            data={pages[pageIndex].data}
            columns={this.generateHeaders()}
            resizable={true}
            minRows={0}
          />
        </WithTableWrapper>

      </Fragment>
    );
  }

}

const mapStateToProps = state => ({
  summarizedBudget: state.summarizedBudget,
  registeredYears: state.registeredYears
});

const mapDispatchToProps = dispatch => ({
  fetchSummarizeBudgets: (payload) => dispatch(summarizedBudgetActions.fetchSummarizedBudgets(payload)),
  cleanup: (buildingNameEng) => dispatch(summarizedBudgetActions.cleanup(buildingNameEng)),
  initState: (page) => dispatch(summarizedBudgetActions.initState(page)),
  fetchRegisteredYears: (buildingName) => dispatch(registeredYearsActions.fetchRegisteredYears(buildingName)),
  cleanupYears: () => dispatch(registeredYearsActions.cleanupYears())
});

export default connect(mapStateToProps, mapDispatchToProps)(SummarizedBudget);