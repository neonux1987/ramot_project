// LIBRARIES IMPORTS
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ACTIONS IMPORTS
import {
  updateMonthExpanse,
  addMonthExpanse,
  deleteMonthExpanse
} from '../../redux/actions/monthExpansesActions';
import { fetchExpansesCodesByStatus } from '../../redux/actions/expansesCodesActions';

// UTILITY IMPORTS
import Helper from '../../helpers/Helper';

// COMMON COMPONENTS IMPORTS
import PageControls from '../../components/PageControls/PageControls';
import TableControls from '../../components/table/TableControls/TableControls';
import EditControls from '../../components/EditControls/EditControls';
import TableActions from '../../components/table/TableActions/TableActions';
import Spinner from '../../components/Spinner/Spinner';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import AddNewContainer from './AddNewContainer';
import Table from '../../components/table/Table';
import Cell from '../../components/table/components/Cell';
import NonZeroCell from '../../components/table/components/NonZeroCell';
import HeaderRow from '../../components/table/components/HeaderRow';
import HeaderCell from '../../components/table/components/HeaderCell';
import TableRow from '../../components/table/components/TableRow';

// AUDIO
import { toastManager } from '../../toasts/toastManager';
import useTableLogic from '../../customHooks/useTableLogic';
import MonthExpansesDatePicker from './MonthExpansesDatePicker';
import TableSection from '../../components/Section/TableSection';
import useBuildingColor from '../../customHooks/useBuildingColor';


const MonthExpansesTableContainer = props => {

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
  const [getBuildingColor] = useBuildingColor();

  // page data
  const generalSettings = useSelector(store => store.generalSettings);

  useEffect(() => {
    dispatch(fetchExpansesCodesByStatus("active"));
  }, [dispatch]);

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
      buildingId,
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
    //const tax = generalSettings.data[0].tax;

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
    data.forEach((row, index) => {
      if (row["code"] === Number.parseInt(code) || row["codeName"] === codeName) {
        result = index;
      }
    });
    return result;
  }

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
    if (expanse.sum === 0)
      expanse.tax = 0;

    //prepare the params
    let params = {
      expanse: expanse,
      buildingId,
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
      buildingId,
      date
    };
    dispatch(deleteMonthExpanse(params, index));
  }

  const getDataObject = (index) => {
    return data[index];
  }

  const HeadersRow = () => {
    // column settings
    const gridTemplateColumns = `${editMode ? "80px" : ""}  100px 1fr 1fr 1fr 1fr 1fr 1fr`;

    return <HeaderRow gridTemplateColumns={gridTemplateColumns} /* style={{borderBottom: "1px solid rgba(0, 0, 0, 0.22)"}} */>

      {editMode ? <HeaderCell>{"פעולות"}</HeaderCell> : null}
      <HeaderCell>{"שורה"}</HeaderCell>
      <HeaderCell>{`קוד הנהח"ש`}</HeaderCell>
      <HeaderCell>{"שם חשבון"}</HeaderCell>
      <HeaderCell>{"מקושר לסעיף מסכם..."}</HeaderCell>
      <HeaderCell editMode={editMode}>{"ספק"}</HeaderCell>
      <HeaderCell editMode={editMode}>{"סכום"}</HeaderCell>
      <HeaderCell editMode={editMode}>{"הערות"}</HeaderCell>
    </HeaderRow>
  }

  const Row = (index) => {
    // row data
    const rowData = getDataObject(index);
    // column settings
    const gridTemplateColumns = `${editMode ? "80px" : ""}  100px 1fr 1fr 1fr 1fr 1fr 1fr`;

    return <TableRow key={index} gridTemplateColumns={gridTemplateColumns}>
      {editMode ? <TableActions deleteHandler={() => deleteExpanseHandler(rowData.id, index)} /> : null}

      <Cell>{index + 1}</Cell>

      <Cell>{rowData["code"]}</Cell>
      <Cell>{rowData["codeName"]}</Cell>
      <Cell>{rowData["section"]}</Cell>

      {editMode ? textAreaInput("supplierName", rowData["supplierName"], index, onBlurHandler) : <Cell>{rowData["supplierName"]}</Cell>}
      {editMode ? numberInput("sum", rowData["sum"], index, onBlurHandler) : <NonZeroCell>{rowData["sum"]}</NonZeroCell>}
      {editMode ? textAreaInput("notes", rowData["notes"], index, onBlurHandler) : <Cell style={{ paddingLeft: "10px" }}>{rowData["notes"]}</Cell>}
    </TableRow>
  }

  if (generalSettings.isFetching) {
    return <AlignCenterMiddle><Spinner loadingText={"טוען הגדרות טבלת מעקב הוצאות חודשיות..."} /></AlignCenterMiddle>;
  }

  return (
    <TableSection
      bgColor={getBuildingColor(buildingId)}
      header={
        <TableControls
          rightPane={
            <EditControls
              editMode={editMode}
              toggleEditMode={toggleEditMode}
              addNewMode={addNewMode}
              toggleAddNewMode={toggleAddNewMode}
              dataExist={data.length > 0}
            />
          } // end rightPane
          middlePane={
            <MonthExpansesDatePicker
              date={date}
              buildingId={buildingId}

            />

          } // end middlePane
          editMode={editMode}
          leftPane={
            <PageControls
              excel={{
                data,
                fileName: Helper.getMonthExpansesFilename(buildingName, date),
                buildingName,
                buildingId,
                date
              }}
              print={{
                pageName
              }}
              pageName={pageName}
              dataExist={data.length > 0}
            />
          } // end leftPane
        /> //end TableControls
      }
    >
      {/* add new box */}
      <AddNewContainer
        data={data}
        submitData={addNewExpanseSubmit}
        findData={findExpanseIndex}
        show={addNewMode}
      />

      <Table
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

}

export default MonthExpansesTableContainer;