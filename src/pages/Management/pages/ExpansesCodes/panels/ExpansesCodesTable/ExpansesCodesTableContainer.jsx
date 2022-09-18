import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "@material-ui/core";
import {
  fetchExpansesCodesByStatus,
  expansesCodesCleanup,
  updateExpanseCode,
  deleteExpanseCode
} from "../../../../../../redux/actions/expansesCodesActions";
import { fetchSummarizedSections } from "../../../../../../redux/actions/summarizedSectionsActions";
import SelectDropDown from "../../../../../../components/SelectDropDown/SelectDropDown";
import TableActions from "../../../../../../components/table/TableActions/TableActions";
import Cell from "../../../../../../components/table/components/Cell";
import HeaderCell from "../../../../../../components/table/components/HeaderCell";
import HeaderRow from "../../../../../../components/table/components/HeaderRow";
import TableRow from "../../../../../../components/table/components/TableRow";
import TableContainer from "../../../../../../components/table/TableContainer";
import { toastManager } from "../../../../../../toasts/toastManager";
import useTableLogic from "../../../../../../customHooks/useTableLogic";
import TableSection from "../../../../../../components/Section/TableSection";
import SectionControlsContainer from "../../../../../../components/table/TableControls/SectionControlsContainer";
import AddExpanseCodeContainer from "./AddExpanseCode/AddExpanseCodeContainer";

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

  const expansesCodes = useSelector((store) => store.expansesCodes);

  const summarizedSections = useSelector((store) => store.summarizedSections);

  const { isFetching, data } = expansesCodes;

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
        return (
          <MenuItem value={row.id} key={row.id}>
            {row.section}
          </MenuItem>
        );
      });

      setSections(dataArr);
      setSelectItems(selectItems);
    });
    //get the building month expanses
    dispatch(fetchExpansesCodesByStatus("active"));

    return cleanup;
  }, [dispatch, cleanup]);

  const onBlurSelectHandler = (name, value, index) => {
    onBlurAction(name, value, index);
  };

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
  };

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

    if (!valid) toastManager.error(message);

    return valid;
  };

  const onBlurAction = (name, value, index) => {
    const oldCopy = { ...expansesCodes.data[index] };
    const newCopy = { ...oldCopy };

    // set the new value
    newCopy[name] = value;

    dispatch(updateExpanseCode(newCopy, oldCopy, index));
  };

  const getSection = (id) => {
    return sections[id];
  };

  const isDataExist = (code) => {
    let valid = false;
    const parsedCode = Number.parseInt(code);

    expansesCodes.data.forEach((item) => {
      if (item.code === parsedCode) {
        valid = true;
      }
    });

    return valid;
  };

  const deleteCodeExpanseHandler = (rowData, index) => {
    const expanseCodeCopy = { ...rowData };
    dispatch(deleteExpanseCode(expanseCodeCopy.id, expanseCodeCopy, index));
  };

  const getGridTemplateColumns = () => {
    return editMode ? EDITMODE_TEMPLATE : DEFAULT_TEMPLATE;
  };

  const getDataObject = (index) => {
    return expansesCodes.data[index];
  };

  const HeadersRow = () => {
    return (
      <HeaderRow gridTemplateColumns={getGridTemplateColumns()}>
        {editMode ? <HeaderCell>{"פעולות"}</HeaderCell> : null}
        <HeaderCell>{"שורה"}</HeaderCell>
        <HeaderCell>{'קוד הנהח"ש'}</HeaderCell>
        <HeaderCell>{"שם חשבון"}</HeaderCell>
        <HeaderCell>{"מקושר לסעיף מסכם..."}</HeaderCell>
        <HeaderCell>{`כולל מע"מ בביצוע`}</HeaderCell>
      </HeaderRow>
    );
  };

  const Row = (index) => {
    // row data
    const rowData = getDataObject(index);
    // convert 1 or 0 (true or false) to text
    const with_vat = rowData.with_vat === 0 ? "לא" : "כן";

    const section = getSection(rowData["summarized_section_id"]);

    const odd = index % 2 === 0 ? "" : "";

    return (
      <TableRow
        style={{ minHeight: "35px", backgroundColor: odd }}
        gridTemplateColumns={getGridTemplateColumns()}
      >
        {editMode ? (
          <TableActions
            deleteHandler={() => deleteCodeExpanseHandler(rowData, index)}
          />
        ) : null}
        <Cell>{index + 1}</Cell>
        {editMode ? (
          numberInput("code", rowData["code"], index, onBlurHandler)
        ) : (
          <Cell>{rowData["code"]}</Cell>
        )}
        {editMode ? (
          textInput("codeName", rowData["codeName"], index, onBlurHandler)
        ) : (
          <Cell>{rowData["codeName"]}</Cell>
        )}
        {editMode ? (
          <SelectDropDown
            value={rowData["summarized_section_id"]}
            valueName={section.section}
            index={index}
            selectChangeHandler={onBlurSelectHandler}
            name={"summarized_section_id"}
          >
            {selectItems}
          </SelectDropDown>
        ) : (
          <Cell
            style={{ color: section.status === "deleted" ? "red" : "initial" }}
          >
            {section.section}
          </Cell>
        )}

        {editMode ? (
          <SelectDropDown
            value={rowData.with_vat}
            valueName={rowData.with_vat === 0 ? "לא" : "כן"}
            index={index}
            selectChangeHandler={onBlurSelectHandler}
            name={"with_vat"}
          >
            {[
              <MenuItem value={0} key={0}>
                לא
              </MenuItem>,
              <MenuItem value={1} key={1}>
                כן
              </MenuItem>
            ]}
          </SelectDropDown>
        ) : (
          <Cell>{with_vat}</Cell>
        )}
      </TableRow>
    );
  };

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
          dataExist: summarizedSections.data.length === 0 ? false : true
        }}
        print={true}
        printProps={{
          pageName: "expansesCodes",
          dataExist
        }}
      />

      <AddExpanseCodeContainer
        summarizedSections={summarizedSections.data}
        show={addNewMode}
        dataExist={isDataExist}
      />

      <TableContainer
        Row={Row}
        HeaderComponent={HeadersRow}
        isFetching={isFetching}
        totalCount={data.length}
        printHeaderDetails={{
          pageTitle: "קודי הנהלת חשבונות"
        }}
        noDataText={
          summarizedSections.data.length === 0
            ? "לא ניתן להוסיף קודי הנהלת חשבונות מכיוון שלא קיימים סעיפים מסכמים"
            : "אין נתונים"
        }
      />
    </TableSection>
  );
};

export default React.memo(ExpansesCodes, areEqual);

function areEqual(prevProps, nextProps) {
  if (
    prevProps.editMode === nextProps.editMode &&
    prevProps.addNewMode === nextProps.addNewMode
  )
    return true;
  else return false;
}
