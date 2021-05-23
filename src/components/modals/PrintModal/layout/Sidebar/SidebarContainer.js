import React, { useEffect, useReducer, useState } from 'react';
import { reducer } from './reducer';
import printTemplates from "../../printTemplates";
import Sidebar from './Sidebar';
import { useDispatch } from 'react-redux';
import { setColors } from '../../../../../redux/actions/printActions';

const rangeRegex = "^(\\s*\\d+\\s*\\-\\s*\\d+\\s*,?|\\d)+$";

// this method is used for initial setng of
// the default user printer in the list
function initState(data, pageName) {
  const state = printTemplates[pageName];
  if (data.length !== 0) {

    data.forEach(({ isDefault, deviceName }) => {
      if (isDefault)
        state.deviceName = deviceName;
    });

  }
  return state;
}

const SidebarContainer = props => {
  const {
    pdf,
    onClose,
    onPrint,
    printers,
    generate,
    pageName
  } = props;
  const [state, dispatch] = useReducer(reducer, initState(printers.data, pageName));

  const reduxDispatch = useDispatch();

  const [allPages, setAllPages] = useState(true);

  const [rangeValid, setRangeValid] = useState(true);

  const [copies, setCopies] = useState(1);

  const [initialNumOfPages, setInitialNumOfPages] = useState(0);

  useEffect(() => {
    generate(state);
  }, [state, generate]);

  const onPageRangesBlur = (event) => {
    let pageCount = pdf.pageCount;

    // we must keep the original page count
    // for future use in range, otherwise it will
    // compare with reduced page count which is not correct
    if (initialNumOfPages === 0) {
      setInitialNumOfPages(pdf.pageCount);
    } else {
      pageCount = initialNumOfPages;
    }

    const target = event.target;
    const value = target.value;

    const regex = new RegExp(rangeRegex);
    const passed = regex.test(value);

    let valid = true;
    const range = target.value.split("-");

    if (passed) {

      // two values range
      if (range.length === 2) {

        if (range[0] > pageCount || range[1] > pageCount || range[0] > range[1])
          valid = false;

      }

      // one value range, duplicate first value
      // and push to the array
      if (range.length === 1) {

        if (range[0] > pageCount)
          valid = false;
        else {
          range.push(range[0]);
        }

      }

    }

    if (!valid)
      setRangeValid(false);
    else {
      if (rangeValid === false)
        setRangeValid(true);

      // subtract 1 from 'from' and 'to' because electron print options pageRanges is 0 based
      dispatch({ type: "setPageRanges", pageRanges: { from: Number.parseInt(range[0]) - 1, to: Number.parseInt(range[1]) - 1 } });
    }

  }

  const onScaleFactorBlur = event => {
    const value = Number.parseInt(event.target.getAttribute("aria-valuenow"));

    dispatch({ type: "setScaleFactor", scaleFactor: value });
  }

  const onChange = (event) => {
    const target = event.target;

    switch (target.name) {
      case "deviceName":
        dispatch({ type: "setDeviceName", deviceName: target.value });
        break;
      case "copies":
        if (target.value !== "")
          setCopies(Number.parseInt(target.value));
        break;
      case "allPages":
        setAllPages(target.value);
        if (target.value === true)
          dispatch({ type: "setPageRanges", pageRanges: undefined });
        break;
      case "pageSize":
        dispatch({ type: "setPageSize", pageSize: target.value });
        break;
      case "landscape":
        dispatch({ type: "setLandscape", landscape: target.value });
        break;
      case "colors":
        dispatch({ type: "setColors", colors: target.value });
        reduxDispatch(setColors(target.value));
        break;
      default: return null;
    }
  }

  const onPrintClick = () => {
    const newState = { ...state };
    newState.copies = copies;
    onPrint(state);
    onClose();
  }

  return <Sidebar
    onPrintClick={onPrintClick}
    onClose={onClose}
    state={state}
    printers={printers}
    onChange={onChange}
    onPageRangesBlur={onPageRangesBlur}
    onScaleFactorBlur={onScaleFactorBlur}
    allPages={allPages}
    copies={copies}
    rangeValid={rangeValid}
    pdf={pdf}
    initialNumOfPages={initialNumOfPages}
  />;
}

export default React.memo(SidebarContainer);