// LIBRARIES
import React from 'react';
import { connect } from 'react-redux';
import { MenuItem } from '@material-ui/core';

// ACTIONS
import summarizedSectionsActions from '../../../../redux/actions/summarizedSectionsActions';
import expansesCodesActions from '../../../../redux/actions/expansesCodesActions';

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
import AddExpanseCode from './AddExpanseCode/AddExpanseCode';
import { toast } from 'react-toastify';

const EDITMODE_TEMPLATE = "minmax(100px,5%) minmax(150px,5%) repeat(3,1fr)";
const DEFAULT_TEMPLATE = "minmax(150px,5%) repeat(3,1fr)";

class ExpansesCodes extends React.PureComponent {

  state = {
    sections: [],
    selectItems: []
  }

  componentDidMount() {
    this.props.fetchSummarizedSections().then((data) => {
      const dataArr = [];

      const selectItems = data.map((row, index) => {
        dataArr[row.id] = row.section;
        return <MenuItem value={row.id} key={row.id}>{row.section}</MenuItem>;
      })

      this.setState({ sections: dataArr, selectItems });
    });
    //get the building month expanses
    this.props.fetchExpansesCodes();
  }

  componentWillUnmount() {
    //on exit init table data
    this.props.receiveExpansesCodes([]);
  }

  onBlurSelectHandler = (name, value, index) => {
    this.onBlurAction(name, value, index);
  }

  onBlurHandler = (event) => {
    const target = event.target;
    const { key, index } = target.dataset;
    const { value } = target;

    const rowData = this.getDataObject(index);

    if (key === "code" && value.length < 1) {
      target.value = rowData[key];
      toast.error(`קוד הנהח"ש לא יכול להיות פחות מ-1 ספרות`);
      return;
    }

    if (key === "codeName" && value.length < 1) {
      target.value = rowData[key];
      toast.error(`שם חשבון לא יכול להיות פחות מ-1 תוים.`);
      return;
    }

    this.onBlurAction(key, value, index);
  }

  onBlurAction = (name, value, index) => {
    const copyData = { ...this.props.expansesCodes.data[index] };
    copyData[name] = value;
    const params = {
      id: copyData.id,
      data: {
        summarized_section_id: copyData.summarized_section_id,
        code: copyData.code,
        codeName: copyData.codeName
      }
    };
    //this.props.updateExpanseCode(params, copyData);
  }


  getSection = (id) => {
    return this.state.sections[id];
  }

  addNewSubmitHandler = (formInputs) => {
    const valid = this.validateFormInputs(formInputs);

    if (!valid) {
      console.log("קוד ושם חשבון לא יכולים להיות ריקים");
      return;
    }

    const exist = this.dataExist(formInputs.code, formInputs.codeName);
    if (exist) {
      console.log("קוד או שם חשבון כבר קיימים ברשימה.");
      return;
    }
    const params = this.parseFormInputs(formInputs);
    this.props.addExpanseCode(params);
  }

  parseFormInputs = (formInputs) => {
    const copyFormInputs = { ...formInputs };
    copyFormInputs.code = Number.parseInt(formInputs.code);
    return copyFormInputs;
  }

  validateFormInputs = (formInputs) => {
    if (formInputs.code === "" || formInputs.codeName === "") {
      return false;
    }
    return true;
  }

  dataExist = (code) => {
    let valid = false;
    const data = this.props.expansesCodes.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i].code === code) {
        valid = true;
      }
    }
    return valid;
  }

  getGridTemplateColumns = () => {
    return this.props.editMode ? EDITMODE_TEMPLATE : DEFAULT_TEMPLATE;
  }

  getDataObject = (index) => {
    return this.props.expansesCodes.data[index];
  }

  HeaderGroups = () => {
    return <GroupRow><GroupColumn></GroupColumn></GroupRow>
  }

  HeadersRow = () => {
    const editMode = this.props.editMode;

    return <HeaderRow gridTemplateColumns={this.getGridTemplateColumns()} >

      {editMode ? <Column style={defaultheaderStyle}>{"פעולות"}</Column> : null}
      <Column style={defaultheaderStyle}>{"שורה"}</Column>
      <Column style={defaultheaderStyle}>{"קוד הנהח\"ש"}</Column>
      <Column style={defaultheaderStyle}>{"שם חשבון"}</Column>
      <Column style={defaultheaderStyle}>{"מקושר לסעיף מסכם..."}</Column>
    </HeaderRow>
  }

  Row = (index) => {
    const {
      editMode,
      textInput,
      numberInput
    } = this.props;

    // row data
    const rowData = this.getDataObject(index);

    return <Row style={{ minHeight: "35px" }} gridTemplateColumns={this.getGridTemplateColumns()}>
      {editMode ? <TableActions deleteHandler={() => this.deleteExpanseHandler(rowData.id, index)} /> : null}
      <Column>{index + 1}</Column>
      {editMode ? numberInput("code", rowData["code"], index, this.onBlurHandler) : <Column>{rowData["code"]}</Column>}
      {editMode ? textInput("codeName", rowData["codeName"], index, this.onBlurHandler) : <Column>{rowData["codeName"]}</Column>}
      {editMode ?
        <SelectDropDown targetValue={rowData["summarized_section_id"]} rowNumber={index} itemsArr={this.state.selectItems} selectChangeHandler={this.onBlurSelectHandler} /> :
        <Column>{this.getSection(rowData["summarized_section_id"])}</Column>}
    </Row>
  }

  render() {
    const {
      editMode,
      toggleEditMode,
      addNewMode,
      toggleAddNewMode
    } = this.props;

    const {
      isFetching,
      data
    } = this.props.expansesCodes;

    //give the box a form functionality
    const WrappedAddNewBox = withFormFunctionality(AddExpanseCode);

    //show or hide based of the add new mode status
    const renderAddewExpanse = addNewMode ? <WrappedAddNewBox submitHandler={this.addNewSubmitHandler} summarizedSections={this.props.summarizedSections.data} /> : null;

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

        {renderAddewExpanse}

        <Table
          Row={this.Row}
          GroupComponent={this.HeaderGroups}
          HeaderComponent={this.HeadersRow}
          isFetching={isFetching || data.length === 0}
          itemCount={data.length}
        />

      </TableWrapper>
    );
  }

}

const mapStateToProps = state => ({
  expansesCodes: state.expansesCodes.expansesCodes,
  summarizedSections: state.summarizedSections.summarizedSections
});

const mapDispatchToProps = dispatch => ({
  fetchExpansesCodes: (payload) => dispatch(expansesCodesActions.fetchExpansesCodes(payload)),
  receiveExpansesCodes: (payload) => dispatch(expansesCodesActions.receiveExpansesCodes(payload)),
  updateExpanseCode: (payload, tableData) => dispatch(expansesCodesActions.updateExpanseCode(payload, tableData)),
  addExpanseCode: (payload, tableData) => dispatch(expansesCodesActions.addExpanseCode(payload, tableData)),
  fetchSummarizedSections: () => dispatch(summarizedSectionsActions.fetchSummarizedSections())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withTableLogic(ExpansesCodes)
);

const defaultheaderStyle = {
  backgroundColor: "rgb(232, 236, 241)",
  color: "#000000",
  fontWeight: "600",
  justifyContent: "center",
  height: "27px",
  alignItems: "center"
};