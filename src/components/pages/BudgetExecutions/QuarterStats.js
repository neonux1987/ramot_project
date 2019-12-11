// LIBRARIES IMPORTS
import React from 'react';

import Helper from '../../../helpers/Helper';

import StatBox from '../../common/Stats/StatBox/StatBox';
import StatLoadingBox from '../../common/Stats/StatLoadingBox/StatLoadingBox';
import Stats from '../../common/Stats/Stats';

import TotalStatsFetcher from '../../renderProps/providers/TotalStatsFetcher';
import { AlignCenterMiddle } from '../../common/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../common/Spinner/Spinner';

const QuarterStats = props => {

  const generateMonthlyStats = (monthStats, quarter, isFetching) => {

    // list of strings of qurter months
    const quarterMonths = Helper.getQuarterMonths(quarter);

    // where the boxes will be stored fo render
    const returnStats = [];

    for (let i = 0; i < quarterMonths.length; i++) {

      // render loading if still fetching the stats
      if (isFetching || monthStats.length === 0) {
        returnStats[i] = <StatLoadingBox key={i} title={`טוען נתוני חודש ${quarterMonths[i]}`} />;
      } else {

        returnStats[i] = <StatBox
          key={i}
          title={monthStats[i].month}
          outcome={`${monthStats[i].outcome} ${Helper.shekelUnicode}`}
          income={`${monthStats[i].income} ${Helper.shekelUnicode}`}
          bgColor={Helper.quarterMonthsColors[i]}
        />;

      }

    } // end loop

    return returnStats;

  }

  const generateQuarterStats = (quarterStat, quarter, isFetching) => {
    //render loading if still fetching the stats
    if (isFetching || quarterStat === undefined) {
      return <StatLoadingBox key={3} title={`טוען נתוני סוף רבעון ${quarter}`} />
    } else {
      return <StatBox
        key={3}
        title={`רבעון ${quarterStat.quarter}`}
        outcome={`${quarterStat.outcome} ${Helper.shekelUnicode}`}
        income={`${quarterStat.income} ${Helper.shekelUnicode}`}
        bgColor={Helper.endQuarterColor}
      />;
    }
  }

  if (props.date === undefined)
    return <AlignCenterMiddle><Spinner loadingText={"טוען הגדרות סיכום רבעון..."} /></AlignCenterMiddle>;
  else {
    const {
      date,
      pageName,
      buildingName
    } = props;

    return (
      <TotalStatsFetcher
        allMonthStatsByQuarter
        quarterStats
        pageName={pageName}
        params={{
          buildingName,
          date
        }}>
        {({ monthlyStats, quarterlyStats }) => {
          //generate quarter months stats
          const renderMonthlyStats = generateMonthlyStats(monthlyStats.data, date.quarter, monthlyStats.isFetching);
          //generate quarter total stats
          renderMonthlyStats.push(generateQuarterStats(quarterlyStats.data[0], date.quarter, quarterlyStats.isFetching))
          return <Stats stats={renderMonthlyStats} />;
        }}
      </TotalStatsFetcher>
    );
  }


}

export default QuarterStats;