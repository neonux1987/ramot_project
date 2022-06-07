import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Helper from "../../helpers/Helper";
import DonutStatBox from "../../components/Stats/DonutStatBox";
import { fetchAllBuildingsStatsByYear } from "../../redux/actions/homeActions";
import HomeStats from "../../components/Stats/HomeStats";

const BuildingsStatsContainer = () => {
  const { data, isFetching } = useSelector((store) => store.home.yearlyStats);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    dispatch(fetchAllBuildingsStatsByYear(currentYear));
  }, [dispatch]);

  const generateBuildingsStats = (data, isFetching) => {
    const keys = Object.keys(data);
    const statsList = [];

    keys.forEach((building, index) => {
      if (data[building].data.length === 0) return;

      const label = data[building].label;
      const { income, outcome } = data[building].data[0];

      statsList.push(
        <DonutStatBox
          key={label}
          title={label}
          outcome={outcome}
          income={income}
          unicodeSymbol={Helper.shekelUnicode}
          loading={isFetching}
          index={index + 1}
          xs={2}
          color={data[building].color}
        />
      );
    });

    return statsList;
  };

  return <HomeStats stats={generateBuildingsStats(data, isFetching)} />;
};

export default BuildingsStatsContainer;
