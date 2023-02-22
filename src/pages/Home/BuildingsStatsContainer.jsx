import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "../../components/Icons/HomeIcon";
import DonutStatBox from "../../components/Stats/DonutStatBox";
import HomeStats from "../../components/Stats/HomeStats";
import Helper from "../../helpers/Helper";
import { fetchAllBuildingsStatsByYear } from "../../redux/actions/homeActions";

const BuildingIcon = () => (
  <HomeIcon width="60%" height="60%" color="#ffffff" />
);

const BuildingsStatsContainer = () => {
  const { data, isFetching } = useSelector((store) => store.home.yearlyStats);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    dispatch(fetchAllBuildingsStatsByYear(2022));
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
          xs={3}
          color={data[building].color}
          Icon={BuildingIcon}
        />
      );
    });

    return statsList;
  };

  return <HomeStats stats={generateBuildingsStats(data, isFetching)} />;
};

export default BuildingsStatsContainer;
