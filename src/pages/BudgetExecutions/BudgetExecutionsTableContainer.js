// LIBRARIES
import React, { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";

// ACTIONS
import {
  updateBudgetExecution,
  deleteBudgetExecution,
} from "../../redux/actions/budgetExecutionsActions";

// UTILS
import Helper from "../../helpers/Helper";

// CONTEXT
import ThemeContext from "../../context/ThemeContext";

// COMPONENTS
import TableControls from "../../components/table/TableControls/TableControls";
import PageControls from "../../components/PageControls/PageControls";
import EditControls from "../../components/EditControls/EditControls";
import GroupCell from "../../components/table/components/GroupCell";
import HeaderRow from "../../components/table/components/HeaderRow";
import TableRow from "../../components/table/components/TableRow";
import NonZeroCell from "../../components/table/components/NonZeroCell";
import TableActions from "../../components/table/TableActions/TableActions";
import Table from "../../components/table/Table";
import GroupRow from "../../components/table/components/GroupRow";
import ConfirmDeleteBudgetExecution from "../../components/modals/ConfirmDeleteBudgetExecution/ConfirmDeleteBudgetExecution";
import HeaderCell from "../../components/table/components/HeaderCell";
import Cell from "../../components/table/components/Cell";
import TableSection from "../../components/Section/TableSection";

// HOOKS
import useModalLogic from "../../customHooks/useModalLogic";
import AddNewContainer from "./AddNewContainer/AddNewContainer";
import useTableLogic from "../../customHooks/useTableLogic";
import useDifferenceColor from "../../customHooks/useDifferenceColor";
import BudgetExecutionsDatePicker from "./BudgetExecutionsDatePicker";

const EDITMODE_TEMPLATE = "minmax(60px,5%) minmax(60px,5%) repeat(12,1fr)";
const DEFAULT_TEMPLATE = "minmax(60px,5%) repeat(12,1fr)";

const BudgetExecutionsTableContainer = (props) => {
  const {
    date,
    buildingName,
    buildingId,
    pageName,
    pageTitle,
    data,
    isFetching,
  } = props;

  const {
    toggleEditMode,
    editMode,
    toggleAddNewMode,
    addNewMode,
    textAreaInput,
    numberInput,
  } = useTableLogic();

  const themeContext = useContext(ThemeContext);
  const { showModal } = useModalLogic();
  const dispatch = useDispatch();

  const [whichColor] = useDifferenceColor();

  // list of months of specific quarter
  const months = Helper.getQuarterMonthsEng(date.quarter);

  const onBlurHandler = (e) => {
    const target = e.target;
    const { value } = target;
    const { key, index } = target.dataset;

    //copy old object so rollback would be possible
    const oldBudgetExecutionObj = { ...data[index] };

    // new budget execution copy
    const budgetExecutionObj = { ...oldBudgetExecutionObj };

    if (key === "notes") {
      const { innerText } = e.target;
      //replace the value
      budgetExecutionObj[key] = innerText === "" ? "" : innerText;
    } else {
      //replace the value
      budgetExecutionObj[key] = value === "" ? 0 : parseFloat(value);
    }

    //prepare the budget execution object
    const newBudgetExecutionObj = prepareBudgetExecObj(
      budgetExecutionObj,
      date.quarter
    );

    //prepare the params object
    let params = {
      buildingId,
      pageName,
      date,
      budgetExec: newBudgetExecutionObj,
      summarized_section_id: budgetExecutionObj.summarized_section_id,
    };

    //check if it's a month budget column,
    //if it is set the date month params to the month
    //column that was updated
    if (key.includes("_budget")) {
      params.date.month = key.substring(0, key.length - 7);
      params.date.monthHeb = Helper.convertEngToHebMonth(params.date.month);
    }

    //calculateMonthTotalBudget(copyData, cellInfo.column.id, prevValue, copyData[objIndex][cellInfo.column.id]);
    dispatch(
      updateBudgetExecution(
        params,
        oldBudgetExecutionObj,
        newBudgetExecutionObj,
        index
      )
    );
    e.target.blur();
  };

  const onAgreeHandler = async (buildingId, date, index, rowData) => {
    dispatch(deleteBudgetExecution(buildingId, date, index, rowData));
  };

  const deleteHandler = (index, rowData) => {
    showModal(ConfirmDeleteBudgetExecution, {
      onAgreeHandler: () => onAgreeHandler(buildingId, date, index, rowData),
    });
  };

  /**
   * prepare budget executon object for update
   * calculate the total budget and difference
   * @param {} budgetExec
   * @param {*} date
   */
  const prepareBudgetExecObj = (budgetExec, quarter) => {
    const months = Helper.getQuarterMonthsEng(quarter);
    let totalBudget = 0;
    const objToSave = {};

    for (let monthName of months) {
      totalBudget += Number.parseFloat(budgetExec[monthName + "_budget"]);
      objToSave[monthName + "_budget"] = Number.parseFloat(
        budgetExec[monthName + "_budget"]
      );
    }

    objToSave["evaluation"] = Number.parseFloat(budgetExec["evaluation"]);
    objToSave["total_budget"] = totalBudget;
    //except the total month budget and total monh execution
    //they don't need the difference calculation
    if (
      budgetExec.summarized_section_id !== 32 &&
      budgetExec.summarized_section_id !== 33
    ) {
      objToSave["difference"] =
        totalBudget - Number.parseFloat(budgetExec["total_execution"]);
    }
    objToSave["notes"] = budgetExec["notes"];

    return objToSave;
  };

  const getGridTemplateColumns = useCallback(() => {
    return editMode ? EDITMODE_TEMPLATE : DEFAULT_TEMPLATE;
  }, [editMode]);

  const getDataObject = useCallback(
    (index) => {
      return data[index];
    },
    [data]
  );

  const HeaderGroups = () => {
    const { colorSet } = themeContext;
    const { quarter } = date;

    const months = Helper.getQuarterMonths(quarter);

    const monthColumns = months.map((month, i) => {
      return (
        <GroupCell span={2} color={colorSet[i]} key={i}>
          {month}
        </GroupCell>
      );
    });

    return (
      <GroupRow gridTemplateColumns={getGridTemplateColumns()}>
        {editMode ? <GroupCell></GroupCell> : null}
        <GroupCell></GroupCell>
        <GroupCell></GroupCell>
        {monthColumns}
        <GroupCell
          span={3}
          color={colorSet[3]}
        >{`סוף רבעון ${quarter}`}</GroupCell>
        <GroupCell></GroupCell>
        <GroupCell></GroupCell>
      </GroupRow>
    );
  };

  const HeadersRow = () => {
    const monthColumns = [];

    for (let i = 0; i < 3; i++) {
      monthColumns.push(
        <HeaderCell editMode={editMode} key={`תקציב${i}`}>
          {"תקציב"}
        </HeaderCell>
      );
      monthColumns.push(<HeaderCell key={`ביצוע${i}`}>{"ביצוע"}</HeaderCell>);
    }

    return (
      <HeaderRow gridTemplateColumns={getGridTemplateColumns()}>
        {editMode ? <HeaderCell>{"פעולות"}</HeaderCell> : null}
        <HeaderCell>{"שורה"}</HeaderCell>
        <HeaderCell>{"סעיף"}</HeaderCell>

        {monthColumns}

        <HeaderCell editMode={editMode}>{"הערכה"}</HeaderCell>
        <HeaderCell>{"תקציב"}</HeaderCell>
        <HeaderCell>{"ביצוע"}</HeaderCell>

        <HeaderCell>{"הפרש"}</HeaderCell>
        <HeaderCell editMode={editMode}>{"הערות"}</HeaderCell>
      </HeaderRow>
    );
  };

  const Row = (index, row) => {
    // row data
    const rowData = row ? row : getDataObject(index);

    const monthColumns = [];

    months.forEach((month, i) => {
      monthColumns.push(
        editMode ? (
          numberInput(
            `${month}_budget`,
            rowData[`${month}_budget`],
            index,
            onBlurHandler
          )
        ) : (
          <NonZeroCell key={`${month}_budget${i}`}>
            {rowData[`${month}_budget`]}
          </NonZeroCell>
        )
      );
      monthColumns.push(
        <NonZeroCell key={`${month}_budget_execution${i + 1}`}>
          {rowData[`${month}_budget_execution`]}
        </NonZeroCell>
      );
    });

    const differenceColor = whichColor(rowData.difference);

    return (
      <TableRow key={index} gridTemplateColumns={getGridTemplateColumns()}>
        {editMode ? (
          <TableActions deleteHandler={() => deleteHandler(index, rowData)} />
        ) : null}
        <Cell>{index + 1}</Cell>
        <Cell>{rowData.section}</Cell>
        {monthColumns}
        {editMode ? (
          numberInput("evaluation", rowData.evaluation, index, onBlurHandler)
        ) : (
          <NonZeroCell>{rowData.evaluation}</NonZeroCell>
        )}
        <NonZeroCell>{rowData.total_budget}</NonZeroCell>
        <NonZeroCell>{rowData.total_execution}</NonZeroCell>
        <NonZeroCell style={differenceColor}>{rowData.difference}</NonZeroCell>
        {editMode ? (
          textAreaInput("notes", rowData.notes, index, onBlurHandler)
        ) : (
          <Cell style={{ paddingLeft: "10px" }}>{rowData.notes}</Cell>
        )}
      </TableRow>
    );
  };

  /**
   * only used in print mode
   * generates 2 extra rows of total income and outcome
   */
  const generateIncomeOutcomeData = useCallback(() => {
    if (data.length === 0) return;

    // list of months of specific quarter
    const months = Helper.getQuarterMonthsEng(date.quarter);

    const row = { ...getDataObject(0) };

    const keys = Object.keys(row);

    keys.forEach((key) => {
      if (key !== "notes" || key !== "section") {
        row[key] = 0;
      } else {
        row[key] = "";
      }
    });

    const incomeRow = {
      ...row,
    };
    incomeRow.section = "הכנסות";
    incomeRow.notes = "";

    const outcomeRow = {
      ...row,
    };
    outcomeRow.section = "הוצאות";
    outcomeRow.notes = "";

    data.forEach((row) => {
      months.forEach((month) => {
        incomeRow[`${month}_budget`] += row[`${month}_budget`];
        incomeRow[`${month}_budget_execution`] = 0;

        outcomeRow[`${month}_budget`] = 0;
        outcomeRow[`${month}_budget_execution`] +=
          row[`${month}_budget_execution`];
      });

      incomeRow.total_budget += row.total_budget;
      outcomeRow.total_execution += row.total_execution;
    });

    return {
      incomeRow,
      outcomeRow,
    };
  }, [getDataObject, data, date.quarter]);

  return (
    <TableSection
      header={
        <TableControls
          rightPane={
            <EditControls
              editMode={editMode}
              toggleEditMode={toggleEditMode}
              addNewMode={addNewMode}
              toggleAddNewMode={toggleAddNewMode}
              dataExist={data.length > 0}
            />
          } // end rightPane
          leftPane={
            <PageControls
              excel={{
                data,
                fileName: Helper.getBudgetExecutionFilename(buildingName, date),
                buildingName,
                buildingId,
                date,
              }}
              print={{
                pageName,
              }}
              pageName={pageName}
              dataExist={data.length > 0}
            />
          } // end leftPane
        /> //End TableControls
      }
    >
      <AddNewContainer show={addNewMode} date={date} buildingId={buildingId} />

      <BudgetExecutionsDatePicker date={date} buildingId={buildingId} />

      <Table
        Row={Row}
        GroupComponent={HeaderGroups}
        HeaderComponent={HeadersRow}
        isFetching={isFetching}
        totalCount={data.length}
        printHeaderDetails={{
          pageTitle: buildingName + " - " + pageTitle,
          date: `שנה ${date.year} / רבעון ${date.quarter}`,
        }}
        generateIncomeOutcomeData={generateIncomeOutcomeData}
      />
    </TableSection>
  );
};

export default React.memo(BudgetExecutionsTableContainer);
