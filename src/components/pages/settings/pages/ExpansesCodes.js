import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import summarizedSectionsActions from '../../../../redux/actions/summarizedSectionsActions';
import expansesCodesActions from '../../../../redux/actions/expansesCodesActions';
import dateActions from '../../../../redux/actions/dateActions';
import LoadingCircle from '../../../common/LoadingCircle';
import SelectDropDown from '../../../common/SelectDropDown/SelectDropDown';
import { Button } from '@material-ui/core';

class ExpansesCodes extends Component {

  state = {
    editMode: false
  }

  componentDidMount() {
    this.props.fetchSummarizedSections();
    //get the building month expanses
    this.props.fetchExpansesCodes();
  }

  componentWillUnmount() {
    this.props.setCurrentDate();
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
    if (!this.state.editMode) {
      return cellInfo.value;
    }
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

  cellNumber = (cellInfo) => {
    if (!this.state.editMode) {
      return cellInfo.value;
    }
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

  cellSelect = (cellInfo) => {
    console.log();
    if (!this.state.editMode) {
      return this.props.summarizedSections.summarizedSections.data[cellInfo.value - 1].section;
    }
    return <SelectDropDown targetValue={cellInfo.value} rowNumber={cellInfo.index} itemsArr={this.props.summarizedSections.summarizedSections.data} selectChangeHandler={this.cellSelectHandler} />;
  }

  toggleEditMode = () => {
    this.setState({
      ...this.state,
      editMode: !this.state.editMode
    })
  }

  generateHeaders() {

    return [
      {
        accessor: "id",
        Header: "ספרור",
        width: 100,
        headerStyle: { background: "#000", color: "#fff" }
      },
      {
        accessor: "code",
        Header: "קוד הנהח\"ש",
        headerStyle: { background: "#000", color: "#fff" },
        Cell: this.cellNumber
      },
      {
        accessor: "codeName",
        Header: "שם חשבון",
        headerStyle: { background: "#000", color: "#fff" },
        Cell: this.cellText
      },
      {
        accessor: "summarized_section_id",
        Header: "מקושר לסעיף מסכם...",
        headerStyle: { background: "#000", color: "#fff" },
        Cell: this.cellSelect
      }
    ]

  }

  render() {
    const {
      expansesCodes,
      pageName
    } = this.props.expansesCodes;
    const buttonTitle = this.state.editMode ? "בטל מצב עריכה" : "הפעל מצב עריכה";
    return (
      <Fragment>

        <Button onClick={this.toggleEditMode} variant="contained" color="primary" >
          {buttonTitle}
        </Button>
        <br />

        <ReactTable
          id={pageName}
          className="-striped"
          style={{
            width: "100%",
            textAlign: "center",
            borderRadius: "4px",
            height: "700px", // This will force the table body to overflow and scroll, since there is not enough room
            marginTop: "10px"
          }}
          getTbodyProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                overflow: "overlay"
              }
            }
          }}
          loadingText={"טוען..."}
          noDataText={"לא נמצא מידע בבסיס נתונים."}
          loading={expansesCodes.isFetching}
          LoadingComponent={LoadingCircle}
          defaultPageSize={50}
          showPagination={true}
          data={expansesCodes.data}
          columns={this.generateHeaders()}
          resizable={true}
          minRows={0}
        />
      </Fragment>
    );
  }

}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  fetchExpansesCodes: (payload) => dispatch(expansesCodesActions.fetchExpansesCodes(payload)),
  receiveExpansesCodes: (payload) => dispatch(expansesCodesActions.receiveExpansesCodes(payload)),
  updateExpanseCode: (payload, tableData) => dispatch(expansesCodesActions.updateExpanseCode(payload, tableData)),
  addExpanseCode: (payload, tableData) => dispatch(expansesCodesActions.addExpanseCode(payload, tableData)),
  setCurrentDate: (payload) => dispatch(dateActions.setCurrentDate(payload)),
  fetchSummarizedSections: () => dispatch(summarizedSectionsActions.fetchSummarizedSections())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpansesCodes);