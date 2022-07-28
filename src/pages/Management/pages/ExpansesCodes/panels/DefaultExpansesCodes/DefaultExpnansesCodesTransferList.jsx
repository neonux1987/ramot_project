import React, { useEffect, useState } from "react";
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
  const [expansesCodesMap, setExpansesCodesMap] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    //get the building month expanses
    dispatch(fetchExpansesCodes()).then((result) => {
      const expansesCodesMap = result.data.map((item) => {
        return [item.code, item.codeName];
      });
      let map = new Map(expansesCodesMap);
      setExpansesCodesMap(map);
      map.set(1011, "אחזקה כללית");
      console.log(map);
    });
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
      leftTitle={"בחירה"}
      rightTitle={"רשימת ברירת מחדל"}
    />
  );
};

export default React.memo(DefaultExpnansesCodesTransferList);
