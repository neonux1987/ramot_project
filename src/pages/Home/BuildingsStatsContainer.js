// LIBRARIES
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../../helpers/Helper';
import Stats from '../../components/Stats/Stats';
import DonutStatBox from '../../components/Stats/DonutStatBox';

// ACTIONS
import { fetchAllBuildingsStatsByYear } from '../../redux/actions/yearlyStatsActions';

const BuildingsStatsContainer = () => {

  const { data, isFetching } = useSelector(store => store.yearlyStats.all);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBuildingsStatsByYear(2021));
  }, [dispatch]);

  const generateBuildingsStats = (data, isFetching) => {

    const keys = Object.keys(data);

    const stats = keys.map((building, index) => {
      const label = data[building].label;
      const { income, outcome } = data[building].data[0];

      return <DonutStatBox
        key={label}
        title={label}
        outcome={outcome}
        income={income}
        unicodeSymbol={Helper.shekelUnicode}
        loading={isFetching}
        index={index + 1}
      />;
    });

    return stats;
  }

  return (
    <Stats stats={generateBuildingsStats(data, isFetching)} columns={4} />
  );
}

export default BuildingsStatsContainer;