// LIBRARIES
import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ACTIONS
import {
  initSummarizedBudgetsState,
  fetchSummarizedBudgets,
  updateSummarizedBudget,
  summarizedBudgetsCleanup
} from '../../redux/actions/summarizedBudgetActions';

// UTILS
import Helper from '../../helpers/Helper';
import { areEqual } from '../util';

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

// HOC 
import withTableLogic from '../../HOC/withTableLogic';
import HeaderColumn from '../../components/table/HeaderColumn';

const EDITMODE_TEMPLATE = "minmax(60px,5%) minmax(60px,5%) repeat(13,1fr)";
const DEFAULT_TEMPLATE = "minmax(60px,5%) repeat(13,1fr)";

const SummarizedBudgetsTableContainer = props => {

  // building names
  const { buildingName, buildingNameEng } = props.location.state;

  const {
    date,
    dateActions,
    pageName,
    pageTitle,
    editMode,
    toggleEditMode
  } = props;

  const globalContext = useContext(GlobalContext);

  const dispatch = useDispatch();

  // page data
  const page = useSelector(store => store.summarizedBudgets.pages[buildingNameEng]);

  useEffect(() => {

    const cleanup = () => {
      //cleanup
      dispatch(summarizedBudgetsCleanup(buildingNameEng));
    }

    const params = {
      date: date,
      buildingName: buildingNameEng,
      range: {
        startElement: 0,
        pageSize: 1000
      }
    }

    const returnedPromise = dispatch(initSummarizedBudgetsState(params.buildingName));

    returnedPromise.then(() => {
      // dont fetch if date picker hasn't selected a date yet
      if (date.year !== undefined)
        dispatch(fetchSummarizedBudgets(params));
    })

    return cleanup;
  }, [date, buildingNameEng, dispatch]);



  const loadDataByDate = ({ year }) => {
    //important params that allows to pull the current data by
    //building name, current month and year.
    let params = {
      buildingName: buildingNameEng,
      date: {
        year: year
      }
    }

    //get the building month expanses
    dispatch(fetchSummarizedBudgets(params));

    dispatch(dateActions.updateDate(pageName, buildingNameEng, params.date));

  }

  const onBlurHandler = (e) => {
    const data = page.data;

    const target = e.target;

    const { key, index } = target.dataset;

    //copy old object so rollback would be possible
    const oldCopy = { ...data[index] };

    const newCopy = {};

    if (key === "notes") {
      const { innerText } = target;
      newCopy[key] = innerText;
    } else {
      const { value } = target;
      newCopy[key] = value === "" ? 0 : Number.parseFloat(value);
    }

    //prepare the params object
    let params = {
      buildingName: buildingNameEng,
      date,
      summarizedBudget: newCopy,
      summarized_section_id: oldCopy.summarized_section_id
    };

    dispatch(updateSummarizedBudget(params, oldCopy, newCopy, index));
    e.target.blur();
  }

  const deleteHandler = (id, summarized_section_id) => {

  }

  const getGridTemplateColumns = () => {
    return editMode ? EDITMODE_TEMPLATE : DEFAULT_TEMPLATE;
  }


  const getDataObject = (index) => {
    return page.data[index];
  }

  const HeaderGroups = () => {

    const { groupColors } = globalContext;
    const { quarter, year } = date;

    const quarters = Helper.getYearQuarters(quarter);

    const defaultStyle = {
      border: "none"
    }

    const quarterColumns = quarters.map((quarter, i) => {
      return <GroupColumn
        span={2}
        color={groupColors[i]}
        key={i}
      >{quarter}</GroupColumn>;
    });

    return <GroupRow
      gridTemplateColumns={getGridTemplateColumns()} style={{ backgroundColor: "#f5f6f9" }}>
      {editMode ? <GroupColumn style={defaultStyle}></GroupColumn> : null}
      <GroupColumn style={defaultStyle}></GroupColumn>
      <GroupColumn style={defaultStyle}></GroupColumn>
      {quarterColumns}
      <GroupColumn
        span={3}
        color={groupColors[4]}
      >{`סוף שנת ${year}`}</GroupColumn>
      <GroupColumn style={defaultStyle}></GroupColumn>
    </GroupRow>
  }

  const HeadersRow = () => {
    const { groupColors } = globalContext;

    const quarterColumns = [];

    for (let i = 0; i < 4; i++) {
      quarterColumns.push(<HeaderColumn style={{ ...defaultheaderStyle, color: groupColors[i] }} key={`תקציב${i}`}>{"תקציב"}</HeaderColumn>);
      quarterColumns.push(<HeaderColumn style={{ ...defaultheaderStyle, color: groupColors[i] }} key={`ביצוע${i}`}>{"ביצוע"}</HeaderColumn>);
    }

    const yearStyle = {
      ...defaultheaderStyle,
      color: groupColors[4]
    }

    return <HeaderRow gridTemplateColumns={getGridTemplateColumns()} style={{ backgroundColor: "#f5f6f9" }}>

      {editMode ? <HeaderColumn style={defaultheaderStyle}>{"פעולות"}</HeaderColumn> : null}
      <HeaderColumn style={defaultheaderStyle}>{"שורה"}</HeaderColumn>
      <HeaderColumn style={defaultheaderStyle}>{"סעיף"}</HeaderColumn>

      {quarterColumns}

      <HeaderColumn editMode={editMode} style={yearStyle}>{"הערכה"}</HeaderColumn>
      <HeaderColumn style={yearStyle}>{"תקציב"}</HeaderColumn>
      <HeaderColumn style={yearStyle}>{"ביצוע"}</HeaderColumn>

      <HeaderColumn editMode={editMode} style={defaultheaderStyle}>{"הערות"}</HeaderColumn>
    </HeaderRow>
  }

  const TableRow = (index) => {
    const {
      textAreaInput,
      numberInput
    } = props;

    // row data
    const rowData = getDataObject(index);

    const quarterColumns = [];

    // generate month columns
    for (let i = 1; i < 5; i++) {
      quarterColumns.push(<NonZeroNumberColumn key={`quarter${i}_budget`}>{rowData[`quarter${i}_budget`]}</NonZeroNumberColumn>);
      quarterColumns.push(<NonZeroNumberColumn key={`quarter${i}_execution`}>{rowData[`quarter${i}_execution`]}</NonZeroNumberColumn>);
    }

    const odd = index % 2 === 0 ? "" : "";

    return <Row key={index} style={{ minHeight: "35px", backgroundColor: odd }} gridTemplateColumns={getGridTemplateColumns()}>
      {editMode ? <TableActions deleteHandler={() => deleteHandler(rowData.id, index)} /> : null}
      <Column>{index + 1}</Column>
      <Column>{rowData["section"]}</Column>
      {quarterColumns}
      {editMode ? numberInput("evaluation", rowData["evaluation"], index, onBlurHandler) : <NonZeroNumberColumn>{rowData["evaluation"]}</NonZeroNumberColumn>}
      <NonZeroNumberColumn>{rowData["year_total_budget"]}</NonZeroNumberColumn>
      <NonZeroNumberColumn>{rowData["year_total_execution"]}</NonZeroNumberColumn>
      {editMode ? textAreaInput("notes", rowData["notes"], index, onBlurHandler) : <Column style={{ marginLeft: "10px" }}>{rowData["notes"]}</Column>}
    </Row>
  }

  if (page === undefined || page.data === undefined) {
    return <AlignCenterMiddle><Spinner loadingText={"טוען הגדרות טבלת מעקב ביצוע מול תקציב..."} /></AlignCenterMiddle>;
  }

  // provider data
  const {
    data,
    isFetching,
    //pageSettings
  } = page;

  return (
    <TableWrapper>

      <TableControls
        editMode={editMode}
        rightPane={
          <EditControls
            editMode={editMode}
            toggleEditMode={toggleEditMode}
          />
        } // end rightPane
        middlePane={
          <DatePicker
            buildingName={buildingNameEng}
            date={date}
            submitHandler={loadDataByDate}
            pageName={pageName}
          />
        } // end middlePane
        leftPane={<PageControls
          excel={{
            data,
            fileName: Helper.getSummarizedBudgetsFilename(buildingName, date),
            buildingName,
            buildingNameEng,
            date
          }}
          print={{
            title: pageTitle,
            pageTitle: pageTitle + " - " + buildingName,
            date: `שנה ${date.year}`,
            Row: TableRow,
            GroupComponent: HeaderGroups,
            HeaderComponent: HeadersRow,
            itemCount: data.length
          }}
          pageName={pageName}
        />} // end leftPane

      />  {/* End TableControls */}

      <Table
        Row={TableRow}
        GroupComponent={HeaderGroups}
        HeaderComponent={HeadersRow}
        isFetching={isFetching}
        itemCount={data.length}
      />

    </TableWrapper>
  );

}

const ConnectedComponent = withTableLogic(SummarizedBudgetsTableContainer);

export default React.memo(ConnectedComponent, areEqual);

const defaultheaderStyle = {
  color: "#000000",
  fontWeight: "600",
  justifyContent: "center",
  height: "34px",
  alignItems: "center"
};