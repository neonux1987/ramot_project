// LIBRARIES
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../../helpers/Helper';
import Stats from '../../components/Stats/Stats';
import DonutStatBox from '../../components/Stats/DonutStatBox';

// ACTIONS
import { fetchAllBuildingsStatsByYear } from '../../redux/actions/homeActions';

const BuildingsStatsContainer = () => {

  const { data, isFetching } = useSelector(store => store.home.yearlyStats);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBuildingsStatsByYear(2021));
  }, [dispatch]);

  const generateBuildingsStats = (data, isFetching) => {

    const keys = Object.keys(data);
    const statsList = [];

    keys.forEach((building, index) => {

      if (data[building].data.length === 0)
        return;

      const label = data[building].label;
      const { income, outcome } = data[building].data[0];

      statsList.push(<DonutStatBox
        key={label}
        title={label}
        outcome={outcome}
        income={income}
        unicodeSymbol={Helper.shekelUnicode}
        loading={isFetching}
        index={index + 1}
      />);
    });

    return statsList;
  }

  return (
    <Stats stats={generateBuildingsStats(data, isFetching)} columns={4} />
  );
}

export default BuildingsStatsContainer;