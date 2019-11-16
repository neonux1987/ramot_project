import React, { Component, Fragment, useCallback } from 'react';
import InputExpansesField from './InputExpansesField'
import ReactTableContainer from '../../common/table/ReactTableContainer/ReactTableContainer';
import { connect } from 'react-redux';
import summarizedSectionsActions from '../../../redux/actions/summarizedSectionsActions';
import monthExpansesActions from '../../../redux/actions/monthExpansesActions';
import expansesCodesActions from '../../../redux/actions/expansesCodesActions';
import Helper from '../../../helpers/Helper';
import Header from '../../common/Header/Header';
import PageControls from '../../common/PageControls/PageControls';
import DatePicker from '../../common/DatePicker/DatePicker';
import TableControls from '../../common/table/TableControls/TableControls';
import EditControls from '../../common/EditControls/EditControls';
import { notify, notificationTypes } from '../../Notifications/Notification';
import { playSound, soundTypes } from '../../../audioPlayer/audioPlayer';
import TableActions from '../../common/table/TableActions/TableActions';
import Spinner from '../../common/Spinner/Spinner';
import { AlignCenterMiddle } from '../../common/AlignCenterMiddle/AlignCenterMiddle';
import RegisteredDatesFetcher from '../../dataFetchers/RegisteredDatesFetcher';
import Section from '../../common/Section/Section';
import TableWrapper from '../../common/table/TableWrapper/TableWrapper';
import { NumberInput, TextInput, TextAreaInput, DefaultCell } from '../../common/table/TableCell/TableCellTypes';

const FIXED_FLOAT = 2;

class MonthExpanses extends Component {

  constructor(props) {
    super(props);
    //state init
    this.state = {
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
    const { data, date } = this.props.monthExpanses.pages[this.props.monthExpanses.pageIndex];
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
    copiedFormInputs.year = date.year;
    copiedFormInputs.month = date.month;
    copiedFormInputs.tax = this.props.generalSettings.tax;

    //parse form inputs
    const parsedFormInputs = this.parseFormInputs(copiedFormInputs);

    const params = {
      buildingName: this.props.location.state.buildingNameEng,
      expanse: parsedFormInputs,
      date: date
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

    const headerStyle = { background: "rgb(52, 58, 64)", color: "#fff", fontWeight: "600" };

    return [
      {
        Header: "פעולות",
        width: 80,
        headerStyle: headerStyle,
        Cell: (cellInfo) => <TableActions deleteHandler={() => this.deleteExpanseHandler(cellInfo.original.id, cellInfo.index)} />,
        show: this.state.editMode
      },
      {
        Header: "ספרור",
        width: 100,
        Cell: (cellInfo) => <DefaultCell defaultValue={cellInfo.viewIndex + 1} />,
        headerStyle: headerStyle
      },
      {
        accessor: "code",
        Header: "קוד הנהח\"ש",
        headerStyle: headerStyle,
        Cell: (cellInfo) => <DefaultCell defaultValue={cellInfo.value} />,
      },
      {
        accessor: "codeName",
        Header: "שם חשבון",
        headerStyle: headerStyle,
        filterMethod: Helper.reactTableFilterMethod,
        Cell: (cellInfo) => <DefaultCell defaultValue={cellInfo.value} />,
      },
      {
        accessor: "section",
        Header: "מקושר לסעיף",
        headerStyle: headerStyle,
        filterMethod: Helper.reactTableFilterMethod,
        Cell: (cellInfo) => <DefaultCell defaultValue={cellInfo.value} />,
      },
      {
        accessor: "supplierName",
        Header: "שם הספק",
        headerStyle: headerStyle,
        Cell: this.textInput,
        filterMethod: Helper.reactTableFilterMethod,
        style: {
          padding: 0
        }
      },
      {
        accessor: "sum",
        Header: "סכום",
        headerStyle: headerStyle,
        Cell: this.numberInput,
        style: {
          padding: 0
        }
      },
      {
        accessor: "notes",
        Header: "הערות",
        headerStyle: headerStyle,
        Cell: this.textAreaInput,
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
    const { data, date } = this.props.monthExpanses.pages[this.props.monthExpanses.pageIndex];

    //index of the expanse in the data array
    const index = cellInfo.index;
    //the name of the field in the expanse object
    const fieldName = cellInfo.column.id;

    //will be used for rollback
    const oldExpanseCopy = { ...data[index] };

    const expanse = { ...oldExpanseCopy };

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
        ...date
      }
    };
    //update expanse
    this.props.updateExpanse(params, data, e.target, fieldName);
    e.target.blur();
  }

  deleteExpanseHandler = (id, index) => {
    //copy data
    const { data, date } = { ...this.props.monthExpanses.pages[this.props.monthExpanses.pageIndex] };

    //remove from the array
    data.splice(index, 1);

    //prepare the params
    let params = {
      id: id,
      buildingName: this.props.location.state.buildingNameEng,
      date: date
    };
    this.props.deleteExpanse(params, data);
    this.toggleEditMode();
    this.toggleEditMode();
  }

  inputClickHandler = (e) => {
    e.target.select();
  }

  onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  textAreaInput = (cellInfo) => {
    if (!this.state.editMode) {
      return <DefaultCell defaultValue={cellInfo.value} />
    }
    return <TextAreaInput
      defaultValue={cellInfo.value}
      onBlurHandler={(event) => this.cellInputOnBlurHandler(event, cellInfo)}
      onClickHandler={this.inputClickHandler}
    />
  };


  textInput = (cellInfo) => {
    if (!this.state.editMode) {
      return <DefaultCell defaultValue={cellInfo.value} />
    }
    return <TextInput
      defaultValue={cellInfo.value}
      onBlurHandler={(event) => this.cellInputOnBlurHandler(event, cellInfo)}
      onKeyPressHandler={this.onKeyPressHandler}
      onClickHandler={this.inputClickHandler}
    />
  };

  numberInput = (cellInfo) => {
    const { data } = this.props.monthExpanses.pages[this.props.monthExpanses.pageIndex];
    const newValue = cellInfo.value === 0 || cellInfo.value === undefined ? null : Number.parseFloat(cellInfo.value).toFixed(FIXED_FLOAT).replace(/[.,]00$/, "");
    if (!this.state.editMode) {
      return <DefaultCell title={`כולל ${data[cellInfo.index].tax}% מע"מ`} defaultValue={newValue} />;
    }
    return <NumberInput
      type="number"
      defaultValue={newValue}
      onBlurHandler={(event) => this.cellInputOnBlurHandler(event, cellInfo)}
      onKeyPressHandler={this.onKeyPressHandler}
      onClickHandler={this.inputClickHandler}
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
      pageName,
      headerTitle,
      pages,
      pageIndex
    } = this.props.monthExpanses;
    if (pages.length === 0 ||
      pages[pageIndex] === undefined ||
      (!pages[pageIndex].isFetching && pages[pageIndex].status === "")) {
      return <AlignCenterMiddle><Spinner loadingText={"טוען עמוד"} /></AlignCenterMiddle>;
    }

    //summarized sections data
    const { summarizedSections } = this.props.summarizedSections;

    //expanses codes data
    const { expansesCodes } = this.props.expansesCodes;

    //building names
    const { buildingName, buildingNameEng } = this.props.location.state;

    //add new month expanse box
    const addNewBox = this.state.addNewMode ? <InputExpansesField
      summarizedSections={summarizedSections.data}
      expansesCodes={expansesCodes.data}
      data={pages[pageIndex].data}
      submitData={this.inputExpansesSubmit}
      findData={this.findExpanseIndex}
    /> : null;

    //date
    const {
      date
    } = pages[pageIndex];

    return (
      <Fragment>

        <Header>
          {headerTitle}
        </Header>

        <Section title={"טבלת מעקב הוצאות חודשי"}>

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
              middlePane={
                <RegisteredDatesFetcher fetchYears fetchMonths params={{
                  buildingName: buildingNameEng
                }}>
                  {({ months, years }) => {
                    return <DatePicker
                      months={months}
                      years={years}
                      date={date}
                      submitHandler={this.loadExpansesByDate}
                    />
                  }}
                </RegisteredDatesFetcher>

              } // end middlePane
              leftPane={
                <PageControls
                  excel={{
                    data: pages[pageIndex].data,
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
              } // end leftPane
            /> {/* end TableControls */}

            {/* add new box */}
            {addNewBox}

            <ReactTableContainer
              loading={pages[pageIndex].isFetching}
              data={pages[pageIndex].data}
              columns={this.generateHeaders()}
              filterable
              defaultPageSize={65}
              defaultSorted={[
                {
                  id: "code",
                  asc: true
                }
              ]}
              onFetchData={(state, instance) => {
                console.log(state);
              }}
              manual
              pages={10}
            />

          </TableWrapper> {/* end TableWrapper */}


        </Section>

      </Fragment>
    );
  }

}

const mapStateToProps = state => ({
  summarizedSections: state.summarizedSections,
  monthExpanses: state.monthExpanses,
  generalSettings: {
    tax: state.generalSettings.generalSettings.data[0].tax
  },
  expansesCodes: state.expansesCodes
});

const mapDispatchToProps = dispatch => ({
  fetchExpanses: (payload, page) => dispatch(monthExpansesActions.fetchExpanses(payload, page)),
  cleanup: (buildingNameEng) => dispatch(monthExpansesActions.cleanup(buildingNameEng)),
  initState: (page) => dispatch(monthExpansesActions.initState(page)),
  updateExpanse: (payload, tableData, target, fieldName) => dispatch(monthExpansesActions.updateExpanse(payload, tableData, target, fieldName)),
  addExpanse: (payload, tableData, expanse) => dispatch(monthExpansesActions.addExpanse(payload, tableData, expanse)),
  deleteExpanse: (payload, tableData) => dispatch(monthExpansesActions.deleteExpanse(payload, tableData)),
  fetchSummarizedSections: () => dispatch(summarizedSectionsActions.fetchSummarizedSections()),
  fetchExpansesCodes: (payload) => dispatch(expansesCodesActions.fetchExpansesCodes(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthExpanses);