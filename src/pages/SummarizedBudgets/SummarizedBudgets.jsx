import React, { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";
import Page from "../../components/Page/Page";
import YearStatsContainer from "./YearStatsContainer";
import SummarizedBudgetsTableContainer from "./SummarizedBudgetsTableContainer";
import { fetchSummarizedBudgets } from "../../redux/actions/summarizedBudgetActions";
import { useDispatch, useSelector } from "react-redux";
import useIcons from "../../customHooks/useIcons";
import TitledSection from "../../components/Section/TitledSection";

const PAGE_NAME = "summarizedBudgets";
const PAGE_TITLE = "סיכום תקציבי";
const TABLE_TITLE = "מעקב";
const STATS_TITLE = "סטטיסטיקה";

const SummarizedBudgets = () => {
  const dispatch = useDispatch();
  const [generateIcon] = useIcons();
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

  const TableIcon = generateIcon("table");
  const StatsIcon = generateIcon("stats");
  return (
    <Page>
      <TitledSection title={STATS_TITLE} TitleIcon={StatsIcon}>
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
