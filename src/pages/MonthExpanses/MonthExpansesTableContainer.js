// LIBRARIES IMPORTS
import React, { Component, Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

// ACTIONS IMPORTS
import * as monthExpansesAction from '../../redux/actions/monthExpansesActions';

// UTILITY IMPORTS
import Helper from '../../helpers/Helper';

// CONTEXT IMPORTS
import GlobalContext from '../../context/GlobalContext';

// COMMON COMPONENTS IMPORTS
import PageControls from '../../components/PageControls/PageControls';
import DatePicker from '../../components/DatePicker/DatePicker';
import TableControls from '../../components/table/TableControls/TableControls';
import EditControls from '../../components/EditControls/EditControls';
import { notify, notificationTypes } from '../../components/Notifications/Notification';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import TableActions from '../../components/table/TableActions/TableActions';
import Spinner from '../../components/Spinner/Spinner';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import AddBox from './AddBoxContainer';
import TableWrapper from '../../components/table/TableWrapper/TableWrapper';
import EditableColumn from '../../components/table/TableCell/EditableColumn';
import GroupRow from '../../components/table/GroupRow';
import GroupColumn from '../../components/table/GroupColumn';
import InfoBox from '../../components/InfoBox/InfoBox';
import Table from '../../components/table/Table';
import Row from '../../components/table/Row';
import Column from '../../components/table/Column';
import NonZeroNumberColumn from '../../components/table/NonZeroNumberColumn';
import HeaderRow from '../../components/table/HeaderRow';

// DATA FETHCER
import RegisteredDatesFetcher from '../../renderProps/providers/RegisteredDatesFetcher';

// HOC
import withTableLogic from '../../HOC/withTableLogic';

class MonthExpanses extends React.PureComponent {

  state = {
    editMode: false,
    addNewMode: false
  };

  static contextType = GlobalContext;

  componentDidMount() {
    const params = {
      buildingName: this.props.location.state.buildingNameEng,
      date: Helper.getCurrentDate(),
      range: {
        startElement: 0,
        pageSize: 1000
      }
    }
    this.props.initMonthExpansesState(this.props.location.state.buildingNameEng).then(() => {
      this.props.fetchMonthExpanses(params)
    });
  }

  inputExpansesSubmit = (formInputs, reset) => {
    //building names
    const { buildingNameEng } = this.props.location.state;
    // building data
    const { date } = this.props.monthExpanses.pages[buildingNameEng];

    const valid = this.validateFormInputs(formInputs);
    if (!valid) {

      notify({
        isError: true,
        type: notificationTypes.validation,
        message: "קוד או שם חשבון לא יכולים להיות ריקים"
      });
      playSound(soundTypes.error);
      return;
    }

    const copiedFormInputs = { ...formInputs };
    copiedFormInputs.code = copiedFormInputs.code.code;
    copiedFormInputs.codeName = copiedFormInputs.codeName.codeName;
    copiedFormInputs.expanses_code_id = formInputs.code.id;
    copiedFormInputs.year = date.year;
    copiedFormInputs.month = date.month;
    copiedFormInputs.tax = this.props.generalSettings.tax;

    //parse form inputs
    const parsedFormInputs = this.parseFormInputs(copiedFormInputs);

    const params = {
      buildingName: this.props.location.state.buildingNameEng,
      expanse: parsedFormInputs,
      date: date
    }

    this.props.addMonthExpanse(params, params.expanse);

    //reset form state
    reset();

  }

  validateFormInputs = (formInputs) => {
    if (!formInputs.code && !formInputs.codeName) {
      return false;
    }
    return true;
  }

  parseFormInputs = (formInputs) => {
    const copyFormInputs = { ...formInputs };
    //parse inputs
    copyFormInputs.code = Number.parseInt(copyFormInputs.code);
    copyFormInputs.sum = copyFormInputs.sum === "" ? 0 : Number.parseFloat(copyFormInputs.sum);
    copyFormInputs.summarized_section_id = Number.parseInt(copyFormInputs.summarized_section_id);
    copyFormInputs.year = Number.parseInt(formInputs.year);
    copyFormInputs.tax = Number.parseFloat(formInputs.tax);

    return copyFormInputs;
  }

  componentWillUnmount() {
    //on exit init table data
    this.props.monthExpansesCleanup(this.props.location.state.buildingNameEng);
  }

  findExpanseIndex = (code = null, codeName = null) => {
    let result = null;
    this.props.monthExpanses.expanses.data.forEach((row, index) => {
      if (row["code"] === Number.parseInt(code) || row["codeName"] === codeName) {
        result = index;
      }
    });
    return result;
  }

  loadDataByDate = ({ month, year }) => {
    const monthNum = Helper.convertEngToMonthNum(month);

    const { pageName } = this.props;
    const { buildingNameEng } = this.props.location.state

    //important params that allows to pull the current data by
    //building name, current month and year.
    let params = {
      buildingName: buildingNameEng,
      date: {
        year: year,
        month: month,
        monthNum: monthNum,
        monthHeb: Helper.convertEngToHebMonth(month),
        quarterEng: Helper.convertMonthNumToQuarterEng(monthNum),
        quarterHeb: Helper.getCurrentQuarterHeb(monthNum)
      }
    }

    //get the building month expanses
    this.props.fetchMonthExpanses(params);

    this.props.dateActions.updateDate(pageName, buildingNameEng, params.date);

  }

  getLocationState = () => {
    return this.props.location.state;
  }

  getPage = () => {
    return this.props.page;
  }

  onBlurHandler = (e) => {
    //building names
    const { buildingNameEng } = this.getLocationState();

    // building data
    const { data } = this.getPage();

    // date
    const date = this.props.date;

    const target = e.target;

    const { type, value } = target;

    const { key, index } = target.dataset;

    //will be used for rollback
    const oldExpanseCopy = { ...data[index] };

    const expanse = { ...oldExpanseCopy };

    if (type === "number")
      // empty string converted to 0
      // parse float to secure that the value is a number
      expanse[key] = value === "" ? 0 : Number.parseFloat(e.target.value);
    else {
      const { innerText } = e.target;
      expanse[key] = innerText;
    }

    //update the tax to the current one
    expanse.tax = this.props.generalSettings.tax;

    //prepare the params
    let params = {
      expanse: expanse,
      buildingName: buildingNameEng,
      date
    };
    //update expanse
    this.props.updateMonthExpanse(params, oldExpanseCopy, index);
    e.target.blur();
  }

  deleteExpanseHandler = (id, index) => {
    //building names
    const { buildingNameEng } = this.getLocationState();

    // building data
    const { date } = this.getPage();

    //prepare the params
    let params = {
      id: id,
      buildingName: buildingNameEng,
      date: date
    };
    this.props.deleteMonthExpanse(params, index);
  }

  onFetchData = (state) => {

    //building names
    const { buildingNameEng } = this.getLocationState();

    // building data
    const { date } = this.getPage();

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
      buildingName: buildingNameEng,
      date: date,
      range: {
        startElement,
        pageSize
      }
    };

    //get the building month expanses
    this.props.fetchMonthExpanses(params);
  }

  getDataObject = (index) => {
    return this.getPage().data[index];
  }

  HeaderGroups = () => {
    return <GroupRow>
      <GroupColumn></GroupColumn>
    </GroupRow>
  }

  HeadersRow = () => {
    const editMode = this.props.editMode;

    // column settings
    const gridTemplateColumns = `${editMode ? "80px" : ""}  100px 1fr 1fr 1fr 1fr 1fr 1fr`;

    return <HeaderRow gridTemplateColumns={gridTemplateColumns}>

      {editMode ? <Column style={headerStyle}>{"פעולות"}</Column> : null}
      {headers.map((header, index) => {
        return (
          <Column
            key={index} style={{
              display: header.title === "פעולות" && !editMode ? "none" : "flex",
              ...header.headerStyle
            }}>{header.title}</Column>);
      })}
    </HeaderRow>
  }

  Row = (index) => {
    const {
      editMode,
      textAreaInput,
      numberInput
    } = this.props;

    // row data
    const rowData = this.getDataObject(index);
    // column settings
    const gridTemplateColumns = `${editMode ? "80px" : ""}  100px 1fr 1fr 1fr 1fr 1fr 1fr`;

    return <Row style={{ minHeight: "35px" }} gridTemplateColumns={gridTemplateColumns}>
      {editMode ? <TableActions deleteHandler={() => this.deleteExpanseHandler(rowData.id, index)} /> : null}
      <Column>{index + 1}</Column>
      <Column>{rowData["code"]}</Column>
      <Column>{rowData["codeName"]}</Column>
      <Column>{rowData["section"]}</Column>
      {editMode ? textAreaInput("supplierName", rowData["supplierName"], index, this.onBlurHandler) : <Column>{rowData["supplierName"]}</Column>}
      {editMode ? numberInput("sum", rowData["sum"], index, this.onBlurHandler) : <NonZeroNumberColumn>{rowData["sum"]}</NonZeroNumberColumn>}
      {editMode ? textAreaInput("notes", rowData["notes"], index, this.onBlurHandler) : <Column style={{ whiteSpace: "pre-wrap,", marginLeft: "10px" }}>{rowData["notes"]}</Column>}
    </Row>
  }

  render() {
    //building names
    const { buildingName, buildingNameEng } = this.getLocationState();

    const page = this.props.page;

    if (page === undefined || page.data === undefined) {
      return <AlignCenterMiddle><Spinner loadingText={"טוען עמוד"} /></AlignCenterMiddle>;
    }

    const {
      date,
      pageName,
      pageTitle,
      editMode,
      toggleEditMode,
      addNewMode,
      toggleAddNewMode
    } = this.props;

    // building data
    const {
      isFetching,
      data,
      pageSettings
    } = page;

    //add new month expanse box
    const addNewBox = addNewMode ?
      <AddBox
        data={data}
        submitData={this.inputExpansesSubmit}
        findData={this.findExpanseIndex}
      />
      : null;

    return (
      <TableWrapper>

        <TableControls
          rightPane={
            <EditControls
              editMode={editMode}
              toggleEditMode={toggleEditMode}
              addNewMode={addNewMode}
              toggleAddNewMode={toggleAddNewMode}
            />
          } // end rightPane
          middlePane={
            <RegisteredDatesFetcher fetchYears fetchMonths params={{
              buildingName: buildingNameEng
            }}>
              {({ months, years }) => {
                return <DatePicker
                  months={months}
                  years={years}
                  date={date}
                  submitHandler={this.loadDataByDate}
                />
              }}
            </RegisteredDatesFetcher>

          } // end middlePane
          leftPane={
            <PageControls
              excel={{
                data: data,
                fileName: Helper.getMonthExpansesFilename(buildingName, date),
                sheetTitle: `שנה ${date.year} חודש ${date.monthHeb}`,
                header: `${buildingName} / הוצאות חודש ${date.monthHeb} / ${date.year}`,
              }}
              print={{
                title: pageTitle,
                pageTitle: pageTitle + " - " + buildingName
              }}
              pageName={pageName}
            />
          } // end leftPane
        /> {/* end TableControls */}

        {/* add new box */}
        {addNewBox}

        <InfoBox
          month={date.monthHeb}
          quarter={date.quarter}
          year={date.year}
          editMode={editMode}
        />

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

const mapStateToProps = (state, ownProps) => {
  //buildingName
  const buildingName = ownProps.location.state.buildingNameEng;

  return ({
    page: state.monthExpanses.pages[buildingName],
    generalSettings: {
      tax: state.generalSettings.generalSettings.data[0].tax
    }
  });
}

const mapDispatchToProps = dispatch => ({
  fetchMonthExpanses: (payload, page) => dispatch(monthExpansesAction.fetchMonthExpanses(payload, page)),
  monthExpansesCleanup: (buildingNameEng) => dispatch(monthExpansesAction.monthExpansesCleanup(buildingNameEng)),
  initMonthExpansesState: (page) => dispatch(monthExpansesAction.initMonthExpansesState(page)),
  updateMonthExpanse: (payload, tableData, target, fieldName) => dispatch(monthExpansesAction.updateMonthExpanse(payload, tableData, target, fieldName)),
  addMonthExpanse: (params, expanse) => dispatch(monthExpansesAction.addMonthExpanse(params, expanse)),
  deleteMonthExpanse: (payload, index) => dispatch(monthExpansesAction.deleteMonthExpanse(payload, index))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withTableLogic(MonthExpanses)
);

/* const headerStyle = {
  backgroundColor: "rgb(232, 236, 241)",
  color: "#000000",
  fontWeight: "600",
  justifyContent: "center",
  height: "27px",
  alignItems: "center"
}; */

const headerStyle = {
  backgroundColor: "rgb(232, 236, 241)",
  color: "#000000",
  fontWeight: "600",
  justifyContent: "center",
  height: "27px",
  alignItems: "center"
};

// table headers
const headers = [
  {
    title: "שורה",
    headerStyle
  },
  {
    title: "קוד הנהח\"ש",
    headerStyle
  },
  {
    title: "שם חשבון",
    headerStyle
  },
  {
    title: "מקושר לסעיף",
    headerStyle
  },
  {
    title: "ספק",
    headerStyle
  },
  {
    title: "סכום",
    headerStyle
  },
  {
    title: "הערות",
    headerStyle
  }
];