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

const FIXED_FLOAT = 2;

const EDITMODE_TEMPLATE = "minmax(60px,5%) minmax(60px,5%) repeat(12,1fr)";
const DEFAULT_TEMPLATE = "minmax(60px,5%) repeat(13,1fr)";

class SummarizedBudgetTableContainer extends React.PureComponent {

  state = {
    editMode: false
  }

  static contextType = GlobalContext;

  componentDidMount() {
    const params = {
      date: this.props.date,
      buildingName: this.props.location.state.buildingNameEng
    }
    console.log(params);
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

  toggleEditMode = () => {
    if (this.state.editMode) {
      this.setState({
        editMode: false
      });
      toast.warning("מצב עריכה בוטל");
    } else {
      this.setState({
        editMode: true
      });
      toast.success("הופעל מצב עריכה");
    }

    playSound(soundTypes.message);
  };

  cell(cellInfo) {
    const newValue = cellInfo.value === 0 ? null : parseFloat(cellInfo.value).toFixed(FIXED_FLOAT).replace(/[.,]00$/, "");
    return newValue;
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

  HeaderGroups = () => {
    const { groupColors } = this.context;
    const { quarter } = this.props.date;

    const quarters = Helper.getYearQuarters(quarter);

    const quarterColumns = quarters.map((quarter, i) => {
      return <GroupColumn
        span={2}
        bgColor={groupColors[i]}
        key={i}
      >{quarter}</GroupColumn>;
    });

    const defaultStyle = {
      border: "none"
    }

    return <GroupRow
      gridTemplateColumns={this.getGridTemplateColumns()} >
      {this.state.editMode ? <GroupColumn style={defaultStyle}></GroupColumn> : null}
      <GroupColumn style={defaultStyle}></GroupColumn>
      <GroupColumn style={defaultStyle}></GroupColumn>
      {quarterColumns}
      <GroupColumn
        span={3}
        bgColor={groupColors[3]}
      >{`סוף רבעון ${quarter}`}</GroupColumn>
      <GroupColumn style={defaultStyle}></GroupColumn>
      <GroupColumn style={defaultStyle}></GroupColumn>
    </GroupRow>
  }

  HeadersRow = () => {
    const { groupColors } = this.context;

    const quarterColumns = [];

    for (let i = 0; i < 4; i++) {
      quarterColumns.push(<Column style={{ ...defaultheaderStyle, color: groupColors[i] }} key={`תקציב${i}`}>{"תקציב"}</Column>);
      quarterColumns.push(<Column style={{ ...defaultheaderStyle, color: groupColors[i] }} key={`ביצוע${i}`}>{"ביצוע"}</Column>);
    }

    const quarterStyle = {
      ...defaultheaderStyle,
      color: groupColors[3]
    }

    return <HeaderRow gridTemplateColumns={this.getGridTemplateColumns()} >

      {this.state.editMode ? <Column style={defaultheaderStyle}>{"פעולות"}</Column> : null}
      <Column style={defaultheaderStyle}>{"שורה"}</Column>
      <Column style={defaultheaderStyle}>{"סעיף"}</Column>

      {quarterColumns}

      <Column style={quarterStyle}>{"הערכה"}</Column>
      <Column style={quarterStyle}>{"תקציב"}</Column>
      <Column style={quarterStyle}>{"ביצוע"}</Column>

      <Column style={defaultheaderStyle}>{"הפרש"}</Column>
      <Column style={defaultheaderStyle}>{"הערות"}</Column>
    </HeaderRow>
  }

  Row = (index) => {
    // row data
    const rowData = this.getDataObject(index);

    const quarterColumns = [];

    // generate month columns
    for (let i = 1; i < 5; i++) {
      quarterColumns.push(<NonZeroNumberColumn key={`quarter${i}_budget`}>{rowData[`quarter${i}_budget`]}</NonZeroNumberColumn>);
      quarterColumns.push(<NonZeroNumberColumn key={`quarter${i}_budget_execution`}>{rowData[`quarter${i}_budget_execution`]}</NonZeroNumberColumn>);
    }

    return <Row key={index} style={{ minHeight: "35px" }} gridTemplateColumns={this.getGridTemplateColumns()}>
      {this.state.editMode ? <TableActions deleteHandler={() => this.deleteExpanseHandler(rowData.id, index)} /> : null}
      <Column>{index + 1}</Column>
      <Column>{rowData["section"]}</Column>
      {quarterColumns}
      <NonZeroNumberColumn>{rowData["evaluation"]}</NonZeroNumberColumn>
      <NonZeroNumberColumn>{rowData["total_budget"]}</NonZeroNumberColumn>
      <NonZeroNumberColumn>{rowData["total_execution"]}</NonZeroNumberColumn>
      <Column style={{ marginLeft: "10px" }}>{rowData["notes"]}</Column>
      {/*     {this.state.editMode ? this.textAreaInput("supplierName", rowData["supplierName"], index) : <Column>{rowData["supplierName"]}</Column>}
      {this.state.editMode ? this.numberInput("sum", rowData["sum"], index) : <NonZeroNumberColumn>{rowData["sum"]}</NonZeroNumberColumn>}
      {this.state.editMode ? this.textAreaInput("notes", rowData["notes"], index) : <Column style={{ whiteSpace: "pre-wrap" }}>{rowData["notes"]}</Column>} */}
    </Row>
  }

  render() {

    //building names
    const { buildingName, buildingNameEng } = this.props.location.state;

    const page = this.props.page;
    console.log(page);
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
              data: data,
              fileName: Helper.getSummarizedBudgetFilename(buildingName, date),
              tabName: `שנה ${date.year}`
            }}
            print={{
              title: pageTitle,
              pageTitle: pageTitle + " - " + buildingName
            }}
            pageName={pageName}
          />} // end leftPane

        />  {/* End TableControls */}

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
  summarizedBudgets: state.summarizedBudgets.pages[ownProps.location.state.buildingNameEng]
});

const mapDispatchToProps = dispatch => ({
  fetchSummarizedBudgets: (payload) => dispatch(summarizedBudgetActions.fetchSummarizedBudgets(payload)),
  summarizedBudgetCleanup: (buildingNameEng) => dispatch(summarizedBudgetActions.summarizedBudgetCleanup(buildingNameEng)),
  initSummzrizedBudgetsState: (page) => dispatch(summarizedBudgetActions.initSummzrizedBudgetsState(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(SummarizedBudgetTableContainer);

const defaultheaderStyle = {
  backgroundColor: "rgb(232, 236, 241)",
  color: "#000000",
  fontWeight: "600",
  justifyContent: "center",
  height: "27px",
  alignItems: "center"
};