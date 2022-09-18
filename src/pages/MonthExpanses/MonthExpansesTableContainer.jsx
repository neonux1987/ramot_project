// LIBRARIES IMPORTS
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// ACTIONS IMPORTS
import {
  updateMonthExpanse,
  deleteMonthExpanse
} from "../../redux/actions/monthExpansesActions";
import { fetchExpansesCodesByStatus } from "../../redux/actions/expansesCodesActions";

// UTILITY IMPORTS
import Helper from "../../helpers/Helper";

// COMMON COMPONENTS IMPORTS
import TableActions from "../../components/table/TableActions/TableActions";
import Spinner from "../../components/Spinner/Spinner";
import { AlignCenterMiddle } from "../../components/AlignCenterMiddle/AlignCenterMiddle";
import TableContainer from "../../components/table/TableContainer";
import Cell from "../../components/table/components/Cell";
import NonZeroCell from "../../components/table/components/NonZeroCell";
import HeaderRow from "../../components/table/components/HeaderRow";
import HeaderCell from "../../components/table/components/HeaderCell";
import TableRow from "../../components/table/components/TableRow";
import MonthExpansesDatePicker from "./MonthExpansesDatePicker";
import TableSection from "../../components/Section/TableSection";
import SectionControlsContainer from "../../components/table/TableControls/SectionControlsContainer";
import AddExpanseContainer from "./AddExpanse/AddExpanseContainer";

// HOOKS
import useTableLogic from "../../customHooks/useTableLogic";

const MonthExpansesTableContainer = (props) => {
  const {
    date,
    pageName,
    pageTitle,
    buildingName,
    buildingId,
    data,
    isFetching
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
  const generalSettings = useSelector((store) => store.generalSettings);

  useEffect(() => {
    dispatch(fetchExpansesCodesByStatus("active"));
  }, [dispatch]);

  const onBlurHandler = (e) => {
    // tax data
    const tax = generalSettings.data[0].tax;

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
    if (expanse.sum === 0) expanse.tax = 0;

    //prepare the params
    let params = {
      expanse: expanse,
      buildingId,
      date
    };

    //update expanse
    dispatch(updateMonthExpanse(params, oldExpanseCopy, index));
    e.target.blur();
  };

  const deleteExpanseHandler = (id, index) => {
    //prepare the params
    let params = {
      id,
      buildingId,
      date
    };
    dispatch(deleteMonthExpanse(params, index));
  };

  const getDataObject = (index) => {
    return data[index];
  };

  const HeadersRow = () => {
    // column settings
    const gridTemplateColumns = `${
      editMode ? "80px" : ""
    }  100px 1fr 1fr 1fr 1fr 1fr 1fr`;

    return (
      <HeaderRow gridTemplateColumns={gridTemplateColumns}>
        {editMode ? <HeaderCell>{"פעולות"}</HeaderCell> : null}
        <HeaderCell>{"שורה"}</HeaderCell>
        <HeaderCell>{`קוד הנהח"ש`}</HeaderCell>
        <HeaderCell>{"שם חשבון"}</HeaderCell>
        <HeaderCell>{"מקושר לסעיף מסכם..."}</HeaderCell>
        <HeaderCell editMode={editMode}>{"ספק"}</HeaderCell>
        <HeaderCell editMode={editMode}>{"סכום"}</HeaderCell>
        <HeaderCell editMode={editMode}>{"הערות"}</HeaderCell>
      </HeaderRow>
    );
  };

  const Row = (index) => {
    // row data
    const rowData = getDataObject(index);
    // column settings
    const gridTemplateColumns = `${
      editMode ? "80px" : ""
    }  100px 1fr 1fr 1fr 1fr 1fr 1fr`;

    return (
      <TableRow key={index} gridTemplateColumns={gridTemplateColumns}>
        {editMode ? (
          <TableActions
            deleteHandler={() => deleteExpanseHandler(rowData.id, index)}
          />
        ) : null}

        <Cell>{index + 1}</Cell>

        <Cell>{rowData["code"]}</Cell>
        <Cell>{rowData["codeName"]}</Cell>
        <Cell>{rowData["section"]}</Cell>

        {editMode ? (
          textAreaInput(
            "supplierName",
            rowData["supplierName"],
            index,
            onBlurHandler
          )
        ) : (
          <Cell>{rowData["supplierName"]}</Cell>
        )}
        {editMode ? (
          numberInput("sum", rowData["sum"], index, onBlurHandler)
        ) : (
          <NonZeroCell>{rowData["sum"]}</NonZeroCell>
        )}
        {editMode ? (
          textAreaInput("notes", rowData["notes"], index, onBlurHandler)
        ) : (
          <Cell style={{ paddingLeft: "10px" }}>{rowData["notes"]}</Cell>
        )}
      </TableRow>
    );
  };

  if (generalSettings.isFetching) {
    return (
      <AlignCenterMiddle>
        <Spinner loadingText={"טוען הגדרות טבלת מעקב הוצאות חודשיות..."} />
      </AlignCenterMiddle>
    );
  }

  const dataExist = data.length > 0;

  return (
    <TableSection editMode={editMode}>
      <SectionControlsContainer
        edit={true}
        editModeProps={{
          editMode,
          toggleEditMode,
          dataExist
        }}
        addNew={true}
        addNewModeProps={{
          addNewMode,
          toggleAddNewMode,
          dataExist
        }}
        excel={true}
        excelProps={{
          data,
          fileName: Helper.getMonthExpansesFilename(buildingName, date),
          buildingName,
          buildingId,
          date,
          pageName,
          dataExist
        }}
        print={true}
        printProps={{
          pageName,
          dataExist
        }}
      />

      <AddExpanseContainer
        data={data}
        show={addNewMode}
        buildingId={buildingId}
        tax={generalSettings.data[0].tax}
        date={date}
      />

      <MonthExpansesDatePicker date={date} buildingId={buildingId} />

      <TableContainer
        Row={Row}
        HeaderComponent={HeadersRow}
        isFetching={isFetching}
        totalCount={data.length}
        printHeaderDetails={{
          pageTitle: buildingName + " - " + pageTitle,
          date: `שנה ${date.year} / רבעון ${date.quarter} / חודש ${date.monthHeb}`
        }}
      />
    </TableSection>
  );
};

export default MonthExpansesTableContainer;
