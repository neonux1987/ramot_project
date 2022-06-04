import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader";
import QuarterStatsContainer from "./QuarterStatsContainer";
import BudgetExecutionsTableContainer from "./BudgetExecutionsTableContainer";
import Page from "../../components/Page/Page";
import { fetchBudgetExecutions } from "../../redux/actions/budgetExecutionsActions";
import SimpleTitledSection from "../../components/Section/SimpleTitledSection";
import useIcons from "../../customHooks/useIcons";
import TitledSection from "../../components/Section/TitledSection";

const PAGE_NAME = "budgetExecutions";
const PAGE_TITLE = "ביצוע מול תקציב";

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

  return (
    <Page>
      <PageHeader
        buildingName={buildingName}
        buildingId={buildingId}
        page={PAGE_TITLE}
      />

      <QuarterStatsContainer
        buildingId={buildingId}
        date={date}
        pageName={PAGE_NAME}
      />

      <SimpleTitledSection title={PAGE_TITLE} TitleIcon={TableIcon}>
        <BudgetExecutionsTableContainer
          buildingName={buildingName}
          buildingId={buildingId}
          date={date}
          pageName={PAGE_NAME}
          pageTitle={PAGE_TITLE}
          data={data}
          isFetching={isFetching}
        />
      </SimpleTitledSection>
    </Page>
  );
};

export default BudgetExecutions;
