import React, { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";
import Page from "../../components/Page/Page";
import YearStatsContainer from "./YearStatsContainer";
import SummarizedBudgetsTableContainer from "./SummarizedBudgetsTableContainer";
import { fetchSummarizedBudgets } from "../../redux/actions/summarizedBudgetActions";
import { useDispatch, useSelector } from "react-redux";
import TitledSection from "../../components/Section/TitledSection";
import DonutIcon from "../../components/Icons/DonutIcon";
import TableIcon from "../../components/Icons/TableIcon";

const PAGE_NAME = "summarizedBudgets";
const PAGE_TITLE = "סיכום תקציבי";
const TABLE_TITLE = "מעקב";
const STATS_TITLE = "סטטיסטיקה";

const SummarizedBudgets = () => {
  const dispatch = useDispatch();
  const { buildingName, buildingId } = useLocation().state;
  const { date, data, isFetching } = useSelector(
    (store) => store.summarizedBudgets[buildingId]
  );

  useEffect(() => {
    // fetch only when date is not empty strings
    // that means a date was selected
    if (date.year !== "" && date.month !== "") {
      dispatch(fetchSummarizedBudgets({ buildingId, date }));
    }
  }, [buildingId, dispatch, date]);

  return (
    <Page>
      <TitledSection title={STATS_TITLE} TitleIcon={DonutIcon}>
        <YearStatsContainer
          buildingId={buildingId}
          date={date}
          pageName={PAGE_NAME}
        />
      </TitledSection>
      <TitledSection title={TABLE_TITLE} TitleIcon={TableIcon}>
        <SummarizedBudgetsTableContainer
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

export default withRouter(SummarizedBudgets);
