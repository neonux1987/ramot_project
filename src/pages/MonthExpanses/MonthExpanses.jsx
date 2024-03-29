import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Page from "../../components/Page/Page";
import MonthExpansesTableContainer from "./MonthExpansesTableContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthExpanses } from "../../redux/actions/monthExpansesActions";
import TitledSection from "../../components/Section/TitledSection";
import TableIcon from "../../components/Icons/TableIcon";

const PAGE_NAME = "monthExpanses";
const PAGE_TITLE = "הוצאות חודשיות";
const TABLE_TITLE = "הוצאות";

const MonthExpanses = () => {
  const dispatch = useDispatch();
  const { buildingName, buildingId } = useLocation().state;
  const { date, data, isFetching } = useSelector(
    (store) => store.monthExpanses[buildingId]
  );

  useEffect(() => {
    // fetch only when date is not empty strings
    // that means a date was selected
    if (date.year !== "" && date.month !== "")
      dispatch(fetchMonthExpanses({ buildingId, date }));
  }, [dispatch, buildingId, date]);

  return (
    <Page>
      <TitledSection
        title={TABLE_TITLE}
        TitleIcon={TableIcon}
        collapsable={false}
      >
        <MonthExpansesTableContainer
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

export default MonthExpanses;
