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
import TableActions from '../../common/table/TableActions/TableActions';

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
        },
        {
          id: 4,
          month: "august",
          monthHeb: "אוגוסט"
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
        }
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
        monthHeb: Helper.convertEngToHebMonth(month),
        quarterEng: Helper.convertMonthNumToQuarterEng(monthNum),
        quarterHeb: Helper.getCurrentQuarterHeb(monthNum)
      }
    }

    //get the building month expanses
    this.props.fetchExpanses(params);

  }

  generateHeaders = () => {

    const headerStyle = { background: "#000", color: "#fff" };

    return [
      {
        Header: "פעולות",
        width: 80,
        headerStyle: headerStyle,
        Cell: (cellInfo) => <TableActions deleteHandler={() => this.deleteExpanseHandler(cellInfo.original.id)} />,
        show: this.state.editMode
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
          padding: 0,
          paddingLeft: "10px"
        }
      }
    ]

  }

  cellInputOnBlurHandler(e, cellInfo) {
    //copy data
    const data = [...this.props.monthExpanses.expanses.data];

    //find the index of the object in the array
    const objIndex = Helper.findObjIndexById(cellInfo.original.id, data);
    //replace the value
    data[objIndex][cellInfo.column.id] = e.target.type === "number" && e.target.value === "" ? 0 : e.target.value;
    //update the tax to the current one
    data[objIndex].tax = this.props.generalSettings.generalSettings.data[0].tax;

    //prepare the params
    let params = {
      expanse: { ...data[objIndex] },
      buildingName: this.props.location.state.buildingNameEng,
      date: {
        ...this.props.monthExpanses.date
      }
    };
    //update expanse
    this.props.updateExpanse(params, data);
    e.target.blur();
  }

  deleteExpanseHandler = (id) => {
    //copy data
    const data = [...this.props.monthExpanses.expanses.data];

    //find the index of the object in the array
    const objIndex = Helper.findObjIndexById(id, data);

    //remove from the array
    data.splice(objIndex, 1);

    //prepare the params
    let params = {
      id: id,
      buildingName: this.props.location.state.buildingNameEng
    };
    this.props.deleteExpanse(params, data);
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
    const { data } = this.props.monthExpanses.expanses;
    const newValue = cellInfo.value === 0 || cellInfo.value === undefined ? null : Number.parseFloat(cellInfo.value).toFixed(FIXED_FLOAT).replace(/[.,]00$/, "");
    if (!this.state.editMode) {
      return <span title={`כולל ${data[cellInfo.index].tax}% מע"מ`}>{newValue}</span>;
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
    }, () => {
      if (this.state.addNewMode) {
        notify({
          type: notificationTypes.message,
          message: "מצב הוסף חדש הופעל"
        });
      } else {
        notify({
          type: notificationTypes.message,
          message: "מצב הוסף חדש בוטל"
        });
      }
      playSound(soundTypes.message);
    });
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
          <EditControls
            editMode={this.state.editMode}
            toggleEditMode={this.toggleEditMode}
            addNewMode={this.state.addNewMode}
            toggleAddNewMode={this.toggleAddNewMode}
          />
          <InputExpansesField
            show={this.state.addNewMode}
            summarizedSections={summarizedSections.data}
            data={expanses.data}
            submitData={this.inputExpansesSubmit}
            findData={this.findExpanseIndex}
          />
        </WithHeaderWrapper>

        <ReactTableContainer
          id={pageName}
          className="-striped"
          style={{
            width: "100%",
            textAlign: "center",
            borderRadius: "4px",
            //height: "700px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
          getTbodyProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                overflow: "overlay",
                height: "590px"
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
  deleteExpanse: (payload, tableData) => dispatch(monthExpansesActions.deleteExpanse(payload, tableData)),
  setCurrentDate: (payload) => dispatch(dateActions.setCurrentDate(payload)),
  fetchSummarizedSections: () => dispatch(summarizedSectionsActions.fetchSummarizedSections()),
  addNotification: (notification) => dispatch(notificationsActions.addNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthExpanses);