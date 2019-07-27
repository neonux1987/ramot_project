import React, { Component, Fragment } from 'react';
import InputExpansesField from './InputExpansesField'
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import summarizedSectionsActions from '../../../redux/actions/summarizedSectionsActions';
import monthExpansesActions from '../../../redux/actions/monthExpansesActions';
import notificationsActions from '../../../redux/actions/notificationsActions';
import dateActions from '../../../redux/actions/dateActions';
import Helper from '../../../helpers/Helper';
import Header from '../../layout/main/Header';
import LoadingCircle from '../../common/LoadingCircle';
import PageControls from '../../common/PageControls/PageControls';
import DatePicker from '../../common/DatePicker/DatePicker';
import WithHeaderWrapper from '../../HOC/WithHeaderWrapper';
import EditControls from '../../common/EditControls/EditControls';

const FIXED_FLOAT = 2;

class MonthExpanses extends Component {

  constructor(props) {
    super(props);
    //state init
    this.state = {
      months: [
        {
          id: 1,
          month: "may",
          monthHeb: "מאי"
        },
        {
          id: 2,
          month: "june",
          monthHeb: "יוני"
        },
        {
          id: 3,
          month: "july",
          monthHeb: "יולי"
        }
      ],
      years: [
        {
          id: 1,
          year: 2017
        },
        {
          id: 2,
          year: 2018
        },
        {
          id: 3,
          year: 2019
        }
      ]
    };
    //binds
    this.inputExpansesSubmit = this.inputExpansesSubmit.bind(this);
    this.findExpanseIndex = this.findExpanseIndex.bind(this);
    this.loadExpansesByDate = this.loadExpansesByDate.bind(this);
  }

  componentDidMount() {
    //important params that allows to pull the current data by
    //building name, current month and year.
    let params = {
      buildingName: this.props.location.state.buildingNameEng,
      date: Helper.getCurrentDate()
    }

    this.props.fetchSummarizedSections();

    //get the building month expanses
    this.props.fetchExpanses(params);

  }

  inputExpansesSubmit(formInputs, reset, isNew) {
    const { data } = this.props.monthExpanses.expanses;
    const valid = this.validateFormInputs(formInputs);
    if (!valid) {
      this.props.addNotification({
        isError: true,
        message: "קוד או שם חשבון לא יכולים להיות ריקים"
      });
      return;
    }

    if (!isNew) {
      //copy state data
      let copyData = [...data];
      //parse form inputs
      const parsedFormInputs = this.parseFormInputs(formInputs);

      //create a copy of the data
      copyData[formInputs.index] = {
        ...copyData[formInputs.index],
        ...parsedFormInputs,
        codeName: copyData[formInputs.index].codeName,//dont change the codeame field
        sum: parsedFormInputs.sum
      }

      //prepare the expanse object 
      let params = {
        expanse: copyData[formInputs.index],
        buildingName: this.props.location.state.buildingNameEng,
        date: {
          ...this.props.monthExpanses.date
        },
        tax: Number.parseFloat(this.props.generalSettings.generalSettings.data[0].tax)
      };
      //add new expanse into the database
      this.props.updateExpanse(params, copyData);

    } else {
      /*
              //prepare the expanse object 
              let params = {
                expanse: formInputs,
                buildingName: this.props.location.state.engLabel,
                ...this.props.monthExpanses.date
              };
      
      
              //add new expanse into the database
               this.monthExpansesController.addExpanse(params, (result) => {
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

  validateFormInputs(formInputs) {
    if (formInputs.code === "" || formInputs.codeName === "") {
      return false;
    }
    return true;
  }

  parseFormInputs(formInputs) {
    const copyFormInputs = { ...formInputs };
    //parse inputs
    copyFormInputs.code = Number.parseInt(copyFormInputs.code);
    copyFormInputs.sum = copyFormInputs.sum === "" ? 0 : Number.parseFloat(copyFormInputs.sum);
    copyFormInputs.summarized_section_id = Number.parseInt(copyFormInputs.summarized_section_id);

    return copyFormInputs;
  }

  componentWillUnmount() {
    this.props.setCurrentDate();
    //on exit init table data
    this.props.receiveExpanses([]);
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

  loadExpansesByDate({ month, year }) {
    const monthNum = Helper.convertEngToMonthNum(month);

    //important params that allows to pull the current data by
    //building name, current month and year.
    let params = {
      buildingName: this.props.location.state.buildingNameEng,
      date: {
        year: year,
        month: month,
        monthNum: monthNum,
        monthHeb: Helper.convertEngToHebMonth(month)
      }
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
        headerStyle: { background: "#000", color: "#fff" },
        Cell: (cellInfo) => cellInfo.value === 0 || cellInfo.value === undefined ? "" : cellInfo.value.toFixed(FIXED_FLOAT).replace(/[.,]00$/, "")
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
    const { summarizedSections } = this.props.summarizedSections;
    const buildingName = this.props.location.state.buildingName;
    return (
      <Fragment>

        <WithHeaderWrapper>
          <div style={{ paddingBottom: "10px" }}>
            <Header
              title={headerTitle}
              textColor={{ color: "rgb(17, 164, 220)" }}
              subTitle={buildingName + " / " + date.monthHeb + " / " + date.year}
            />
            <PageControls
              excel={{
                data: expanses.data,
                fileName: Helper.getMonthExpansesFilename(buildingName, date),
                sheetTitle: `שנה ${date.year} חודש ${date.monthHeb}`,
                header: `${buildingName} / הוצאות חודש ${date.monthHeb} / ${date.year}`,
              }}
              print={{
                title: headerTitle,
                pageTitle: headerTitle + " - " + buildingName
              }}
              pageName={pageName}
            />
            <DatePicker
              years={this.state.years}
              months={this.state.months}
              enableYear={true}
              enableMonth={true}
              enableQuarter={false}
              date={date}
              loadDataByDateHandler={this.loadExpansesByDate}
            />
          </div>
          <InputExpansesField summarizedSections={summarizedSections.data} data={expanses.data} submitData={this.inputExpansesSubmit} findData={this.findExpanseIndex} />
          <EditControls
            editMode={this.state.editMode}
            toggleEditMode={this.toggleEditMode}
            addNewMode={this.state.addNewMode}
            toggleAddNewMode={this.toggleAddNewMode}
          />
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
              //onClick: () => console.log("")
            }
          }}
          loadingText={"טוען..."}
          noDataText={"לא נמצא מידע בבסיס נתונים."}
          loading={expanses.isFetching}
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
  receiveExpanses: (payload) => dispatch(monthExpansesActions.receiveExpanses(payload)),
  updateExpanse: (payload, tableData) => dispatch(monthExpansesActions.updateExpanse(payload, tableData)),
  addExpanse: (payload, tableData) => dispatch(monthExpansesActions.addExpanse(payload, tableData)),
  setCurrentDate: (payload) => dispatch(dateActions.setCurrentDate(payload)),
  fetchSummarizedSections: () => dispatch(summarizedSectionsActions.fetchSummarizedSections()),
  addNotification: (notification) => dispatch(notificationsActions.addNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthExpanses);