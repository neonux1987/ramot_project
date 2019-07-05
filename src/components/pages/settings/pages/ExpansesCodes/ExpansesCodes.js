import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import summarizedSectionsActions from '../../../../../redux/actions/summarizedSectionsActions';
import expansesCodesActions from '../../../../../redux/actions/expansesCodesActions';
import dateActions from '../../../../../redux/actions/dateActions';
import LoadingCircle from '../../../../common/LoadingCircle';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

class ExpansesCodes extends Component {

  state = {
    selectRender: [

    ]
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

  cellSelectHandler = (event, rowNumber) => {

    const copyData = [...this.props.expansesCodes.expansesCodes.data];
    copyData[rowNumber].summarized_section_id = event.target;
    //this.props.updateExpansesCode()

  }

  cellSelect = (cellInfo, selectDataRender) => {
    return <FormControl >
      <InputLabel htmlFor="age-helper">בחר סעיף מסכם:</InputLabel>
      <Select
        name="summarized_section_id"
        value={cellInfo.value}
        onChange={(event) => this.cellSelectHandler(event, cellInfo.index)}
      >
        <MenuItem value="">
          <em></em>
        </MenuItem>
        {selectDataRender}
      </Select>
    </FormControl>;
  }

  generateHeaders() {

    let selectDataRender = null;
    const { summarizedSections } = this.props.summarizedSections;
    if (summarizedSections.status === "success") {
      selectDataRender = summarizedSections.data.map((summarizedSection) => {
        return <MenuItem value={summarizedSection.id} key={summarizedSection.id}>{summarizedSection.section}</MenuItem>
      });
    }

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
        Header: "מקושר לסעיף מסכם...",
        headerStyle: { background: "#000", color: "#fff" },
        Cell: cellInfo => this.cellSelect(cellInfo, selectDataRender)
      }
    ]

  }

  render() {
    const {
      expansesCodes,
      pageName
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
  updateExpanseCode: (payload) => dispatch(expansesCodesActions.updateExpanseCode(payload)),
  addExpanseCode: (payload, tableData) => dispatch(expansesCodesActions.addExpanseCode(payload, tableData)),
  setCurrentDate: (payload) => dispatch(dateActions.setCurrentDate(payload)),
  fetchSummarizedSections: () => dispatch(summarizedSectionsActions.fetchSummarizedSections())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpansesCodes);