import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TransferListContainer from "../../../../../../components/TransferList/TransferListContainer";
import {
  defaultExpansesCodesCleanup,
  fetchDefaultExpansesCodes,
  batchInsertDefaultCodes,
  batchDeleteDefaultCodes
} from "../../../../../../redux/actions/defaultExpansesCodesActions";
import {
  fetchExpansesCodesReducedByStatus,
  expansesCodesCleanup
} from "../../../../../../redux/actions/expansesCodesActions";
import { filterExpansesCodes, sort } from "./util";

const DefaultExpnansesCodesTransferList = () => {
  const [filteredExpansesCodes, setFilteredExpansesCodes] = useState([]);
  const [defaultExpansesCodes, setDefaultExpansesCodes] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      // fetch
      const expansesCodesResult = await dispatch(
        fetchExpansesCodesReducedByStatus("active")
      );
      const defaultExpansesCodesResult = await dispatch(
        fetchDefaultExpansesCodes()
      );

      // filter expanses
      const filteredExpansesCodes = filterExpansesCodes(
        defaultExpansesCodesResult.data,
        expansesCodesResult.data
      );

      // set results
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

  const updateLeftList = (newLeft, expansesToUpdate) => {
    const sorted = newLeft.sort(sort);
    setDefaultExpansesCodes(sorted);

    if (defaultExpansesCodes.length > newLeft.length)
      dispatch(batchDeleteDefaultCodes(newLeft, expansesToUpdate));
    else dispatch(batchInsertDefaultCodes(newLeft, expansesToUpdate));
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
