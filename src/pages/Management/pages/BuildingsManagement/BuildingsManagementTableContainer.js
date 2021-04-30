// LIBRARIES
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '@material-ui/core';

// ACTIONS
import { fetchBuildings, updateBuilding } from '../../../../redux/actions/buildingsActions';

// COMPONENTS
import EditControls from '../../../../components/EditControls/EditControls';
import SelectDropDown from '../../../../components/SelectDropDown/SelectDropDown';
import TableActions from '../../../../components/table/TableActions/TableActions';
import TableControls from '../../../../components/table/TableControls/TableControls';
import Cell from '../../../../components/table/components/Cell';
import HeaderCell from '../../../../components/table/components/HeaderCell';
import HeaderRow from '../../../../components/table/components/HeaderRow';
import TableRow from '../../../../components/table/components/TableRow';
import Table from '../../../../components/table/Table';
import TableSection from '../../../../components/Section/TableSection';

// HOOKS
import useTableLogic from '../../../../customHooks/useTableLogic';

// CONTAINERS
import AddNewBuildingContainer from './AddNewBox/AddNewBuildingContainer';

const EDITMODE_TEMPLATE = "minmax(100px,5%) minmax(150px,5%) repeat(4,1fr)";
const DEFAULT_TEMPLATE = "minmax(150px,5%) repeat(4,1fr)";

const BuildingsManagementTableContainer = () => {

  const {
    toggleEditMode,
    editMode,
    toggleAddNewMode,
    addNewMode,
    textInput
  } = useTableLogic();

  const dispatch = useDispatch();

  const { data, isFetching } = useSelector(store => store.buildings);

  useEffect(() => {
    //get the building month expanses
    dispatch(fetchBuildings());
  }, [dispatch]);

  const getGridTemplateColumns = () => {
    return editMode ? EDITMODE_TEMPLATE : DEFAULT_TEMPLATE;
  }

  const getDataObject = (index) => {
    return data[index];
  }

  const deleteBuilding = useCallback((rowData, index) => {

  }, []);

  const onBlurSelectHandler = useCallback(() => {

  }, []);

  const onBlurHandler = event => {
    const target = event.target;
    const { index } = target.dataset;
    const { value } = target;

    const rowData = getDataObject(index);
    const oldCopy = { ...rowData };

    const payload = {
      buildingName: value
    }
    dispatch(updateBuilding(rowData.id, payload, oldCopy));
  };

  const HeadersRow = () => {
    return <HeaderRow gridTemplateColumns={getGridTemplateColumns()}>

      {editMode ? <HeaderCell>פעולות</HeaderCell> : null}
      <HeaderCell>שורה</HeaderCell>
      <HeaderCell>מזהה</HeaderCell>
      <HeaderCell>שם בניין</HeaderCell>
      <HeaderCell>שם קודם</HeaderCell>
      <HeaderCell>מצב</HeaderCell>
    </HeaderRow>
  }

  const Row = (index) => {
    // row data
    const rowData = getDataObject(index);

    return <TableRow gridTemplateColumns={getGridTemplateColumns()}>

      {editMode ? <TableActions deleteHandler={() => deleteBuilding(rowData, index)} /> : null}
      <Cell>{index + 1}</Cell>
      <Cell>{rowData.id}</Cell>
      {editMode ? textInput("buildingName", rowData.buildingName, index, onBlurHandler) : <Cell>{rowData.buildingName}</Cell>}
      <Cell>{rowData.previousBuildingName}</Cell>

      {editMode ?
        <SelectDropDown
          value={rowData.status}
          valueName={rowData.status}
          index={index}
          selectChangeHandler={onBlurSelectHandler}
          name={"מצב"}
        >
          {[
            <MenuItem value={"מושבת"} key={"מושבת"}>מושבת</MenuItem>,
            <MenuItem value={"פעיל"} key={"פעיל"}>פעיל</MenuItem>,
            <MenuItem value={"מחוק"} key={"מחוק"}>מחוק</MenuItem>
          ]}
        </SelectDropDown> :
        <Cell>{rowData.status}</Cell>}

    </TableRow>
  }

  return (
    <TableSection
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

        /> //End TableControls 
      }
    >

      <AddNewBuildingContainer show={addNewMode} />

      <Table
        Row={Row}
        HeaderComponent={HeadersRow}
        isFetching={isFetching || data.length === 0}
        totalCount={data.length}
      />

    </TableSection>
  );

}

export default React.memo(BuildingsManagementTableContainer);