// LIBRARIES IMPORTS
import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Helper from "../../helpers/Helper";
import SliderStatBox from "../../components/Stats/SliderStatBox";
import Stats from "../../components/Stats/Stats";
import { AlignCenterMiddle } from "../../components/AlignCenterMiddle/AlignCenterMiddle";
import { fetchAllQuartersStatsByYear } from "../../redux/actions/quarterlyStatsActions";
import { fetchYearStats } from "../../redux/actions/yearlyStatsActions";
import ThemeContext from "../../context/ThemeContext";

const YearStatsContainer = ({ buildingId, pageName, date }) => {
  const { colorSet } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const quarterlyStats = useSelector(
    (store) => store.quarterlyStats[buildingId].pages[pageName]
  );
  const yearlyStats = useSelector(
    (store) => store.yearlyStats[buildingId].pages[pageName]
  );

  const fetchData = useCallback(() => {
    const params = {
      buildingId: buildingId,
      pageName: pageName,
      date: date,
    };

    //fetch quarter months stats
    dispatch(fetchAllQuartersStatsByYear(params));

    //fetch quarter stats
    dispatch(fetchYearStats(params));
  }, [buildingId, pageName, date, dispatch]);

  const generateQuarterlyStats = (quarterlyStats, isFetching) => {
    // list of strings of qurter months
    const quarters = Helper.getYearQuarters();

    // where the boxes will be stored fo render
    const stats = [];

    for (let i = 0; i < quarters.length; i++) {
      const { outcome, income } = quarterlyStats[i];

      stats[i] = (
        <SliderStatBox
          key={`quarter${i}`}
          title={quarters[i]}
          outcome={outcome}
          income={income}
          unicodeSymbol={Helper.shekelUnicode}
          color={colorSet[i]}
          loading={isFetching}
          index={i + 1}
          xs={true}
          border
        />
      );
    } // end loop

    return stats;
  };

  const generateYearStats = (yearStats, isFetching) => {
    const { year, income, outcome } = yearStats;
    return (
      <SliderStatBox
        key={"year"}
        title={`${year}`}
        outcome={outcome}
        income={income}
        unicodeSymbol={Helper.shekelUnicode}
        color={colorSet[4]}
        loading={isFetching}
        index={5}
        xs={true}
        last
      />
    );
  };

  useEffect(() => {
    if (date.year !== "" && date.year !== undefined) fetchData();
  }, [date.year, date.quarter, date.month, fetchData]);

  if (quarterlyStats.data.length === 0 || yearlyStats.data.length === 0)
    return (
      <AlignCenterMiddle style={{ height: "202px", fontSize: "18px" }}>
        לא נטענו נתונים.
      </AlignCenterMiddle>
    );
  else {
    //generate quarter months stats
    const stats = generateQuarterlyStats(
      quarterlyStats.data,
      quarterlyStats.isFetching
    );
    //generate quarter total stats
    stats.push(generateYearStats(yearlyStats.data[0], yearlyStats.isFetching));

    return <Stats stats={stats} spacing={0} />;
  }
};

export default React.memo(YearStatsContainer);
