import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSummarizedSections,
  updateSummarizedSection,
  summarizedSectionsCleanup,
  deleteSummarizedSection
} from "../../../../redux/actions/summarizedSectionsActions";
import TableActions from "../../../../components/table/TableActions/TableActions";
import TableSection from "../../../../components/Section/TableSection";
import HeaderRow from "../../../../components/table/components/HeaderRow";
import TableRow from "../../../../components/table/components/TableRow";
import Cell from "../../../../components/table/components/Cell";
import HeaderCell from "../../../../components/table/components/HeaderCell";
import TableContainer from "../../../../components/table/TableContainer";
import AddSummarizedSectionContainer from "./AddSummarizedSection/AddSummarizedSectionContainer";
import { toastManager } from "../../../../toasts/toastManager";
import useTableLogic from "../../../../customHooks/useTableLogic";
import SectionControlsContainer from "../../../../components/table/TableControls/SectionControlsContainer";

const EDITMODE_TEMPLATE = "minmax(250px,5%) minmax(250px,5%) 1fr";
const DEFAULT_TEMPLATE = "minmax(250px,5%) 1fr";

const SummarizedSectionsTableContainer = () => {
  const { toggleEditMode, editMode, toggleAddNewMode, addNewMode, textInput } =
    useTableLogic();

  // page data
  const { isFetching, data } = useSelector((store) => store.summarizedSections);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSummarizedSections("active"));

    const cleanup = () => {
      dispatch(summarizedSectionsCleanup());
    };

    return cleanup;
  }, [dispatch]);

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

  const validateOnBlur = (key, summarizedSectionId, value) => {
    let valid = true;
    let message = "";

    if (key === "section") {
      if (value.length < 1) {
        message = `סעיף מסכם לא יכול להיות פחות מ- 1 תוים.`;
        valid = false;
      } else if (dataExist(summarizedSectionId, value)) {
        message = `לא ניתן להוסיף סעיף מסכם שכבר קים.`;
        valid = false;
      }
    }

    if (!valid) toastManager.error(message);

    return valid;
  };

  const onBlurAction = (name, value, index) => {
    const oldCopy = { ...data[index] };
    const newCopy = { ...oldCopy };

    // set the new value
    newCopy[name] = value;

    dispatch(updateSummarizedSection(newCopy, oldCopy, index));
  };

  const isDataExist = (id, section) => {
    let valid = false;

    data.forEach((item) => {
      if (item.section === section && item.id !== id) {
        valid = true;
      }
    });

    return valid;
  };

  const deleteHandler = (rowData, index) => {
    const expanseCodeCopy = { ...rowData };
    dispatch(deleteSummarizedSection(expanseCodeCopy, index));
  };

  const getGridTemplateColumns = () => {
    return editMode ? EDITMODE_TEMPLATE : DEFAULT_TEMPLATE;
  };

  const getDataObject = (index) => {
    return data[index];
  };

  const HeadersRow = () => {
    return (
      <HeaderRow gridTemplateColumns={getGridTemplateColumns()}>
        {editMode ? <HeaderCell>{"פעולות"}</HeaderCell> : null}
        <HeaderCell>{"שורה"}</HeaderCell>
        <HeaderCell>{"סעיף מסכם"}</HeaderCell>
      </HeaderRow>
    );
  };

  const Row = (index) => {
    // row data
    const rowData = getDataObject(index);

    const odd = index % 2 === 0 ? "" : "";

    return (
      <TableRow
        style={{ minHeight: "35px", backgroundColor: odd }}
        gridTemplateColumns={getGridTemplateColumns()}
      >
        {editMode ? (
          <TableActions deleteHandler={() => deleteHandler(rowData, index)} />
        ) : null}
        <Cell>{index + 1}</Cell>
        {editMode ? (
          textInput("section", rowData["section"], index, onBlurHandler)
        ) : (
          <Cell>{rowData["section"]}</Cell>
        )}
      </TableRow>
    );
  };

  const dataExist = data.length > 0;

  return (
    <TableSection>
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
          dataExist: true
        }}
        print={true}
        printProps={{
          pageName: "expansesCodes",
          dataExist
        }}
      />

      <AddSummarizedSectionContainer
        show={addNewMode}
        dataExist={isDataExist}
      />

      <TableContainer
        Row={Row}
        HeaderComponent={HeadersRow}
        isFetching={isFetching}
        totalCount={data.length}
        printHeaderDetails={{
          pageTitle: "סעיפים מסכמים"
        }}
        noDataText={"אין נתונים"}
      />
    </TableSection>
  );
};

export default React.memo(SummarizedSectionsTableContainer, areEqual);

function areEqual(prevProps, nextProps) {
  if (
    prevProps.editMode === nextProps.editMode &&
    prevProps.addNewMode === nextProps.addNewMode
  )
    return true;
  else return false;
}
