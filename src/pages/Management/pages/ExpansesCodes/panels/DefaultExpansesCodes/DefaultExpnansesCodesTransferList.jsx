import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TransferListContainer from "../../../../../../components/TransferList/TransferListContainer";
import {
  defaultExpansesCodesCleanup,
  fetchDefaultExpansesCodes,
  updateDefaultCodes
} from "../../../../../../redux/actions/defaultExpansesCodesActions";
import {
  fetchExpansesCodesReduced,
  expansesCodesCleanup
} from "../../../../../../redux/actions/expansesCodesActions";

// filter expanses codes array with default
// expanses codes array
function filterExpansesCodes(defaultExpansesCodes, expansesCodes) {
  // create an array of expanses codes key value pairs
  // and store it in a map
  const keyValuePairsArr = defaultExpansesCodes.map((item) => {
    return [item.code, item.codeName];
  });
  let map = new Map(keyValuePairsArr);

  const filteredExpansesCodes = expansesCodes.filter(
    (item) => !map.has(item.code)
  );
  return filteredExpansesCodes;
}

const sort = (objectA, objectB) => {
  if (objectA.codeName < objectB.codeName) {
    return -1;
  }
  if (objectA.codeName > objectB.codeName) {
    return 1;
  }
  // a must be equal to b
  return 0;
};

const DefaultExpnansesCodesTransferList = () => {
  const [filteredExpansesCodes, setFilteredExpansesCodes] = useState([]);
  const [defaultExpansesCodes, setDefaultExpansesCodes] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const expansesCodesResult = await dispatch(fetchExpansesCodesReduced());
      const defaultExpansesCodesResult = await dispatch(
        fetchDefaultExpansesCodes()
      );

      const filteredExpansesCodes = filterExpansesCodes(
        defaultExpansesCodesResult.data,
        expansesCodesResult.data
      );
      setFilteredExpansesCodes(filteredExpansesCodes);
      setDefaultExpansesCodes(defaultExpansesCodesResult.data);
      setIsFetching(false);
    };

    fetchData();

    return () => {
      dispatch(expansesCodesCleanup);
      dispatch(defaultExpansesCodesCleanup());
    };
  }, [dispatch]);

  const updateLeftList = (newLeft, checked) => {
    const sorted = newLeft.sort(sort);
    setDefaultExpansesCodes(sorted);
    dispatch(updateDefaultCodes(checked));
  };

  const updateRightList = (newRight) => {
    const sorted = newRight.sort(sort);
    setFilteredExpansesCodes(sorted);
  };

  return (
    <TransferListContainer
      isFetching={isFetching}
      rightItems={filteredExpansesCodes}
      leftItems={defaultExpansesCodes}
      rightTitle={"קודים לבחירה"}
      leftTitle={"ברירת מחדל"}
      updateLeft={updateLeftList}
      updateRight={updateRightList}
    />
  );
};

export default React.memo(DefaultExpnansesCodesTransferList);
