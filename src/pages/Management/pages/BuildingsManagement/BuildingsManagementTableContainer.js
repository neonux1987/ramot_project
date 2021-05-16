// LIBRARIES
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '@material-ui/core';

// ACTIONS
import { fetchBuildings, updateBuilding } from '../../../../redux/actions/buildingsActions';

// COMPONENTS
import EditControls from '../../../../components/EditControls/EditControls';
import SelectDropDown from '../../../../components/SelectDropDown/SelectDropDown';
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

  const getDataObject = useCallback((index) => {
    return data[index];
  }, [data]);

  const updateAction = useCallback((name, value, index) => {
    const rowData = getDataObject(index);
    const oldCopy = { ...rowData };

    const payload = {
      [name]: value
    }

    if (name === "buildingName")
      payload.path = value.replaceAll(" ", "-");

    dispatch(updateBuilding(rowData.buildingId, payload, oldCopy, index));
  }, [dispatch, getDataObject]);

  const deleteBuilding = useCallback((rowData, index) => {

  }, []);

  const isBuildingExist = useCallback(buildingName => {
    let exist = false;
    data.forEach(building => {
      if (building.buildingName === buildingName)
        exist = true;
    })
    return exist;
  }, [data]);

  const onBlurHandler = useCallback(event => {
    const target = event.target;
    const { index, key } = target.dataset;
    const { value } = target;

    updateAction(key, value, index);
  }, [updateAction]);

  const HeadersRow = () => {
    return <HeaderRow gridTemplateColumns={DEFAULT_TEMPLATE}>

      <HeaderCell>שורה</HeaderCell>
      <HeaderCell>מזהה</HeaderCell>
      <HeaderCell editMode={editMode}>שם בניין</HeaderCell>
      <HeaderCell>שם קודם</HeaderCell>
      <HeaderCell editMode={editMode}>מצב</HeaderCell>
    </HeaderRow>
  }

  const Row = (index) => {
    // row data
    const rowData = getDataObject(index);

    return <TableRow gridTemplateColumns={DEFAULT_TEMPLATE}>

      <Cell>{index + 1}</Cell>
      <Cell>{rowData.buildingId}</Cell>
      {editMode ? textInput("buildingName", rowData.buildingName, index, onBlurHandler) : <Cell>{rowData.buildingName}</Cell>}

      <Cell>{rowData.previousBuildingName}</Cell>

      {editMode ?
        <SelectDropDown
          value={rowData.status}
          valueName={rowData.status}
          index={index}
          selectChangeHandler={updateAction}
          name={"status"}
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

      <AddNewBuildingContainer show={addNewMode} isBuildingExist={isBuildingExist} />

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