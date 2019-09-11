import React, { Component, Fragment } from 'react';
import InputExpansesField from './InputExpansesField'
import ReactTableContainer from '../../common/table/ReactTableContainer';
import { connect } from 'react-redux';
import summarizedSectionsActions from '../../../redux/actions/summarizedSectionsActions';
import monthExpansesActions from '../../../redux/actions/monthExpansesActions';
import notificationsActions from '../../../redux/actions/notificationsActions';
import expansesCodesActions from '../../../redux/actions/expansesCodesActions';
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
        },
        {
          id: 5,
          month: "september",
          monthHeb: "ספטמבר"
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

    this.props.initState(this.props.location.state.buildingNameEng).then(() => {
      //get the building month expanses
      this.props.fetchExpanses(params, params.buildingName);
    });

    //fetch expnases codes
    this.props.fetchExpansesCodes(params);

    //fetch summarized sections
    this.props.fetchSummarizedSections();

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

    const copiedFormInputs = { ...formInputs };
    copiedFormInputs.code = copiedFormInputs.code.code;
    copiedFormInputs.codeName = copiedFormInputs.codeName.codeName;
    copiedFormInputs.expanses_code_id = formInputs.code.id;
    copiedFormInputs.year = this.props.monthExpanses.date.year;
    copiedFormInputs.month = this.props.monthExpanses.date.month;
    copiedFormInputs.tax = this.props.generalSettings.tax;

    //parse form inputs
    const parsedFormInputs = this.parseFormInputs(copiedFormInputs);

    const params = {
      buildingName: this.props.location.state.buildingNameEng,
      expanse: parsedFormInputs,
      date: {
        ...this.props.monthExpanses.date
      }
    }

    this.props.addExpanse(params, data, params.expanse);

    //reset form state
    reset();

  }

  validateFormInputs(formInputs) {
    if (!formInputs.code && !formInputs.codeName) {
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
    copyFormInputs.year = Number.parseInt(formInputs.year);
    copyFormInputs.tax = Number.parseFloat(formInputs.tax);

    return copyFormInputs;
  }

  componentWillUnmount() {
    this.props.setCurrentDate();
    //on exit init table data
    this.props.cleanup(this.props.location.state.buildingNameEng);
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
        Header: "ספרור",
        width: 100,
        Cell: (row) => {
          return <span>{row.viewIndex + 1}</span>;
        },
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
        headerStyle: headerStyle,
        filterMethod: Helper.reactTableFilterMethod
      },
      {
        accessor: "section",
        Header: "מקושר לסעיף",
        headerStyle: headerStyle,
        filterMethod: Helper.reactTableFilterMethod
      },
      {
        accessor: "supplierName",
        Header: "שם הספק",
        headerStyle: headerStyle,
        Cell: this.cellTextInput,
        filterMethod: Helper.reactTableFilterMethod,
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
        filterMethod: Helper.reactTableFilterMethod,
        style: {
          padding: 0,
          paddingLeft: "10px"
        }
      }
    ]

  }

  cellInputOnBlurHandler(e, cellInfo) {
    //the data
    const { data } = this.props.monthExpanses.expanses;

    //index of the expanse in the data array
    const index = cellInfo.index;
    //the name of the field in the expanse object
    const fieldName = cellInfo.column.id;

    const expanse = { ...data[index] };

    //replace the value
    expanse[fieldName] = e.target.type === "number" && e.target.value === "" ? 0 : e.target.value;

    //update the tax to the current one
    expanse.tax = this.props.generalSettings.tax;

    //prepare the params
    let params = {
      index: index,
      expanse: expanse,
      buildingName: this.props.location.state.buildingNameEng,
      date: {
        ...this.props.monthExpanses.date
      }
    };
    //update expanse
    this.props.updateExpanse(params, data, e.target, fieldName);
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
    const { data } = this.props.monthExpanses.pages[this.props.monthExpanses.pageIndex];
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
    //vars
    const {
      date,
      expanses,
      pageName,
      headerTitle,
      pages,
      pageIndex
    } = this.props.monthExpanses;
    //summarized sections data
    const { summarizedSections } = this.props.summarizedSections;
    //expanses codes data
    const { expansesCodes } = this.props.expansesCodes;
    //building names
    const { buildingName } = this.props.location.state;
    //add new month expanse box
    const addNewBox = this.state.addNewMode ? <InputExpansesField
      summarizedSections={summarizedSections.data}
      expansesCodes={expansesCodes.data}
      data={expanses.data}
      submitData={this.inputExpansesSubmit}
      findData={this.findExpanseIndex}
    /> : null; //console.log(pages);
    // console.log(pageIndex);
    if (pageIndex === -1 ||
      (!pages[pageIndex].isFetching && pages[pageIndex].status === "")) {
      return "loading";
    }

    return (
      <Fragment>
        <WithHeaderWrapper>
          <div style={{ paddingBottom: "10px" }}>
            <Header
              title={headerTitle}
              textColor={{ color: "rgb(30, 110, 193)" }}
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
          {addNewBox}
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
          //table body props, set the height of the table
          getTbodyProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                overflow: "overlay",
                height: "590px"
              }
            }
          }}
          //filter props set the filter inputs style
          getTheadFilterThProps={(state, rowInfo, column) => {
            return {
              style: {
                background: "#ffffff"
              }
            };
          }}
          loadingText={"טוען..."}
          noDataText={"לא נמצא מידע"}
          loading={pages[pageIndex].isFetching}
          LoadingComponent={LoadingCircle}
          defaultPageSize={100}
          showPagination={true}
          data={pages[pageIndex].data}
          columns={this.generateHeaders()}
          resizable={true}
          //minRows={0}
          filterable
          //PaginationComponent={PaginationBar}
          defaultSorted={[
            {
              id: "code",
              asc: true
            }
          ]}
        />
      </Fragment>
    );
  }

}

const mapStateToProps = state => ({
  summarizedSections: state.summarizedSections,
  monthExpanses: state.monthExpanses,
  generalSettings: { tax: state.generalSettings.generalSettings.data[0].tax },
  expansesCodes: state.expansesCodes
});

const mapDispatchToProps = dispatch => ({
  fetchExpanses: (payload, page) => dispatch(monthExpansesActions.fetchExpanses(payload, page)),
  cleanup: (buildingNameEng) => dispatch(monthExpansesActions.cleanup(buildingNameEng)),
  initState: (page) => dispatch(monthExpansesActions.initState(page)),
  updateExpanse: (payload, tableData, target, fieldName) => dispatch(monthExpansesActions.updateExpanse(payload, tableData, target, fieldName)),
  addExpanse: (payload, tableData, expanse) => dispatch(monthExpansesActions.addExpanse(payload, tableData, expanse)),
  deleteExpanse: (payload, tableData) => dispatch(monthExpansesActions.deleteExpanse(payload, tableData)),
  setCurrentDate: (payload) => dispatch(dateActions.setCurrentDate(payload)),
  fetchSummarizedSections: () => dispatch(summarizedSectionsActions.fetchSummarizedSections()),
  addNotification: (notification) => dispatch(notificationsActions.addNotification(notification)),
  fetchExpansesCodes: (payload) => dispatch(expansesCodesActions.fetchExpansesCodes(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthExpanses);