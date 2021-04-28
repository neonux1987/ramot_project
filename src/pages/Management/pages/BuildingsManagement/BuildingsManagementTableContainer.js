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
import Cell from '../../../../components/table/components/Cell';
import HeaderCell from '../../../../components/table/components/HeaderCell';
import HeaderRow from '../../../../components/table/components/HeaderRow';
import TableRow from '../../../../components/table/components/TableRow';
import Table from '../../../../components/table/Table';

// HOC
import withFormFunctionality from '../../../../HOC/withFormFunctionality';

// CONTAINERS

import { toastManager } from '../../../../toasts/toastManager';
import useTableLogic from '../../../../customHooks/useTableLogic';
import TableSection from '../../../../components/Section/TableSection';
import { fetchBuildings } from '../../../../redux/actions/buildingsActions';
import AddNewBuildingContainer from './AddNewBox/AddNewBuildingContainer';

const EDITMODE_TEMPLATE = "minmax(100px,5%) minmax(150px,5%) repeat(4,1fr)";
const DEFAULT_TEMPLATE = "minmax(150px,5%) repeat(4,1fr)";

const BuildingsManagementTableContainer = () => {

  const {
    toggleEditMode,
    editMode,
    toggleAddNewMode,
    addNewMode,
    textInput,
    numberInput
  } = useTableLogic();

  const dispatch = useDispatch();


  const { data, isFetching } = useSelector(store => store.buildings);
  console.log(data);
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

  const HeadersRow = () => {
    return <HeaderRow gridTemplateColumns={getGridTemplateColumns()}>

      <HeaderCell>asdsa</HeaderCell>
    </HeaderRow>
  }

  const Row = (index) => {
    // row data
    const rowData = getDataObject(index);

    return <TableRow>

      <Cell>asd</Cell>

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