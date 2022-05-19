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
import { showSavedNotification } from '../../../../redux/actions/savedNotificationActions';

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

  const updateAction = useCallback(async (name, value, index) => {
    const rowData = getDataObject(index);
    const oldCopy = { ...rowData };

    const payload = {
      [name]: value
    }

    if (name === "buildingName")
      payload.path = value.replaceAll(" ", "-");

    const result = await dispatch(updateBuilding(rowData.id, payload, oldCopy, index));
    if (result.success)
      dispatch(showSavedNotification());

  }, [dispatch, getDataObject]);

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
      <HeaderCell>קוד מזהה</HeaderCell>
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
      <Cell>{rowData.id}</Cell>
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
          <MenuItem value={"מוסתר"} key={"מוסתר"}>מוסתר</MenuItem>,
          <MenuItem value={"פעיל"} key={"פעיל"}>פעיל</MenuItem>,
          <MenuItem value={"מחוק"} key={"מחוק"}>מחוק</MenuItem>
        </SelectDropDown> :
        <Cell>{rowData.status}</Cell>}

    </TableRow>
  }

  return <TableSection
    header={
      <TableControls
        rightPane={
          <EditControls
            editMode={editMode}
            toggleEditMode={toggleEditMode}
            addNewMode={addNewMode}
            toggleAddNewMode={toggleAddNewMode}
            dataExist={true}
          />
        } // end rightPane

      /> //End TableControls 
    }
  >

    <AddNewBuildingContainer show={addNewMode} isBuildingExist={isBuildingExist} />

    <Table
      Row={Row}
      HeaderComponent={HeadersRow}
      isFetching={isFetching}
      totalCount={data.length}
      noDataText="לא קיימים בניינים במערכת"
    />

  </TableSection>;

}

export default React.memo(BuildingsManagementTableContainer);