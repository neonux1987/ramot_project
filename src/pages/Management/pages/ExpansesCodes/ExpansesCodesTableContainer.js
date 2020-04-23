// LIBRARIES
import React from 'react';
import { connect } from 'react-redux';
import { MenuItem } from '@material-ui/core';

// ACTIONS
import * as summarizedSectionsActions from '../../../../redux/actions/summarizedSectionsActions';
import * as expansesCodesActions from '../../../../redux/actions/expansesCodesActions';

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

const EDITMODE_TEMPLATE = "minmax(100px,5%) minmax(150px,5%) repeat(4,1fr)";
const DEFAULT_TEMPLATE = "minmax(150px,5%) repeat(4,1fr)";

class ExpansesCodes extends React.PureComponent {

  state = {
    sections: [],
    selectItems: []
  }

  componentDidMount() {
    this.props.fetchSummarizedSections("all").then((data) => {
      const dataArr = [];

      const selectItems = data.map((row, index) => {
        if (row.status === "deleted") {
          row.section = `${row.section} (לא קיים)`;
        }
        dataArr[row.id] = row;
        return <MenuItem value={row.id} key={row.id}>{row.section}</MenuItem>;
      })

      this.setState({ sections: dataArr, selectItems });
    });
    //get the building month expanses
    this.props.fetchExpansesCodesByStatus("active");
  }

  componentWillUnmount() {
    //on exit init table data
    this.props.expansesCodesCleanup();
  }

  onBlurSelectHandler = (name, value, index) => {
    this.onBlurAction(name, value, index);
  }

  onBlurHandler = (event) => {
    const target = event.target;
    const { key, index } = target.dataset;
    const { value } = target;

    const rowData = this.getDataObject(index);

    const valid = this.validateOnBlur(key, rowData.id, value);

    if (!valid) {
      target.value = rowData[key];
      return;
    }

    this.onBlurAction(key, value, index);
  }

  validateOnBlur = (key, expanseCodeId, value) => {
    let valid = true;
    let message = "";

    if (key === "code") {

      if (value.length < 1) {
        message = `קוד הנהח"ש לא יכול להיות פחות מ-1 ספרות`;
        valid = false;
      } else if (this.dataExist(expanseCodeId, value)) {
        message = `לא ניתן להוסיף קוד הנהח"ש שכבר קיים.`;
        valid = false;
      }

    }

    if (key === "codeName" && value.length < 1) {
      message = `שם חשבון לא יכול להיות פחות מ-1 תוים.`;
      valid = false;
    }

    if (!valid)
      toast.error(message);

    return valid;
  }

  onBlurAction = (name, value, index) => {
    const oldCopy = { ...this.props.expansesCodes.data[index] };
    const newCopy = { ...oldCopy };

    // set the new value
    newCopy[name] = value;

    this.props.updateExpanseCode(newCopy, oldCopy, index);
  }


  getSection = (id) => {
    return this.state.sections[id];
  }

  addNewSubmitHandler = (formInputs) => {
    const valid = this.validateFormInputs(formInputs);

    if (!valid) {
      toast.error("כל השדות לא יכולים להיות ריקים.");
      return;
    }

    const exist = this.dataExist(formInputs.code);
    if (exist) {
      toast.error("הקוד כבר קיים ברשימה, לא ניתן להוסיף את אותו הקוד.");
      return;
    }

    const expanseCode = this.parseFormInputs(formInputs);
    this.props.addExpanseCode(expanseCode);
  }

  parseFormInputs = (formInputs) => {
    const copyFormInputs = { ...formInputs };
    copyFormInputs.code = Number.parseInt(formInputs.code);
    return copyFormInputs;
  }

  validateFormInputs = (formInputs) => {
    if (formInputs.code === "" || formInputs.codeName === "" || formInputs.summarized_section_id === "") {
      return false;
    }
    return true;
  }

  dataExist = (id, code) => {
    let valid = false;
    const parsedCode = Number.parseInt(code);

    this.props.expansesCodes.data.forEach(item => {
      if (item.code === parsedCode && item.id !== id) {
        valid = true;
      }
    });

    return valid;
  }

  deleteCodeExpanseHandler = (rowData, index) => {
    const expanseCodeCopy = { ...rowData };
    this.props.deleteExpanseCode(expanseCodeCopy.id, expanseCodeCopy, index);
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
      <Column style={defaultheaderStyle}>{`כולל מע"מ בביצוע`}</Column>
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
    // convert 1 or 0 (true or false) to text
    const with_vat = rowData.with_vat === 0 ? "לא" : "כן";

    const section = this.getSection(rowData["summarized_section_id"]);

    return <Row style={{ minHeight: "35px" }} gridTemplateColumns={this.getGridTemplateColumns()}>
      {editMode ? <TableActions deleteHandler={() => this.deleteCodeExpanseHandler(rowData, index)} /> : null}
      <Column>{index + 1}</Column>
      {editMode ? numberInput("code", rowData["code"], index, this.onBlurHandler) : <Column>{rowData["code"]}</Column>}
      {editMode ? textInput("codeName", rowData["codeName"], index, this.onBlurHandler) : <Column>{rowData["codeName"]}</Column>}
      {editMode ?
        <SelectDropDown
          targetValue={rowData["summarized_section_id"]}
          index={index}
          itemsArr={this.state.selectItems}
          selectChangeHandler={this.onBlurSelectHandler}
          name={"summarized_section_id"}
        /> :
        <Column style={{ color: section.status === "deleted" ? "red" : "initial" }}>
          {section.section}
        </Column>}

      {editMode ?
        <SelectDropDown
          targetValue={rowData.with_vat}
          index={index}
          itemsArr={[
            <MenuItem value={0} key={0}>לא</MenuItem>,
            <MenuItem value={1} key={1}>כן</MenuItem>
          ]}
          selectChangeHandler={this.onBlurSelectHandler}
          name={"with_vat"}
        /> :
        <Column>{with_vat}</Column>}

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
  expansesCodes: state.expansesCodes,
  summarizedSections: state.summarizedSections
});

const mapDispatchToProps = dispatch => ({
  fetchExpansesCodesByStatus: (status) => dispatch(expansesCodesActions.fetchExpansesCodesByStatus(status)),
  updateExpanseCode: (newCopy, oldCopy, index) => dispatch(expansesCodesActions.updateExpanseCode(newCopy, oldCopy, index)),
  addExpanseCode: (payload) => dispatch(expansesCodesActions.addExpanseCode(payload)),
  deleteExpanseCode: (id, oldCopy, index) => dispatch(expansesCodesActions.deleteExpanseCode(id, oldCopy, index)),
  expansesCodesCleanup: () => dispatch(expansesCodesActions.expansesCodesCleanup()),
  fetchSummarizedSections: (status) => dispatch(summarizedSectionsActions.fetchSummarizedSections(status))
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