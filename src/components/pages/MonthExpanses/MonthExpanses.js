import React, { Component, Fragment } from 'react';
import InputExpansesField from './InputExpansesField'
import ReactTableContainer from '../../common/table/ReactTableContainer';
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
import { notify, notificationTypes } from '../../Notifications/Notification';
import { playSound, soundTypes } from '../../../audioPlayer/audioPlayer';
import TableActions from '../../common/table/TableActions';

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
      ],
      editMode: false,
      addNewMode: false
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

      notify({
        isError: true,
        type: notificationTypes.validation,
        message: "קוד או שם חשבון לא יכולים להיות ריקים"
      });
      playSound(soundTypes.error);
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

    const headerStyle = { background: "#000", color: "#fff" };

    return [
      {
        Header: "פעולות",
        width: 60,
        headerStyle: headerStyle,
        Cell: <TableActions />
      },
      {
        accessor: "expanses_code_id",
        Header: "ספרור",
        width: 100,
        headerStyle: headerStyle
      },
      {
        accessor: "code",
        Header: "קוד הנהח\"ש",
        headerStyle: headerStyle
      },
      {
        accessor: "codeName",
        Header: "שם חשבון",
        headerStyle: headerStyle
      },
      {
        accessor: "section",
        Header: "מקושר לסעיף",
        headerStyle: headerStyle
      },
      {
        accessor: "supplierName",
        Header: "שם הספק",
        headerStyle: headerStyle,
        Cell: this.cellTextInput,
        style: {
          padding: 0
        }
      },
      {
        accessor: "sum",
        Header: "סכום",
        headerStyle: headerStyle,
        Cell: this.cellNumberInput,
        style: {
          padding: 0
        }
      },
      {
        accessor: "notes",
        Header: "הערות",
        headerStyle: headerStyle,
        Cell: this.cellTextAreaInput,
        style: {
          padding: 0
        }
      }
    ]

  }

  cellInputOnBlurHandler(e, cellInfo) {
    const data = [...this.props.monthExpanses.expanses.data];
    data[cellInfo.index][cellInfo.column.id] = e.target.type === "number" && e.target.value === "" ? 0 : e.target.value;
    let params = {
      expanse: Helper.findItemInArray(cellInfo.original.id, data),
      buildingName: this.props.location.state.buildingNameEng,
      date: {
        ...this.props.monthExpanses.date
      },
      tax: Number.parseFloat(this.props.generalSettings.generalSettings.data[0].tax)
    };
    this.props.updateExpanse(params, data);
    e.target.blur();
  }

  cellTextAreaInput = (cellInfo) => {
    if (!this.state.editMode) {
      return cellInfo.value;
    }
    return <textarea
      type="text"
      className="cellRender"
      defaultValue={cellInfo.value}
      onBlur={(event) => this.cellInputOnBlurHandler(event, cellInfo)}
      onClick={e => {
        e.target.select()
      }}
    />
  };


  cellTextInput = (cellInfo) => {
    if (!this.state.editMode) {
      return cellInfo.value;
    }
    return <input
      type="text"
      className="cellRender"
      defaultValue={cellInfo.value}
      onBlur={(event) => this.cellInputOnBlurHandler(event, cellInfo)}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          event.target.blur();
        }
      }}
      onClick={e => {
        e.target.select()
      }}
    />
  };

  cellNumberInput = (cellInfo) => {
    const newValue = cellInfo.value === 0 || cellInfo.value === undefined ? null : Number.parseFloat(cellInfo.value).toFixed(FIXED_FLOAT).replace(/[.,]00$/, "");
    if (!this.state.editMode) {
      return newValue;
    }
    return <input
      type="number"
      className="cellRender"
      defaultValue={newValue}
      onBlur={(event) => this.cellInputOnBlurHandler(event, cellInfo)}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          event.target.blur();
        }
      }}
      onClick={e => {
        e.target.select()
      }}
    />
  };

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
  };

  toggleAddNewMode = () => {
    this.setState({
      ...this.state,
      addNewMode: !this.state.addNewMode
    })
  };

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

        <ReactTableContainer
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
          loading={expanses.isFetching}
          LoadingComponent={LoadingCircle}
          defaultPageSize={50}
          showPagination={true}
          data={expanses.data}
          columns={this.generateHeaders()}
          resizable={true}
          minRows={0}
        //PaginationComponent={PaginationBar}
        />
      </Fragment>
    );
  }

}

const mapStateToProps = state => ({
  summarizedSections: state.summarizedSections,
  monthExpanses: state.monthExpanses,
  generalSettings: state.generalSettings
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