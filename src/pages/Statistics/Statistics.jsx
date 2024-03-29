import { Box } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChartSelectorNav from "../../components/charts/ChartSelectorNav";
import StatsIcon from "../../components/Icons/StatsIcon";
import Page from "../../components/Page/Page";
import TitledSection from "../../components/Section/TitledSection";
import SectionControlsContainer from "../../components/table/TableControls/SectionControlsContainer";
import useBuildingColor from "../../customHooks/useBuildingColor";
import { updateSelectedChart } from "../../redux/actions/statisticsActions";
import MonthsChartContainer from "./charts/MonthsChartContainer";
import QuartersChartContainer from "./charts/QuartersChartContainer";
import TopChartContainer from "./charts/TopChartContainer";
import YearsChartContainer from "./charts/YearsChartContainer";

const PAGE_NAME = "statistics";

const BY_MONTHS_TITLE = "הוצאות והכנסות לפי חודשים";
const BY_QUARTERS_TITLE = "הוצאות והכנסות לפי רבעונים";
const BY_YEARS_TITLE = "הוצאות והכנסות לפי שנים";
const TOP_EXPANSES_TITLE = "טופ הוצאות";

const Statistics = (props) => {
  const { buildingId, buildingName } = props.location.state;

  const { selectedChart } = useSelector(
    (store) => store.statistics[buildingId]
  );

  const [isDataExist, setIsDataExist] = useState(false);

  const dispatch = useDispatch();
  const [buildingColor] = useBuildingColor(buildingId);

  const onClick = useCallback(
    (name) => {
      dispatch(updateSelectedChart(buildingId, name));
    },
    [dispatch, buildingId]
  );

  const Chart = whichChart(selectedChart);

  const ExtraDetails = useCallback(() => {
    return (
      <Box display="flex">
        <ChartSelectorNav onClick={onClick} active={selectedChart} />
      </Box>
    );
  }, [onClick, selectedChart]);

  return (
    <Page>
      <TitledSection
        bgColor={buildingColor}
        title={selectedChart}
        TitleIcon={StatsIcon}
        extraDetails={<ExtraDetails />}
        collapsable={false}
      >
        <SectionControlsContainer
          print={true}
          printProps={{
            pageName: PAGE_NAME,
            dataExist: isDataExist
          }}
        />

        <Box bgcolor="#ffffff">
          <Chart
            buildingId={buildingId}
            pageName={PAGE_NAME}
            buildingName={buildingName}
            setIsDataExist={setIsDataExist}
          />
        </Box>
      </TitledSection>
    </Page>
  );
};

export default Statistics;

function whichChart(name) {
  switch (name) {
    case BY_MONTHS_TITLE:
      return MonthsChartContainer;
    case BY_QUARTERS_TITLE:
      return QuartersChartContainer;
    case BY_YEARS_TITLE:
      return YearsChartContainer;
    case TOP_EXPANSES_TITLE:
      return TopChartContainer;
    default:
      return MonthsChartContainer;
  }
}
