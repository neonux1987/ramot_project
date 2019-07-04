import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import summarizedSectionsActions from '../../../../redux/actions/summarizedSectionsActions';
import expansesCodesActions from '../../../../redux/actions/expansesCodesActions';
import dateActions from '../../../../redux/actions/dateActions';
import Helper from '../../../../helpers/Helper';
import LoadingCircle from '../../../common/LoadingCircle';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

class ExpansesCodes extends Component {

  selectRender = [
    <div>asdsa</div>
  ]

  componentDidMount() {
    this.props.getSummarizedSections();
    //get the building month expanses
    this.props.fetchExpansesCodes();
  }

  componentWillUnmount() {
    this.props.setCurrentDate();
    //on exit init table data
    this.props.receiveExpansesCodes([]);
  }



  cellSelect = (cellInfo) => {



    return <FormControl >
      <InputLabel htmlFor="age-helper">בחר סעיף:</InputLabel>
      <Select
        name="summarized_section_id"
        value={5}
        onChange={() => {

        }}
      >
        <MenuItem value="">
          <em></em>
        </MenuItem>
        {this.selectRender}
      </Select>
    </FormControl>;
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
        headerStyle: { background: "#000", color: "#fff" }
      },
      {
        accessor: "codeName",
        Header: "שם חשבון",
        headerStyle: { background: "#000", color: "#fff" }
      },
      {
        accessor: "summarized_section_id",
        Header: "מקושר לסעיף...",
        headerStyle: { background: "#000", color: "#fff" },
        Cell: cellInfo => this.cellSelect(cellInfo)
      }
    ]

  }

  render() {
    const {
      date,
      expansesCodes,
      pageName,
      headerTitle
    } = this.props.expansesCodes;
    return (
      <Fragment>

        <ReactTable
          id={pageName}
          className="-striped"
          style={{
            width: "100%",
            textAlign: "center",
            borderRadius: "4px",
            height: "700px" // This will force the table body to overflow and scroll, since there is not enough room
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
  getSummarizedSections: () => dispatch(summarizedSectionsActions.getSummarizedSections())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpansesCodes);