import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import QuarterStatsContainer from "./QuarterStatsContainer";
import BudgetExecutionsTableContainer from "./BudgetExecutionsTableContainer";
import Page from "../../components/Page/Page";
import { fetchBudgetExecutions } from "../../redux/actions/budgetExecutionsActions";
import useIcons from "../../customHooks/useIcons";
import TitledSection from "../../components/Section/TitledSection";

const PAGE_NAME = "budgetExecutions";
const PAGE_TITLE = "ביצוע מול תקציב";
const STATS_TITLE = "סטטיסטיקה";

const BudgetExecutions = () => {
  const dispatch = useDispatch();
  const [generateIcon] = useIcons();
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
        buildingName,
      };

      dispatch(fetchBudgetExecutions(buildingInfo, date));
    }
  }, [dispatch, buildingId, buildingName, date]);

  const TableIcon = generateIcon("table");
  const StatIcon = generateIcon("stats");
  return (
    <Page>
      <TitledSection title={STATS_TITLE} TitleIcon={StatIcon} id="be-stats">
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
