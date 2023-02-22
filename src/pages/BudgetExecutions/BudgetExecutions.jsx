import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DonutIcon from "../../components/Icons/DonutIcon";
import TableIcon from "../../components/Icons/TableIcon";
import Page from "../../components/Page/Page";
import TitledSection from "../../components/Section/TitledSection";
import { fetchBudgetExecutions } from "../../redux/actions/budgetExecutionsActions";
import BudgetExecutionsTableContainer from "./BudgetExecutionsTableContainer";
import QuarterStatsContainer from "./QuarterStatsContainer";

const PAGE_NAME = "budgetExecutions";
const PAGE_TITLE = "ביצוע מול תקציב";
const STATS_TITLE = "סטטיסטיקה";

const BudgetExecutions = () => {
  const dispatch = useDispatch();
  const { buildingName, buildingId } = useLocation().state;
  const { date, data, isFetching } = useSelector(
    (store) => store.budgetExecutions[buildingId]
  );

  useEffect(() => {
    // fetch only when date is not empty strings
    // that means a date was selected
    if (date.year !== "" && date.quarter !== "") {
      const buildingInfo = {
        buildingId,
        buildingName
      };

      dispatch(fetchBudgetExecutions(buildingInfo, date));
    }
  }, [dispatch, buildingId, buildingName, date]);

  return (
    <Page>
      <TitledSection title={STATS_TITLE} TitleIcon={DonutIcon} id="be-stats">
        <QuarterStatsContainer
          buildingId={buildingId}
          date={date}
          pageName={PAGE_NAME}
        />
      </TitledSection>
      <TitledSection title={PAGE_TITLE} TitleIcon={TableIcon} id="be-table">
        <BudgetExecutionsTableContainer
          buildingName={buildingName}
          buildingId={buildingId}
          date={date}
          pageName={PAGE_NAME}
          pageTitle={PAGE_TITLE}
          data={data}
          isFetching={isFetching}
        />
      </TitledSection>
    </Page>
  );
};

export default BudgetExecutions;
