// LIBRARIES
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

// ACTIONS
import {
  updateSummarizedBudget,
  updateDate
} from '../../redux/actions/summarizedBudgetActions';

// UTILS
import Helper from '../../helpers/Helper';
import { areEqual } from '../util';

// CONTEXT
import ThemeContext from '../../context/ThemeContext';

// COMPONENTS
import TableControls from '../../components/table/TableControls/TableControls';
import PageControls from '../../components/PageControls/PageControls';
import EditControls from '../../components/EditControls/EditControls';
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
import HeaderColumn from '../../components/table/HeaderColumn';
import useTableLogic from '../../customHooks/useTableLogic';
import YearOnlyDatePicker from '../../components/DatePicker/YearOnlyDatePicker';

const EDITMODE_TEMPLATE = "minmax(60px,5%) minmax(60px,5%) repeat(13,1fr)";
const DEFAULT_TEMPLATE = "minmax(60px,5%) repeat(13,1fr)";

const SummarizedBudgetsTableContainer = props => {

  const {
    date,
    data,
    isFetching,
    pageName,
    pageTitle,
    buildingName,
    buildingNameEng
  } = props;

  const {
    toggleEditMode,
    editMode,
    textAreaInput,
    numberInput
  } = useTableLogic();

  const themeContext = useContext(ThemeContext);

  const dispatch = useDispatch();

  const onBlurHandler = (e) => {
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
      buildingNameEng,
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
    return data[index];
  }

  const HeaderGroups = () => {

    const { colorSet } = themeContext;
    const { quarter, year } = date;

    const quarters = Helper.getYearQuarters(quarter);

    const defaultStyle = {

    }

    const quarterColumns = quarters.map((quarter, i) => {
      return <GroupColumn
        span={2}
        color={colorSet[i]}
        key={i}
      >{quarter}</GroupColumn>;
    });

    return <GroupRow
      gridTemplateColumns={getGridTemplateColumns()} /* style={{ backgroundColor: "#f5f6f9" }} */>
      {editMode ? <GroupColumn style={defaultStyle}></GroupColumn> : null}
      <GroupColumn style={defaultStyle}></GroupColumn>
      <GroupColumn style={defaultStyle}></GroupColumn>
      {quarterColumns}
      <GroupColumn
        span={3}
        color={colorSet[4]}
      >{`סוף שנת ${year}`}</GroupColumn>
      <GroupColumn style={defaultStyle}></GroupColumn>
    </GroupRow>
  }

  const HeadersRow = () => {
    const { colorSet } = themeContext;

    const quarterColumns = [];

    for (let i = 0; i < 4; i++) {
      quarterColumns.push(<HeaderColumn style={{ ...defaultheaderStyle, color: colorSet[i] }} key={`תקציב${i}`}>{"תקציב"}</HeaderColumn>);
      quarterColumns.push(<HeaderColumn style={{ ...defaultheaderStyle, color: colorSet[i] }} key={`ביצוע${i}`}>{"ביצוע"}</HeaderColumn>);
    }

    const yearStyle = {
      ...defaultheaderStyle,
      color: colorSet[4]
    }

    return <HeaderRow gridTemplateColumns={getGridTemplateColumns()} /* style={{ backgroundColor: "#f5f6f9" }} */>

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

  return (
    <TableWrapper>

      <TableControls
        editMode={editMode}
        rightPane={
          <EditControls
            editMode={editMode}
            toggleEditMode={toggleEditMode}
            dataExist={data.length > 0}
          />
        } // end rightPane
        middlePane={
          <YearOnlyDatePicker
            date={date}
            buildingNameEng={buildingNameEng}
            updateDate={updateDate}
          />
        } // end middlePane
        leftPane={<PageControls
          dataExist={data.length > 0}
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

export default SummarizedBudgetsTableContainer;

const defaultheaderStyle = {
  color: "#000000",
  fontWeight: "500",
  justifyContent: "center",
  height: "34px",
  alignItems: "center"
};