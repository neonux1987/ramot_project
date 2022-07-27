import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TransferListContainer from "../../../../../../components/TransferList/TransferListContainer";
import {
  defaultExpansesCodesCleanup,
  fetchDefaultExpansesCodes
} from "../../../../../../redux/actions/defaultExpansesCodesActions";
import {
  fetchExpansesCodes,
  expansesCodesCleanup
} from "../../../../../../redux/actions/expansesCodesActions";

const DefaultExpnansesCodesTransferList = () => {
  const expansesCodes = useSelector((store) => store.expansesCodes);
  const defaultExpansesCodes = useSelector(
    (store) => store.defaultExpansesCodes
  );
  console.log(defaultExpansesCodes);
  const dispatch = useDispatch();

  useEffect(() => {
    //get the building month expanses
    dispatch(fetchExpansesCodes());
    dispatch(fetchDefaultExpansesCodes());

    return () => {
      dispatch(expansesCodesCleanup);
      dispatch(defaultExpansesCodesCleanup());
    };
  }, [dispatch]);

  return (
    <TransferListContainer
      isFetching={expansesCodes.isFetching || defaultExpansesCodes.isFetching}
      rightItems={expansesCodes.data}
      leftItems={defaultExpansesCodes.data}
    />
  );
};

export default React.memo(DefaultExpnansesCodesTransferList);
