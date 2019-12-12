import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import summarizedSectionsActions from '../../../../../redux/actions/summarizedSectionsActions';
import expansesCodesActions from '../../../../../redux/actions/expansesCodesActions';
import SelectDropDown from '../../../../common/SelectDropDown/SelectDropDown';
import AddExpanseCode from './AddExpanseCode/AddExpanseCode';
import withFormFunctionality from '../../../../HOC/withFormFunctionality';
import EditControls from '../../../../common/EditControls/EditControls';
import { notify, notificationTypes } from '../../../../Notifications/Notification';
import { playSound, soundTypes } from '../../../../../audioPlayer/audioPlayer';
import TableActions from '../../../../common/table/TableActions/TableActions';
import ReactTableContainer from '../../../../common/table/ReactTableContainer/ReactTableContainer';
import Section from '../../../../common/Section/Section';
import TableControls from '../../../../common/table/TableControls/TableControls';
import TableWrapper from '../../../../common/table/TableWrapper/TableWrapper';
class ExpansesCodes extends Component {

  state = {
    editMode: false,
    addNewMode: false
  }

  componentDidMount() {
    this.props.fetchSummarizedSections();
    //get the building month expanses
    this.props.fetchExpansesCodes();
  }

  componentWillUnmount() {
    //on exit init table data
    this.props.receiveExpansesCodes([]);
  }

  cellSelectHandler = (fieldName, value, rowNumber) => {

    const copyData = [...this.props.expansesCodes.expansesCodes.data];
    copyData[rowNumber][fieldName] = value;
    const params = {
      id: copyData[rowNumber].id,
      data: {
        summarized_section_id: copyData[rowNumber].summarized_section_id,
        code: copyData[rowNumber].code,
        codeName: copyData[rowNumber].codeName
      }
    };
    this.props.updateExpanseCode(params, copyData);

  }

  cellText = (cellInfo) => {
    if (this.state.editMode) {
      return <input
        type={"text"}
        className="cellRender"
        defaultValue={cellInfo.value}
        onBlur={(event) => this.cellSelectHandler(cellInfo.column.id, event.target.value, cellInfo.index)}
        onClick={e => {
          e.target.select()
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            event.target.blur();
          }
        }}
      />
    }
    return cellInfo.value;
  }

  cellNumber = (cellInfo) => {
    if (this.state.editMode) {
      return <input
        type={"number"}
        className="cellRender"
        defaultValue={Number.parseInt(cellInfo.value)}
        onBlur={(event) => this.cellSelectHandler(cellInfo.column.id, event.target.value, cellInfo.index)}
        onClick={e => {
          e.target.select()
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            event.target.blur();
          }
        }}
      />
    }
    return cellInfo.value;
  }

  cellSelect = (cellInfo) => {
    if (this.state.editMode) {
      return <SelectDropDown targetValue={cellInfo.value} rowNumber={cellInfo.index} itemsArr={this.props.summarizedSections.summarizedSections.data} selectChangeHandler={this.cellSelectHandler} />;
    }
    const data = this.props.summarizedSections.summarizedSections.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === cellInfo.value) {
        return data[i].section;
      }
    }
  }

  toggleEditMode = () => {
    this.setState({
      ...this.state,
      editMode: !this.state.editMode
    }, () => {
      if (this.state.editMode) {
        notify({
          type: notificationTypes.message,
          message: "הופעל מצב עריכה"
        });
      } else {
        notify({
          type: notificationTypes.message,
          message: "מצב עריכה בוטל"
        });
      }
      playSound(soundTypes.message);
    });
  }

  toggleAddNewMode = () => {
    this.setState({
      ...this.state,
      addNewMode: !this.state.addNewMode
    })
  }

  generateHeaders() {

    const headerStyle = { background: "#000", color: "#fff" };

    return [
      {
        Header: "פעולות",
        width: 80,
        headerStyle: headerStyle,
        Cell: <TableActions />,
        show: this.state.editMode
      },
      {
        accessor: "id",
        Header: "ספרור",
        width: 100,
        headerStyle: headerStyle
      },
      {
        accessor: "code",
        Header: "קוד הנהח\"ש",
        headerStyle: headerStyle,
        Cell: this.cellNumber
      },
      {
        accessor: "codeName",
        Header: "שם חשבון",
        headerStyle: headerStyle,
        Cell: this.cellText
      },
      {
        accessor: "summarized_section_id",
        Header: "מקושר לסעיף מסכם...",
        headerStyle: headerStyle,
        Cell: this.cellSelect
      }
    ]

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
    const data = this.props.expansesCodes.expansesCodes.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i].code === code) {
        valid = true;
      }
    }
    return valid;
  }

  render() {
    const {
      expansesCodes,
      pageName
    } = this.props.expansesCodes;

    //give the box a form functionality
    const WrappedAddNewBox = withFormFunctionality(AddExpanseCode);
    //show or hide based of the add new mode status
    const renderAddewExpanse = this.state.addNewMode ? <WrappedAddNewBox submitHandler={this.addNewSubmitHandler} summarizedSections={this.props.summarizedSections.summarizedSections.data} /> : null;

    return (
      <Fragment>
        <Section>

          <TableWrapper>

            <TableControls
              rightPane={
                <EditControls
                  editMode={this.state.editMode}
                  toggleEditMode={this.toggleEditMode}
                  addNewMode={this.state.addNewMode}
                  toggleAddNewMode={this.toggleAddNewMode}
                />
              } // end rightPane
            /> {/* end TableControls */}

            {renderAddewExpanse}

            <ReactTableContainer
              loading={expansesCodes.isFetching}
              data={expansesCodes.data}
              columns={this.generateHeaders()}
              filterable
            /> {/* end ReactTableContainer */}

          </TableWrapper>

        </Section> {/* end Section */}

      </Fragment>
    );
  }

}

const mapStateToProps = state => ({
  expansesCodes: state.expansesCodes,
  summarizedSections: state.summarizedSections
});

const mapDispatchToProps = dispatch => ({
  fetchExpansesCodes: (payload) => dispatch(expansesCodesActions.fetchExpansesCodes(payload)),
  receiveExpansesCodes: (payload) => dispatch(expansesCodesActions.receiveExpansesCodes(payload)),
  updateExpanseCode: (payload, tableData) => dispatch(expansesCodesActions.updateExpanseCode(payload, tableData)),
  addExpanseCode: (payload, tableData) => dispatch(expansesCodesActions.addExpanseCode(payload, tableData)),
  fetchSummarizedSections: () => dispatch(summarizedSectionsActions.fetchSummarizedSections())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpansesCodes);