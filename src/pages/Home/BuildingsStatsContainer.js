// LIBRARIES
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThemeContext from '../../context/ThemeContext';
import Helper from '../../helpers/Helper';
import Stats from '../../components/Stats/Stats';
import StatBox from '../../components/Stats/StatBox/StatBox';

// ACTIONS
import { fetchAllBuildingsStatsByYear } from '../../redux/actions/yearlyStatsActions';

const BuildingsStatsContainer = () => {

  const { data, isFetching } = useSelector(store => store.yearlyStats.all);

  const themeContext = useContext(ThemeContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBuildingsStatsByYear(2021));
  }, [dispatch]);

  const generateBuildingsStats = (data, isFetching) => {
    const colors = themeContext.colorSet;

    const keys = Object.keys(data);

    const stats = keys.map((building, index) => {
      const label = data[building].label;
      const { income, outcome } = data[building].data[0];

      return <StatBox
        key={label}
        title={label}
        outcome={outcome}
        income={income}
        unicodeSymbol={Helper.shekelUnicode}
        titleColor={colors[index]}
        loading={isFetching}
      />;
    });

    return stats;
  }

  return (
    <Stats stats={generateBuildingsStats(data, isFetching)} columns={4} />
  );
}

export default BuildingsStatsContainer;