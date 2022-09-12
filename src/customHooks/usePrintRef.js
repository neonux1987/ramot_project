import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPrintableComponentRef } from "../redux/actions/printActions";

const usePrintRef = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ref && ref.current) dispatch(setPrintableComponentRef(ref));
    return () => dispatch(null);
  }, [ref, dispatch]);

  return ref;
};

export default usePrintRef;
