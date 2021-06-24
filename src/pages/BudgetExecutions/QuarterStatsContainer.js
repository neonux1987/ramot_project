// LIBRARIES IMPORTS
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../../helpers/Helper';
import Stats from '../../components/Stats/Stats';
import DonutStatBox from '../../components/Stats/DonutStatBox';
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import { fetchAllMonthsStatsByQuarter } from '../../redux/actions/monthlyStatsActions';
import { fetchQuarterStats } from '../../redux/actions/quarterlyStatsActions';
import useBuildingColor from '../../customHooks/useBuildingColor';


const QuarterStatsContainer = ({ buildingId, pageName, date }) => {

  const dispatch = useDispatch();
  const [buildingColor] = useBuildingColor(buildingId);

  const monthlyStats = useSelector(store => store.monthlyStats[buildingId].pages[pageName]);
  const quarterlyStats = useSelector(store => store.quarterlyStats[buildingId].pages[pageName]);

  const fetchData = useCallback(() => {
    const params = {
      buildingId,
      pageName,
      date
    }

    //fetch quarter months stats
    dispatch(fetchAllMonthsStatsByQuarter(params));

    //fetch quarter stats
    dispatch(fetchQuarterStats(params));
  }, [buildingId, pageName, date, dispatch]);

  const generateMonthlyStats = (monthStats, quarter, isFetching) => {
    // list of strings of qurter months
    const quarterMonths = Helper.getQuarterMonths(quarter);

    // where the boxes will be stored fo render
    const returnStats = [];

    for (let i = 0; i < quarterMonths.length; i++) {
      const { month, outcome, income } = monthStats[i];

      returnStats[i] = <DonutStatBox
        key={i}
        title={`${month}`}
        outcome={outcome}
        income={income}
        unicodeSymbol={Helper.shekelUnicode}
        //color={colors[i]}
        loading={isFetching}
        index={i + 1}
      />;

    } // end loop

    return returnStats;

  }

  const generateQuarterStats = (quarterStat, isFetching) => {
    const { quarter, outcome, income } = quarterStat;

    return <DonutStatBox
      key={3}
      title={`רבעון ${quarter}`}
      outcome={outcome}
      income={income}
      unicodeSymbol={Helper.shekelUnicode}
      color={buildingColor}
      loading={isFetching}
      index={4}
      border
    />;
  }

  useEffect(() => {
    if (date.year !== "" && date.year !== undefined)
      fetchData()
  }, [date.year, date.quarter, date.month, fetchData]);

  if ((monthlyStats.data.length === 0) || quarterlyStats.data.length === 0)
    return <AlignCenterMiddle style={{ height: "256px", fontSize: "18px" }}>לא נטענו נתונים.</AlignCenterMiddle>;
  else {

    //generate quarter months stats
    const stats = generateMonthlyStats(monthlyStats.data, date.quarter, monthlyStats.isFetching);
    //generate quarter total stats
    stats.push(generateQuarterStats(quarterlyStats.data[0], quarterlyStats.isFetching))

    return (<Stats stats={stats} columns={4} />);

  }
}

export default React.memo(QuarterStatsContainer);