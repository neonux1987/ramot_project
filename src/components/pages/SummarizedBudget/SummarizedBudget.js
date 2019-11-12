import React, { Component, Fragment } from 'react';
import LoadingCircle from '../../common/LoadingCircle';
import Helper from '../../../helpers/Helper';
import Header from '../../common/Header/Header';
import { connect } from 'react-redux';
import ReactTableContainer from '../../common/table/ReactTableContainer/ReactTableContainer';
import summarizedBudgetActions from '../../../redux/actions/summarizedBudgetActions';
import PageControls from '../../common/PageControls/PageControls';
import DatePicker from '../../common/DatePicker/DatePicker';
import TableControls from '../../common/table/TableControls/TableControls';
import Spinner from '../../common/Spinner/Spinner';
import { AlignCenterMiddle } from '../../common/AlignCenterMiddle/AlignCenterMiddle';
import EditControls from '../../common/EditControls/EditControls';
import RegisteredDatesFetcher from '../../dataFetchers/RegisteredDatesFetcher';
import TotalStatsFetcher from '../../dataFetchers/TotalStatsFetcher';
import Stats from '../../common/Stats/Stats';
import Section from '../../common/Section/Section';
import StatBox from '../../common/Stats/StatBox/StatBox';
import StatLoadingBox from '../../common/Stats/StatLoadingBox/StatLoadingBox';
import TableWrapper from '../../common/table/TableWrapper/TableWrapper';

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

  }

  componentWillUnmount() {
    //on exit init table data
    this.props.cleanup(this.props.location.state.buildingNameEng);
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

    const quarter1Color = "#7f69b3";
    const quarter2Color = "#5e94d8";
    const quarter3Color = "#7db995";
    const quarter4Color = "#d86565";
    const yearColor = "rgb(62, 77, 109)";
    const defaultColor = "#333333";

    const headerStyle = (bgColor) => ({
      background: bgColor,
      fontWeight: "600",
      fontSize: "15px",
      color: "#fff"
    });

    return [
      {
        Header: "",
        width: 100,
        columns: [
          {
            accessor: "summarized_section_id",
            Header: "ספרור",
            headerStyle: headerStyle(defaultColor),
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
            headerStyle: headerStyle(defaultColor)
          }
        ]
      },
      {
        Header: "רבעון 1",
        headerStyle: headerStyle(quarter1Color),
        columns: [
          {
            accessor: "quarter1_budget",
            Header: "תקציב",
            headerStyle: headerStyle(quarter1Color),
            Cell: (cellInfo) => this.cell(cellInfo),
            style: {
              padding: 0
            }
          },
          {
            accessor: "quarter1_execution",
            Header: "ביצוע",
            headerStyle: headerStyle(quarter1Color),
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: "רבעון 2",
        headerStyle: headerStyle(quarter2Color),
        columns: [
          {
            accessor: "quarter2_budget",
            Header: "תקציב",
            headerStyle: headerStyle(quarter2Color),
            Cell: (cellInfo) => this.cell(cellInfo),
            style: {
              padding: 0
            }
          },
          {
            accessor: "quarter2_execution",
            Header: "ביצוע",
            headerStyle: headerStyle(quarter2Color),
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: "רבעון 3",
        headerStyle: headerStyle(quarter3Color),
        columns: [
          {
            accessor: "quarter3_budget",
            Header: "תקציב",
            headerStyle: headerStyle(quarter3Color),
            Cell: (cellInfo) => this.cell(cellInfo),
            style: {
              padding: 0
            }
          },
          {
            accessor: "quarter3_execution",
            Header: "ביצוע",
            headerStyle: headerStyle(quarter3Color),
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: "רבעון 4",
        headerStyle: headerStyle(quarter4Color),
        columns: [
          {
            accessor: "quarter4_budget",
            Header: "תקציב",
            headerStyle: headerStyle(quarter4Color),
            Cell: (cellInfo) => this.cell(cellInfo),
            style: {
              padding: 0
            }
          },
          {
            accessor: "quarter4_execution",
            Header: "ביצוע",
            headerStyle: headerStyle(quarter4Color),
            Cell: (cellInfo) => this.cell(cellInfo)
          }
        ]
      },
      {
        Header: "סוף שנה",
        headerStyle: headerStyle(yearColor),
        columns: [
          {
            accessor: "evaluation",
            Header: "הערכה",
            headerStyle: headerStyle(yearColor),
            Cell: (cellInfo) => this.cell(cellInfo)
          },
          {
            accessor: "year_total_budget",
            Header: "תקציב",
            headerStyle: headerStyle(yearColor),
            Cell: (cellInfo) => this.cell(cellInfo)
          },
          {
            accessor: "year_total_execution",
            Header: "ביצוע",
            headerStyle: headerStyle(yearColor),
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

  loadDataByDate = ({ year }) => {
    //important params that allows to pull the current data by
    //building name, current month and year.
    let params = {
      buildingName: this.props.location.state.buildingNameEng,
      date: {
        year: year
      }
    }

    //get the building month expanses
    this.props.fetchSummarizeBudgets(params);

  }

  generateQuarterlyStats(quarterlyStats, isFetching) {
    // list of strings of qurter months
    const quarters = Helper.getYearQuarters();

    // where the boxes will be stored fo render
    const returnStats = [];

    for (let i = 0; i < quarters.length; i++) {

      // render loading if still fetching the stats
      if (isFetching || quarterlyStats.length === 0) {
        returnStats[i] = <StatLoadingBox key={i} title={`טוען נתוני רבעון ${quarters[i]}`} />;
      } else {
        returnStats[i] = <StatBox
          key={i}
          title={quarters[i]}
          outcome={`${quarterlyStats[i].outcome} ${Helper.shekelUnicode}`}
          income={`${quarterlyStats[i].income} ${Helper.shekelUnicode}`}
          bgColor={Helper.quartersColors[i]}
        />;

      }

    } // end loop

    return returnStats;

  }

  generateYearStats(yearStats, year, isFetching) {
    //render loading if still fetching the stats
    if (isFetching || yearStats === undefined) {
      return <StatLoadingBox key={4} title={`טוען נתוני שנת ${year}`} />
    } else {
      return <StatBox
        key={4}
        title={`שנת ${yearStats.year}`}
        outcome={`${yearStats.outcome} ${Helper.shekelUnicode}`}
        income={`${yearStats.income} ${Helper.shekelUnicode}`}
        bgColor={Helper.endYearColor}
      />;
    }
  }

  render() {
    const {
      pageName,
      headerTitle,
      pages,
      pageIndex
    } = this.props.summarizedBudget;

    const { buildingName, buildingNameEng } = this.props.location.state;

    if (pages.length === 0 ||
      pages[pageIndex] === undefined ||
      (!pages[pageIndex].isFetching && pages[pageIndex].status === "")) {
      return <AlignCenterMiddle><Spinner loadingText={"טוען עמוד"} /></AlignCenterMiddle>;
    }
    const {
      date
    } = pages[pageIndex];

    return (
      <Fragment>

        <Header>
          {headerTitle}
        </Header>

        <Section title={"סיכום הוצאות והכנסות שנתי"}>
          <TotalStatsFetcher allQuartersStatsByYear yearStats params={{
            buildingName: buildingNameEng,
            date
          }}>
            {({ quarterlyStats, yearlyStats }) => {
              const renderStats = this.generateQuarterlyStats(quarterlyStats.data, quarterlyStats.isFetching);
              renderStats.push(this.generateYearStats(yearlyStats.data[0], date.year, yearlyStats.isFetching));
              return <Stats stats={renderStats} />;
            }}
          </TotalStatsFetcher>
        </Section>

        <Section title={"טבלת מעקב שנתית"}>

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
                <RegisteredDatesFetcher fetchYears params={{
                  buildingName: buildingNameEng
                }}>
                  {({ years }) => {
                    return <DatePicker
                      years={years}
                      date={date}
                      submitHandler={this.loadDataByDate}
                    />
                  }}
                </RegisteredDatesFetcher>
              } // end middlePane
              leftPane={<PageControls
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
              />} // end leftPane

            />  {/* End TableControls */}

            <ReactTableContainer
              loading={pages[pageIndex].isFetching}
              data={pages[pageIndex].data}
              columns={this.generateHeaders()}
            />

          </TableWrapper>  {/* End TableWrapper */}


        </Section>




      </Fragment>
    );
  }

}

const mapStateToProps = state => ({
  summarizedBudget: state.summarizedBudget
});

const mapDispatchToProps = dispatch => ({
  fetchSummarizeBudgets: (payload) => dispatch(summarizedBudgetActions.fetchSummarizedBudgets(payload)),
  cleanup: (buildingNameEng) => dispatch(summarizedBudgetActions.cleanup(buildingNameEng)),
  initState: (page) => dispatch(summarizedBudgetActions.initState(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(SummarizedBudget);