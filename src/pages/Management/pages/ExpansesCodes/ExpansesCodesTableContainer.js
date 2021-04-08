// LIBRARIES
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '@material-ui/core';

// ACTIONS
import { fetchExpansesCodesByStatus, expansesCodesCleanup, updateExpanseCode, addExpanseCode, deleteExpanseCode } from '../../../../redux/actions/expansesCodesActions';
import { fetchSummarizedSections } from '../../../../redux/actions/summarizedSectionsActions';

// COMPONENTS
import EditControls from '../../../../components/EditControls/EditControls';
import SelectDropDown from '../../../../components/SelectDropDown/SelectDropDown';
import TableActions from '../../../../components/table/TableActions/TableActions';
import TableControls from '../../../../components/table/TableControls/TableControls';
import TableWrapper from '../../../../components/table/TableWrapper/TableWrapper';
import Column from '../../../../components/table/Column';
import HeaderRow from '../../../../components/table/HeaderRow';
import Row from '../../../../components/table/Row';
import Table from '../../../../components/table/Table';

// HOC
import withFormFunctionality from '../../../../HOC/withFormFunctionality';

// CONTAINERS
import AddExpanseCode from './AddExpanseCode/AddExpanseCode';
import { toastManager } from '../../../../toasts/toastManager';
import useTableLogic from '../../../../customHooks/useTableLogic';

const EDITMODE_TEMPLATE = "minmax(100px,5%) minmax(150px,5%) repeat(4,1fr)";
const DEFAULT_TEMPLATE = "minmax(150px,5%) repeat(4,1fr)";

const ExpansesCodes = () => {

  const {
    toggleEditMode,
    editMode,
    toggleAddNewMode,
    addNewMode,
    textInput,
    numberInput
  } = useTableLogic();

  const dispatch = useDispatch();

  const [sections, setSections] = useState([]);

  const [selectItems, setSelectItems] = useState([]);

  const expansesCodes = useSelector(store => store.expansesCodes);

  const summarizedSections = useSelector(store => store.summarizedSections);

  const {
    isFetching,
    data
  } = expansesCodes;

  const cleanup = useCallback(() => {
    dispatch(expansesCodesCleanup());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSummarizedSections("all")).then((result) => {
      const dataArr = [];

      const selectItems = result.data.map((row, index) => {
        if (row.status === "deleted") {
          row.section = `${row.section} (לא קיים)`;
        }
        dataArr[row.id] = row;
        return <MenuItem value={row.id} key={row.id}>{row.section}</MenuItem>;
      })

      setSections(dataArr);
      setSelectItems(selectItems);
    });
    //get the building month expanses
    dispatch(fetchExpansesCodesByStatus("active"));

    return cleanup;
  }, [dispatch, cleanup]);

  const onBlurSelectHandler = (name, value, index) => {
    onBlurAction(name, value, index);
  }

  const onBlurHandler = (event) => {
    const target = event.target;
    const { key, index } = target.dataset;
    const { value } = target;

    const rowData = getDataObject(index);

    const valid = validateOnBlur(key, rowData.id, value);

    if (!valid) {
      target.value = rowData[key];
      return;
    }

    onBlurAction(key, value, index);
  }

  const validateOnBlur = (key, expanseCodeId, value) => {
    let valid = true;
    let message = "";

    if (key === "code") {

      if (value.length < 1) {
        message = `קוד הנהח"ש לא יכול להיות פחות מ-1 ספרות`;
        valid = false;
      } else if (dataExist(expanseCodeId, value)) {
        message = `לא ניתן להוסיף קוד הנהח"ש שכבר קיים.`;
        valid = false;
      }

    }

    if (key === "codeName" && value.length < 1) {
      message = `שם חשבון לא יכול להיות פחות מ-1 תוים.`;
      valid = false;
    }

    if (!valid)
      toastManager.error(message);

    return valid;
  }

  const onBlurAction = (name, value, index) => {
    const oldCopy = { ...expansesCodes.data[index] };
    const newCopy = { ...oldCopy };

    // set the new value
    newCopy[name] = value;

    dispatch(updateExpanseCode(newCopy, oldCopy, index));
  }


  const getSection = (id) => {
    return sections[id];
  }

  const addNewSubmitHandler = (formInputs) => {
    const valid = validateFormInputs(formInputs);

    if (!valid) {
      toastManager.error("כל השדות לא יכולים להיות ריקים.");
      return;
    }

    const exist = dataExist(formInputs.code);
    if (exist) {
      toastManager.error("הקוד כבר קיים ברשימה, לא ניתן להוסיף את אותו הקוד.");
      return;
    }

    const expanseCode = parseFormInputs(formInputs);
    dispatch(addExpanseCode(expanseCode));
  }

  const parseFormInputs = (formInputs) => {
    const copyFormInputs = { ...formInputs };
    copyFormInputs.code = Number.parseInt(formInputs.code);
    return copyFormInputs;
  }

  const validateFormInputs = (formInputs) => {
    if (formInputs.code === "" || formInputs.codeName === "" || formInputs.summarized_section_id === "") {
      return false;
    }
    return true;
  }

  const dataExist = (id, code) => {
    let valid = false;
    const parsedCode = Number.parseInt(code);

    expansesCodes.data.forEach(item => {
      if (item.code === parsedCode && item.id !== id) {
        valid = true;
      }
    });

    return valid;
  }

  const deleteCodeExpanseHandler = (rowData, index) => {
    const expanseCodeCopy = { ...rowData };
    dispatch(deleteExpanseCode(expanseCodeCopy.id, expanseCodeCopy, index));
  }

  const getGridTemplateColumns = () => {
    return editMode ? EDITMODE_TEMPLATE : DEFAULT_TEMPLATE;
  }

  const getDataObject = (index) => {
    return expansesCodes.data[index];
  }

  const HeadersRow = () => {
    return <HeaderRow gridTemplateColumns={getGridTemplateColumns()}/*  style={{ backgroundColor: "#f5f6f9" }} */>

      {editMode ? <Column style={defaultheaderStyle}>{"פעולות"}</Column> : null}
      <Column style={defaultheaderStyle}>{"שורה"}</Column>
      <Column style={defaultheaderStyle}>{"קוד הנהח\"ש"}</Column>
      <Column style={defaultheaderStyle}>{"שם חשבון"}</Column>
      <Column style={defaultheaderStyle}>{"מקושר לסעיף מסכם..."}</Column>
      <Column style={defaultheaderStyle}>{`כולל מע"מ בביצוע`}</Column>
    </HeaderRow>
  }

  const TableRow = (index) => {
    // row data
    const rowData = getDataObject(index);
    // convert 1 or 0 (true or false) to text
    const with_vat = rowData.with_vat === 0 ? "לא" : "כן";

    const section = getSection(rowData["summarized_section_id"]);

    const odd = index % 2 === 0 ? "" : "";

    return <Row style={{ minHeight: "35px", backgroundColor: odd }} gridTemplateColumns={getGridTemplateColumns()}>
      {editMode ? <TableActions deleteHandler={() => deleteCodeExpanseHandler(rowData, index)} /> : null}
      <Column>{index + 1}</Column>
      {editMode ? numberInput("code", rowData["code"], index, onBlurHandler) : <Column>{rowData["code"]}</Column>}
      {editMode ? textInput("codeName", rowData["codeName"], index, onBlurHandler) : <Column>{rowData["codeName"]}</Column>}
      {editMode ?
        <SelectDropDown
          value={rowData["summarized_section_id"]}
          valueName={section.section}
          index={index}
          selectChangeHandler={onBlurSelectHandler}
          name={"summarized_section_id"}
        >{selectItems}</SelectDropDown> :
        <Column style={{ color: section.status === "deleted" ? "red" : "initial" }}>
          {section.section}
        </Column>}

      {editMode ?
        <SelectDropDown
          value={rowData.with_vat}
          valueName={rowData.with_vat === 0 ? "לא" : "כן"}
          index={index}
          selectChangeHandler={onBlurSelectHandler}
          name={"with_vat"}
        >{[
          <MenuItem value={0} key={0}>לא</MenuItem>,
          <MenuItem value={1} key={1}>כן</MenuItem>
        ]}</SelectDropDown> :
        <Column>{with_vat}</Column>}

    </Row>
  }

  //give the box a form functionality
  const WrappedAddNewBox = withFormFunctionality(AddExpanseCode);

  //show or hide based of the add new mode status
  const renderAddNewExpanse = addNewMode ? <WrappedAddNewBox submitHandler={addNewSubmitHandler} summarizedSections={summarizedSections.data} /> : null;

  return (
    <TableWrapper>

      <TableControls
        style={{ marginBottom: "7px" }}
        editMode={editMode}
        rightPane={
          <EditControls
            editMode={editMode}
            toggleEditMode={toggleEditMode}
            addNewMode={addNewMode}
            toggleAddNewMode={toggleAddNewMode}
            dataExist={data.length > 0}
          />
        } // end rightPane
      /> {/* end TableControls */}

      {renderAddNewExpanse}

      <Table
        Row={TableRow}
        HeaderComponent={HeadersRow}
        isFetching={isFetching || data.length === 0}
        totalCount={data.length}
      />

    </TableWrapper>
  );

}

export default React.memo(ExpansesCodes, areEqual);

function areEqual(prevProps, nextProps) {
  if (
    prevProps.editMode === nextProps.editMode &&
    prevProps.addNewMode === nextProps.addNewMode
  ) return true;
  else return false;
}

const defaultheaderStyle = {
  color: "#000000",
  fontWeight: "600",
  justifyContent: "center",
  height: "34px",
  alignItems: "center"
};