// LIBRARIES IMPORTS
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ACTIONS IMPORTS
import {
  initMonthExpansesState,
  fetchMonthExpanses,
  updateMonthExpanse,
  addMonthExpanse,
  deleteMonthExpanse,
  monthExpansesCleanup
} from '../../redux/actions/monthExpansesActions';
import { fetchExpansesCodesByStatus } from '../../redux/actions/expansesCodesActions';
import gs from '../../redux/actions/generalSettingsActions';

// UTILITY IMPORTS
import Helper from '../../helpers/Helper';

// COMMON COMPONENTS IMPORTS
import PageControls from '../../components/PageControls/PageControls';
import DatePicker from '../../components/DatePicker/DatePicker';
import TableControls from '../../components/table/TableControls/TableControls';
import EditControls from '../../components/EditControls/EditControls';
import TableActions from '../../components/table/TableActions/TableActions';
import Spinner from '../../components/Spinner/Spinner';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import AddBox from './AddBoxContainer';
import TableWrapper from '../../components/table/TableWrapper/TableWrapper';
import Table from '../../components/table/Table';
import Row from '../../components/table/Row';
import Column from '../../components/table/Column';
import NonZeroNumberColumn from '../../components/table/NonZeroNumberColumn';
import HeaderRow from '../../components/table/HeaderRow';

// AUDIO
import { toastManager } from '../../toasts/toastManager';
import HeaderColumn from '../../components/table/HeaderColumn';
import useTableLogic from '../../customHooks/useTableLogic';

const MonthExpansesTableContainer = props => {

  // building names
  const { buildingName, buildingNameEng } = props.location.state;

  const {
    date,
    pageName,
    pageTitle
  } = props;

  const {
    toggleEditMode,
    editMode,
    toggleAddNewMode,
    addNewMode,
    textAreaInput,
    numberInput
  } = useTableLogic();

  const dispatch = useDispatch();

  // page data
  const page = useSelector(store => store.monthExpanses.pages[buildingNameEng]);

  // page data
  const generalSettings = useSelector(store => store.generalSettings);

  useEffect(() => {
    dispatch(gs.fetchGeneralSettings());
  }, []);

  useEffect(() => {
    const cleanup = () => {
      //cleanup
      dispatch(monthExpansesCleanup(buildingNameEng));
    }

    const params = {
      buildingName: buildingNameEng,
      date,
      range: {
        startElement: 0,
        pageSize: 1000
      }
    }

    const dispatchActions = async () => {
      await dispatch(initMonthExpansesState(params.buildingName));

      // the init state of date has 0
      // properties. when a date is chosen in date picker
      // then the date is available so dont fetch when date
      // doesn't have properties
      if (date.year !== undefined)
        dispatch(fetchMonthExpanses(params)).catch((result) => {
          toastManager.info(result.error)
        });

      dispatch(fetchExpansesCodesByStatus("active"));
    }
    dispatchActions();

    return cleanup;
  }, [date, buildingNameEng, dispatch]);

  const addNewExpanseSubmit = async (formInputs, reset) => {
    // tax data
    const tax = generalSettings.data[0].tax;

    const valid = validateFormInputs(formInputs);
    if (!valid) {
      // send the error to the notification center
      toastManager.error("קוד או שם חשבון לא יכולים להיות ריקים");
      return;
    }

    if (date.year === undefined) {
      // send the error to the notification center
      toastManager.error("לא ניתן להוסיף שורה לדוח ריק");
      return;
    }

    const copiedFormInputs = { ...formInputs };
    copiedFormInputs.code = copiedFormInputs.code.code;
    copiedFormInputs.codeName = copiedFormInputs.codeName.codeName;
    copiedFormInputs.expanses_code_id = formInputs.code.id;
    copiedFormInputs.year = date.year;
    copiedFormInputs.month = date.month;
    copiedFormInputs.tax = tax;

    //parse form inputs
    const parsedFormInputs = parseFormInputs(copiedFormInputs);

    const params = {
      buildingName: buildingNameEng,
      expanse: parsedFormInputs,
      date: date
    }

    dispatch(addMonthExpanse(params, params.expanse)).then(() => {
      reset();
    });

  }

  const validateFormInputs = (formInputs) => {
    if (!formInputs.code && !formInputs.codeName) {
      return false;
    }
    return true;
  }

  const parseFormInputs = (formInputs) => {
    // tax data
    const tax = generalSettings.data[0].tax;

    const copyFormInputs = { ...formInputs };
    //parse inputs
    copyFormInputs.code = Number.parseInt(copyFormInputs.code);
    copyFormInputs.sum = copyFormInputs.sum === "" ? 0 : Number.parseFloat(copyFormInputs.sum);
    copyFormInputs.summarized_section_id = Number.parseInt(copyFormInputs.summarized_section_id);
    copyFormInputs.year = Number.parseInt(formInputs.year);
    copyFormInputs.tax = Number.parseFloat(formInputs.tax);

    return copyFormInputs;
  }


  const findExpanseIndex = (code = null, codeName = null) => {
    let result = null;
    page.data.forEach((row, index) => {
      if (row["code"] === Number.parseInt(code) || row["codeName"] === codeName) {
        result = index;
      }
    });
    return result;
  }

  const loadDataByDate = ({ month, year }) => {
    const monthNum = Helper.convertEngToMonthNum(month);

    //important params that allows to pull the current data by
    //building name, current month and year.
    let params = {
      buildingName: buildingNameEng,
      date: {
        year: year,
        month: month,
        monthNum: monthNum,
        monthHeb: Helper.convertEngToHebMonth(month),
        quarter: Helper.getCurrentQuarter(monthNum),
        quarterEng: Helper.convertMonthNumToQuarterEng(monthNum),
        quarterHeb: Helper.getCurrentQuarterHeb(monthNum)
      }
    }

    //get the building month expanses
    dispatch(fetchMonthExpanses(params));

    //dispatch(dateActions.updateDate(pageName, buildingNameEng, params.date));
  }

  const onBlurHandler = (e) => {
    // tax data
    const tax = generalSettings.data[0].tax;

    // building data
    const data = page.data;

    const target = e.target;

    const { type, value } = target;

    const { key, index } = target.dataset;

    //will be used for rollback
    const oldExpanseCopy = { ...data[index] };

    const expanse = { ...oldExpanseCopy };

    if (type === "number")
      // empty string converted to 0
      // parse float to secure that the value is a number
      expanse[key] = value === "" ? 0 : Number.parseFloat(value);
    else {
      const { innerText } = e.target;
      expanse[key] = innerText;
    }

    //update the tax to the current one
    expanse.tax = tax;

    // init tax property
    if (expanse.sum === 0)
      expanse.tax = 0;

    //prepare the params
    let params = {
      expanse: expanse,
      buildingName: buildingNameEng,
      date
    };

    //update expanse
    dispatch(updateMonthExpanse(params, oldExpanseCopy, index));
    e.target.blur();
  }

  const deleteExpanseHandler = (id, index) => {

    //prepare the params
    let params = {
      id,
      buildingName: buildingNameEng,
      date
    };
    dispatch(deleteMonthExpanse(params, index));
  }

  const getDataObject = (index) => {
    return page.data[index];
  }

  const HeadersRow = () => {
    // column settings
    const gridTemplateColumns = `${editMode ? "80px" : ""}  100px 1fr 1fr 1fr 1fr 1fr 1fr`;

    return <HeaderRow gridTemplateColumns={gridTemplateColumns} /* style={{borderBottom: "1px solid rgba(0, 0, 0, 0.22)"}} */>

      {editMode ? <HeaderColumn style={headerStyle}>{"פעולות"}</HeaderColumn> : null}
      <HeaderColumn style={headerStyle}>{"שורה"}</HeaderColumn>
      <HeaderColumn style={headerStyle}>{`קוד הנהח"ש`}</HeaderColumn>
      <HeaderColumn style={headerStyle}>{"שם חשבון"}</HeaderColumn>
      <HeaderColumn style={headerStyle}>{"מקושר לסעיף מסכם..."}</HeaderColumn>
      <HeaderColumn editMode={editMode} style={headerStyle}>{"ספק"}</HeaderColumn>
      <HeaderColumn editMode={editMode} style={headerStyle}>{"סכום"}</HeaderColumn>
      <HeaderColumn editMode={editMode} style={headerStyle}>{"הערות"}</HeaderColumn>
    </HeaderRow>
  }

  const TableRow = (index) => {
    // row data
    const rowData = getDataObject(index);
    // column settings
    const gridTemplateColumns = `${editMode ? "80px" : ""}  100px 1fr 1fr 1fr 1fr 1fr 1fr`;

    const odd = index % 2 === 0 ? "" : "";

    return <Row key={index} style={{ minHeight: "35px", backgroundColor: odd }} gridTemplateColumns={gridTemplateColumns}>
      {editMode ? <TableActions deleteHandler={() => deleteExpanseHandler(rowData.id, index)} /> : null}

      <Column>{index + 1}</Column>

      <Column>{rowData["code"]}</Column>
      <Column>{rowData["codeName"]}</Column>
      <Column >{rowData["section"]}</Column>

      {editMode ? textAreaInput("supplierName", rowData["supplierName"], index, onBlurHandler) : <Column>{rowData["supplierName"]}</Column>}
      {editMode ? numberInput("sum", rowData["sum"], index, onBlurHandler) : <NonZeroNumberColumn>{rowData["sum"]}</NonZeroNumberColumn>}
      {editMode ? textAreaInput("notes", rowData["notes"], index, onBlurHandler) : <Column style={{ whiteSpace: "pre-wrap", marginLeft: "10px" }}>{rowData["notes"]}</Column>}
    </Row>
  }

  if (page === undefined || page.data === undefined || generalSettings.isFetching) {
    return <AlignCenterMiddle><Spinner loadingText={"טוען הגדרות טבלת מעקב הוצאות חודשיות..."} /></AlignCenterMiddle>;
  }

  // provider data
  const {
    data,
    isFetching,
    //pageSettings
  } = page;

  //add new month expanse box
  const addNewBox = addNewMode ?
    <AddBox
      data={data}
      submitData={addNewExpanseSubmit}
      findData={findExpanseIndex}
    />
    : null;

  return (
    <TableWrapper id={pageName}>

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
          <DatePicker
            month
            date={date}
            buildingName={buildingNameEng}
            submitHandler={loadDataByDate}
            pageName={pageName}
          />

        } // end middlePane
        editMode={editMode}
        leftPane={
          <PageControls
            excel={{
              data,
              fileName: Helper.getMonthExpansesFilename(buildingName, date),
              buildingName,
              buildingNameEng,
              date
            }}
            print={{
              title: pageTitle,
              pageTitle: pageTitle + " - " + buildingName,
              date: `שנה ${date.year}\\רבעון ${date.quarter}\\חודש ${date.monthHeb}`,
              Row: TableRow,
              HeaderComponent: HeadersRow,
              itemCount: data.length
            }}
            pageName={pageName}
          />
        } // end leftPane
      /> {/* end TableControls */}

      {/* add new box */}
      {addNewBox}

      <Table
        Row={TableRow}
        HeaderComponent={HeadersRow}
        isFetching={isFetching}
        itemCount={data.length}
      />

    </TableWrapper>
  );

}

export default MonthExpansesTableContainer;

const headerStyle = {
  color: "#000000",
  fontWeight: "500",
  justifyContent: "center",
  height: "34px",
  alignItems: "center"
};