import React, { Component, Fragment } from 'react';
import InputExpansesField from '../common/InputExpansesField'
import ReactTable from 'react-table';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import summarizedSectionsActions from '../../redux/actions/summarizedSectionsActions';
import monthExpansesActions from '../../redux/actions/monthExpansesActions';
import dateActions from '../../redux/actions/dateActions';
import Helper from '../../helpers/Helper';
import Header from '../layout/main/Header';
import IOController from '../../controllers/IOController';
import LoadingCircle from '../common/LoadingCircle';
import PageControls from '../common/page_controls/PageControls';
import DatePicker from '../common/DatePicker';
import WithHeaderWrapper from '../HOC/WithHeaderWrapper';
import SummarizedSectionsController from '../../controllers/SummarizedSectionsController';

const styles = (theme) => ({
  loadingWrapper: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    color: "#000",
    fontSize: "34px",
    margin: "0 auto"
  },
  headerWrapper: {
    //background: "#fff",
    //border: "1px solid #eaeaea",
    borderRadius: "4px",
    //paddingTop: "10px",
    marginBottom: "20px"
  },
  headerTitleTextColor: {
    color: "rgb(17, 164, 220)"
  }
});

class MonthExpanses extends Component {

  constructor(props) {
    super(props);
    this.summarizedSectionsController = new SummarizedSectionsController();
    //services
    this.iOController = new IOController();
    //refs
    this.tableDiv = React.createRef();
    //state init
    this.state = {

    };
    //vars
    this._isMounted = false;
    //binds
    this.inputExpansesSubmit = this.inputExpansesSubmit.bind(this);
    this.findExpanse = this.findExpanse.bind(this);
    this.findExpanseIndex = this.findExpanseIndex.bind(this);
    this.loadExpansesByDate = this.loadExpansesByDate.bind(this);
  }

  componentDidMount() {
    //important params that allows to pull the current data by
    //building name, current month and year.
    let params = {
      buildingName: this.props.location.state.engLabel,
      date: Helper.getCurrentDate()
    }

    this.props.getSummarizedSections();

    //get the building month expanses
    this.props.fetchExpanses(params);
  }

  inputExpansesSubmit(formInputs, rowIndex, reset, isNew) {
    let valid = true;
    const { data } = this.props.monthExpanses.expanses;
    if (formInputs.code === "" || formInputs.codeName === "") {
      valid = false
    } else {
      if (!isNew) {
        //copy state data
        let copyData = [...data];

        copyData[rowIndex] = {
          ...copyData[rowIndex],
          ...formInputs,
          sum: formInputs.sum ? Number.parseFloat(formInputs.sum) : 0
        }

        //prepare the expanse object 
        let params = {
          expanse: copyData[rowIndex],
          buildingName: this.props.location.state.engLabel,
          date: {
            ...this.props.monthExpanses.date
          }
        };

        //add new expanse into the database
        this.props.updateExpanse(params, copyData);

      } else {

        //prepare the expanse object 
        let params = {
          expanse: formInputs,
          buildingName: this.props.location.state.engLabel,
          ...this.props.monthExpanses.date
        };


        //add new expanse into the database
        /* this.monthExpansesController.addExpanse(params, (result) => {
          //copy state data
          let copyData = [...this.state.data];
          copyData.push(result);
          this.setState(() => ({
            ...this.state,
            data: copyData
          }));
        }); */
      }
      //reset form state
      reset();
    }
    if (!valid) alert("קוד או שם חשבון לא יכולים להיות ריקים");
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.setCurrentDate();
  }

  /**
   * find an expanse by code or code name
   * @param {*} code the code to find the expanse with
   * @param {*} codeName the codeName to find the expanse with
   */
  findExpanse(code = null, codeName = null) {
    let result = null;
    this.state.data.forEach((row) => {
      if (row["code"] === Number.parseInt(code) || row["codeName"] === codeName) {
        result = row;
      }
    });
    return result;
  }

  findExpanseIndex(code = null, codeName = null) {
    let result = null;
    this.props.monthExpanses.expanses.data.forEach((row, index) => {
      if (row["code"] === Number.parseInt(code) || row["codeName"] === codeName) {
        result = index;
      }
    });
    return result;
  }

  loadExpansesByDate(month, year) {

    //important params that allows to pull the current data by
    //building name, current month and year.
    let params = {
      buildingName: this.props.location.state.engLabel,
      year: year,
      month: month
    }

    //get the building month expanses
    this.props.fetchExpanses(params);

  }

  generateHeaders() {

    return [
      {
        accessor: "expanses_code_id",
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
        accessor: "section",
        Header: "מקושר לסעיף",
        headerStyle: { background: "#000", color: "#fff" }
      },
      {
        accessor: "supplierName",
        Header: "שם הספק",
        headerStyle: { background: "#000", color: "#fff" }
      },
      {
        accessor: "sum",
        Header: "סכום",
        headerStyle: { background: "#000", color: "#fff" }
      },
      {
        accessor: "notes",
        Header: "הערות",
        headerStyle: { background: "#000", color: "#fff" }
      }
    ]

  }

  render() {
    const {
      date,
      expanses,
      pageName,
      headerTitle
    } = this.props.monthExpanses;
    const buildingName = this.props.location.state.parentLabel;
    if (expanses.status === "error") {
      alert(expanses.error)
    }

    return (
      <Fragment>

        <WithHeaderWrapper>
          <div style={{ paddingBottom: "10px" }}>
            <Header
              title={headerTitle}
              textColor={this.props.classes.headerTitleTextColor}
              subTitle={buildingName + " / " + date.monthHeb + " / " + date.year}
            />
            <PageControls
              excel={{
                data: expanses.data,
                fileName: Helper.getMonthExpansesFilename(buildingName, date)
              }}
              print={{
                title: headerTitle,
                pageTitle: headerTitle + " - " + buildingName
              }}
              pageName={pageName}
            />
            <DatePicker date={date} loadDataByDateHandler={this.loadExpansesByDate} enableMonth={true} enableYear={true} enableQuarter={false} />
          </div>
          <InputExpansesField summarizedSections={this.props.summarizedSections.tableData} data={expanses.data} submitData={this.inputExpansesSubmit} findData={this.findExpanseIndex} />
        </WithHeaderWrapper>

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
          getTdProps={(state, rowInfo, column) => {
            return {
              onClick: () => console.log("")
            }
          }}
          loadingText={"טוען..."}
          noDataText={"המידע לא נמצא"}
          loading={this.state.loadingData}
          LoadingComponent={LoadingCircle}
          defaultPageSize={50}
          showPagination={true}
          data={expanses.data}
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
  fetchExpanses: (payload) => dispatch(monthExpansesActions.fetchExpanses(payload)),
  updateExpanse: (payload, tableData) => dispatch(monthExpansesActions.updateExpanse(payload, tableData)),
  addExpanse: (payload, tableData) => dispatch(monthExpansesActions.addExpanse(payload, tableData)),
  setCurrentDate: (payload) => dispatch(dateActions.setCurrentDate(payload)),
  getSummarizedSections: () => dispatch(summarizedSectionsActions.getSummarizedSections())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MonthExpanses));