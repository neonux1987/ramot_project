import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getPrinters,
  setColors
} from "../../../../../redux/actions/printActions";
import { updateTemplate } from "../../../../../redux/actions/printTemplatesActions";

const rangeRegex = "^(\\s*\\d+\\s*\\-\\s*\\d+\\s*,?|\\d)+$";

const SidebarContainer = (props) => {
  const { pdf, onClose, onPrint, generate, pageName } = props;

  const printers = useSelector((store) => store.print.printers);
  const template = useSelector((store) => store.printTemplates[pageName]);

  const dispatch = useDispatch();

  const [printer, setPrinter] = useState("");
  const [allPages, setAllPages] = useState(true);
  const [rangeValid, setRangeValid] = useState(true);
  const [copies, setCopies] = useState(1);
  const [initialNumOfPages, setInitialNumOfPages] = useState(0);

  useEffect(() => {
    generate(template);
    // eslint-disable-next-line
  }, [template]);

  useEffect(() => {
    dispatch(getPrinters()).then((data) => {
      if (data.length !== 0) {
        data.forEach(({ isDefault, deviceName }) => {
          if (isDefault) setPrinter(deviceName);
        });
      }
    });
  }, [dispatch]);

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
        if (range[0] > pageCount) valid = false;
        else {
          range.push(range[0]);
        }
      }
    }

    if (!valid) setRangeValid(false);
    else {
      if (rangeValid === false) setRangeValid(true);

      // subtract 1 from 'from' and 'to' because electron print options pageRanges is 0 based
      dispatch(
        updateTemplate({
          pageName,
          key: "pageRanges",
          value: {
            from: Number.parseInt(range[0]) - 1,
            to: Number.parseInt(range[1]) - 1
          }
        })
      );
    }
  };

  const onScaleFactorBlur = (event) => {
    const value = Number.parseInt(event.target.getAttribute("aria-valuenow"));

    dispatch(updateTemplate({ pageName, key: "scaleFactor", value }));
  };

  const onChange = (event) => {
    const target = event.target;

    switch (target.name) {
      case "copies":
        if (target.value !== "") setCopies(Number.parseInt(target.value));
        break;
      case "allPages":
        setAllPages(target.value);
        if (target.value === true)
          dispatch(
            updateTemplate({
              pageName,
              key: "pageRanges",
              value: undefined
            })
          );
        break;
      case "pageSize":
        dispatch(
          updateTemplate({ pageName, key: "pageSize", value: target.value })
        );
        break;
      case "landscape":
        dispatch(
          updateTemplate({
            pageName,
            key: "landscape",
            value: target.value
          })
        );
        break;
      case "colors":
        dispatch(
          updateTemplate({ pageName, key: "colors", value: target.value })
        );
        dispatch(setColors(target.value));
        break;
      default:
        return null;
    }
  };

  const onPrintClick = () => {
    const newState = { ...template };
    newState.copies = copies;
    newState.printer = printer;
    onPrint(newState);
    onClose();
  };

  const printerOnChange = (event) => {
    setPrinter(event.target.value);
  };

  return (
    <Sidebar
      onPrintClick={onPrintClick}
      onClose={onClose}
      template={template}
      printers={printers}
      printer={printer}
      printerOnChange={printerOnChange}
      onChange={onChange}
      onPageRangesBlur={onPageRangesBlur}
      onScaleFactorBlur={onScaleFactorBlur}
      allPages={allPages}
      copies={copies}
      rangeValid={rangeValid}
      pdf={pdf}
      initialNumOfPages={initialNumOfPages}
    />
  );
};

export default React.memo(SidebarContainer);
