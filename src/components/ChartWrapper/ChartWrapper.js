// LIBRARIES
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { css } from 'emotion';

// ACTIONS
import { fetchAllMonthsStatsByYear } from '../../redux/actions/monthlyStatsActions';

// COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import DatePicker from '../../components/DatePicker/DatePicker';

const container = css`
  margin: 15px 0;
`;

const chartContainer = css`
  /* max-width: 800px; */
  /* height: 400px; */
  background: #ffffff;
`;

export default props => {
  const { children, isFetching, itemCount } = props;

  const Loading = isFetching ? <Spinner size={60} loadingText={"טוען נתונים..."} /> : <div className="_tableBody">
    {children}
  </div>;

  return <div className={container}>


    <div className={chartContainer}>
      {!loading && itemCount === 0 ? <div>אין נתונים. בחר תאריך או צור דוחות חדשים.</div> : Loading}
    </div>
  </div>

}