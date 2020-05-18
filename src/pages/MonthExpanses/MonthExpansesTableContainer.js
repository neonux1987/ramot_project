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

// HOC
import withTableLogic from '../../HOC/withTableLogic';

// AUDIO
import { myToasts } from '../../CustomToasts/myToasts';

const MonthExpansesTableContainer = props => {

  // building names
  const { buildingName, buildingNameEng } = props.location.state;

  const {
    date,
    pageName,
    pageTitle,
    editMode,
    toggleEditMode,
    addNewMode,
    toggleAddNewMode
  } = props;

  const dispatch = useDispatch();

  // page data
  const page = useSelector(store => store.monthExpanses.pages[buildingNameEng]);

  // page data
  const tax = useSelector(store => store.generalSettings.generalSettings.data[0].tax);

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

      dispatch(fetchMonthExpanses(params)).catch((result) => {
        myToasts.info(result.error)
      });

      dispatch(fetchExpansesCodesByStatus("active"));
    }
    dispatchActions();

    return cleanup;
  }, [date, buildingNameEng, dispatch]);

  const addNewExpanseSubmit = async (formInputs, reset) => {
    const valid = validateFormInputs(formInputs);
    if (!valid) {
      // send the error to the notification center
      myToasts.error("קוד או שם חשבון לא יכולים להיות ריקים");
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
      expanse[key] = value === "" ? 0 : Number.parseFloat(e.target.value);
    else {
      const { innerText } = e.target;
      expanse[key] = innerText;
    }

    //update the tax to the current one
    expanse.tax = tax;

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

  const TableRow = (index) => {
    const {
      textAreaInput,
      numberInput
    } = props;

    // row data
    const rowData = getDataObject(index);
    // column settings
    const gridTemplateColumns = `${editMode ? "80px" : ""}  100px 1fr 1fr 1fr 1fr 1fr 1fr`;

    const odd = index % 2 === 0 ? "" : "rgba(0, 0, 0, 0.02)";

    return <Row style={{ minHeight: "35px", backgroundColor: odd }} gridTemplateColumns={gridTemplateColumns}>
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

  if (page === undefined || page.data === undefined) {
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
              pageTitle: pageTitle + " - " + buildingName
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
        isFetching={isFetching || data.length === 0}
        itemCount={data.length}
      />

    </TableWrapper>
  );

}

const ConnectedComponent = withTableLogic(MonthExpansesTableContainer);

export default ConnectedComponent;

const headerStyle = {
  color: "#000000",
  fontWeight: "600",
  justifyContent: "center",
  height: "34px",
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
    title: "מקושר לסעיף מסכם...",
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