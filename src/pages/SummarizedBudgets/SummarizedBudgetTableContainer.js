// LIBRARIES
import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

// ACTIONS
import * as summarizedBudgetActions from '../../redux/actions/summarizedBudgetActions';

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

// DATA FETHCERS
import RegisteredDatesFetcher from '../../renderProps/providers/RegisteredDatesFetcher';

// HOC
import withColumnColorLogic from '../../HOC/withColumnColorLogic';

const FIXED_FLOAT = 2;

const EDITMODE_TEMPLATE = "minmax(60px,5%) minmax(60px,5%) repeat(12,1fr)";
const DEFAULT_TEMPLATE = "minmax(60px,5%) repeat(12,1fr)";

class SummarizedBudgetTableContainer extends Component {

  state = {
    editMode: false
  }

  static contextType = GlobalContext;

  componentDidMount() {
    const params = {
      date: this.props.date,
      buildingName: this.props.location.state.buildingNameEng
    }

    this.props.initSummzrizedBudgetsState(params.buildingName).then(() => {
      // fetch budget executions
      this.props.fetchSummarizedBudgets(params);
    });
  }

  componentWillUnmount() {
    //on exit init table data
    this.props.summarizedBudgetCleanup(this.props.location.state.buildingNameEng);
  }

  loadSummarizedBudgetsByDate = ({ year }) => {
    const { pageName } = this.props;
    const { buildingNameEng } = this.props.location.state;

    //important params that allow to pull the current data by
    //current quarter, month and year.
    let params = {
      buildingName: this.props.location.state.buildingNameEng,
      date: {
        year: year
      }
    };
    this.props.fetchSummarizeBudgets(params);

    // update global date
    this.props.dateActions.updateDate(pageName, buildingNameEng, params.date);
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
            Header: "שורה",
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
    this.props.fetchSummarizedBudgets(params);

  }

  generateQuarterlyStats(quarterlyStats, isFetching) {
    // list of strings of qurter months
    const quarters = Helper.getYearQuarters();

    // where the boxes will be stored fo render
    const returnStats = [];

    for (let i = 0; i < quarters.length; i++) {
      // render loading if still fetching the stats
      if (isFetching || quarterlyStats.length === 0 || quarterlyStats.length != 4) {
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

  onFetchData = (state) => {

    //building names
    const { buildingNameEng } = this.props.location.state;

    const { date } = this.props.summarizedBudget.pages[buildingNameEng];

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
        pageSize: pageSize
      }
    };

    //get the building month expanses
    this.props.fetchSummarizedBudgets(params);
  }

  render() {

    //building names
    const { buildingName, buildingNameEng } = this.props.location.state;

    const page = this.props.summarizedBudget.pages[buildingNameEng];
    console.log(page);
    if (page === undefined) {
      return <AlignCenterMiddle><Spinner loadingText={"טוען עמוד"} /></AlignCenterMiddle>;
    }

    // page info
    const {
      pageName,
      headerTitle
    } = this.props.summarizedBudget;

    // building data
    const {
      isFetching,
      data,
      date,
      pageSettings
    } = page;

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
                <RegisteredDatesProvider fetchYears params={{
                  buildingName: buildingNameEng
                }}>
                  {({ years }) => {
                    return <DatePicker
                      years={years}
                      date={date}
                      submitHandler={this.loadDataByDate}
                    />
                  }}
                </RegisteredDatesProvider>
              } // end middlePane
              leftPane={<PageControls
                excel={{
                  data: data,
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
              loading={isFetching}
              data={data}
              dataCount={100}
              columns={this.generateHeaders()}
              onFetchData={this.onFetchData}
              pageNameSettings={pageName}
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
  fetchSummarizedBudgets: (payload) => dispatch(summarizedBudgetActions.fetchSummarizedBudgets(payload)),
  summarizedBudgetCleanup: (buildingNameEng) => dispatch(summarizedBudgetActions.summarizedBudgetCleanup(buildingNameEng)),
  initSummzrizedBudgetsState: (page) => dispatch(summarizedBudgetActions.initSummzrizedBudgetsState(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(SummarizedBudgetTableContainer);