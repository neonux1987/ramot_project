// LIBRARIES
import React from 'react';
import HeaderCell from '../../../../components/table/components/HeaderCell';
import HeaderRow from '../../../../components/table/components/HeaderRow';

const BuildingsTablecontainer = () => {

  const {
    toggleEditMode,
    editMode,
    toggleAddNewMode,
    addNewMode
  } = useTableLogic();

  const dispatch = useDispatch();

  const HeadersRow = () => {
    return <HeaderRow>
      <HeaderCell>{"פעולות"}</HeaderCell>
      <HeaderCell>{"שם בניין"}</HeaderCell>
      <HeaderCell>{"שם בניין באנגלית"}</HeaderCell>
      <HeaderCell>{"פעיל"}</HeaderCell>
    </HeaderRow>
  }

  const Row = (index) => {

    return <TableRow style={{ minHeight: "35px", backgroundColor: odd }} gridTemplateColumns={getGridTemplateColumns()}>
      <Cell>פעולות</Cell>
      <Cell>כן</Cell>
      <Cell>שם בניין</Cell>
      <Cell>שם בניין באנגלית</Cell>
      <Cell>כן</Cell>
    </TableRow>
  }

  //give the box a form functionality
  const WrappedAddNewBox = withFormFunctionality(AddExpanseCode);

  return (
    <TableSection
      header={
        <TableControls
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
        /> //end TableControls
      }
    >
      <WrappedAddNewBox submitHandler={addNewSubmitHandler} summarizedSections={summarizedSections.data} show={addNewMode} />

      <Table
        Row={Row}
        HeaderComponent={HeadersRow}
        isFetching={isFetching || data.length === 0}
        totalCount={data.length}
      />

    </TableSection>
  );

}

export default React.memo(BuildingsTablecontainer, areEqual);