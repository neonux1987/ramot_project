// LIBRARIES
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import {
  fetchSummarizedSections,
  addSummarizedSection,
  updateSummarizedSection,
  summarizedSectionsCleanup,
  deleteSummarizedSection
} from '../../../../redux/actions/summarizedSectionsActions';

// COMPONENTS
import EditControls from '../../../../components/EditControls/EditControls';
import SelectDropDown from '../../../../components/SelectDropDown/SelectDropDown';
import TableActions from '../../../../components/table/TableActions/TableActions';
import TableControls from '../../../../components/table/TableControls/TableControls';
import TableWrapper from '../../../../components/table/TableWrapper/TableWrapper';
import Column from '../../../../components/table/Column';
import HeaderRow from '../../../../components/table/HeaderRow';
import GroupRow from '../../../../components/table/GroupRow';
import Row from '../../../../components/table/Row';
import Table from '../../../../components/table/Table';
import GroupColumn from '../../../../components/table/GroupColumn';

// HOC
import withFormFunctionality from '../../../../HOC/withFormFunctionality';
import withTableLogic from '../../../../HOC/withTableLogic';

// CONTAINERS
//import AddExpanseCode from './AddExpanseCode/AddExpanseCode';
import { toast } from 'react-toastify';

// CUSTOM HOOKS
import useModalLogic from '../../../../customHooks/useModalLogic';
import AddSummarizedSectionContainer from './AddSummarizedSectionContainer/AddSummarizedSectionContainer';
import { myToasts } from '../../../../CustomToasts/myToasts';

const EDITMODE_TEMPLATE = "minmax(250px,5%) minmax(250px,5%) 1fr";
const DEFAULT_TEMPLATE = "minmax(250px,5%) 1fr";

const SummarizedSectionsTableContainer = props => {

  const {
    editMode,
    toggleEditMode,
    addNewMode,
    toggleAddNewMode,
    textInput
  } = props;

  // page data
  const {
    isFetching,
    data
  } = useSelector(store => store.summarizedSections);

  const { showModal } = useModalLogic();
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchSummarizedSections("active"));

    const cleanup = () => {
      dispatch(summarizedSectionsCleanup());
    }

    return cleanup;
  }, [dispatch]);



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

    if (!valid)
      myToasts.error(message);

    return valid;
  }

  const onBlurAction = (name, value, index) => {
    const oldCopy = { ...data[index] };
    const newCopy = { ...oldCopy };

    // set the new value
    newCopy[name] = value;

    dispatch(updateSummarizedSection(newCopy, oldCopy, index));
  }

  const addNewSubmitHandler = (formInputs) => {
    const valid = validateFormInputs(formInputs);

    if (!valid) {
      myToasts.error("חובה לבחור סעיף!");
      return;
    }

    const exist = dataExist(formInputs.section);
    if (exist) {
      myToasts.error("הסעיף כבר קיים ברשימה, לא ניתן להוסיף סעיף שקיים.");
      return;
    }

    const summarizedSection = {
      section: formInputs.section
    };

    dispatch(addSummarizedSection({ summarizedSection }));
  }

  const validateFormInputs = (formInputs) => {
    if (formInputs.section === "")
      return false;
    else
      return true;
  }

  const dataExist = (id, section) => {
    let valid = false;

    data.forEach(item => {
      if (item.section === section && item.id !== id) {
        valid = true;
      }
    });

    return valid;
  }

  const deleteHandler = (rowData, index) => {
    const expanseCodeCopy = { ...rowData };
    dispatch(deleteSummarizedSection(expanseCodeCopy, index));
  }

  const getGridTemplateColumns = () => {
    return editMode ? EDITMODE_TEMPLATE : DEFAULT_TEMPLATE;
  }

  const getDataObject = (index) => {
    return data[index];
  }

  const HeadersRow = () => {
    return <HeaderRow gridTemplateColumns={getGridTemplateColumns()} >

      {editMode ? <Column style={defaultheaderStyle}>{"פעולות"}</Column> : null}
      <Column style={defaultheaderStyle}>{"שורה"}</Column>
      <Column style={defaultheaderStyle}>{"סעיף מסכם"}</Column>
    </HeaderRow>
  }

  const TableRow = (index) => {
    // row data
    const rowData = getDataObject(index);

    return <Row style={{ minHeight: "35px" }} gridTemplateColumns={getGridTemplateColumns()}>
      {editMode ? <TableActions deleteHandler={() => deleteHandler(rowData, index)} /> : null}
      <Column>{index + 1}</Column>
      {editMode ? textInput("section", rowData["section"], index, onBlurHandler) : <Column>{rowData["section"]}</Column>}
    </Row>
  }

  //give the box a form functionality
  const WrappedAddNewBox = withFormFunctionality(AddSummarizedSectionContainer);

  //show or hide based of the add new mode status
  const renderAddNewSummarizedSection = addNewMode ? <WrappedAddNewBox submitHandler={addNewSubmitHandler} /> : null;

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
          />
        } // end rightPane
      /> {/* end TableControls */}

      {renderAddNewSummarizedSection}

      <Table
        Row={TableRow}
        HeaderComponent={HeadersRow}
        isFetching={isFetching || data.length === 0}
        itemCount={data.length}
      />

    </TableWrapper>
  );

}

const WrappedComponent = withTableLogic(SummarizedSectionsTableContainer);

export default React.memo(WrappedComponent, areEqual)

function areEqual(prevProps, nextProps) {
  if (
    prevProps.editMode === nextProps.editMode &&
    prevProps.addNewMode === nextProps.addNewMode
  ) return true;
  else return false;
}

const defaultheaderStyle = {
  backgroundColor: "#fbfbfb",
  color: "#000000",
  fontWeight: "600",
  justifyContent: "center",
  height: "32px",
  alignItems: "center"
};