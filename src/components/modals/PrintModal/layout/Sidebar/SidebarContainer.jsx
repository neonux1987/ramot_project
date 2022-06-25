import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getPrinters,
  print,
  printPreview,
  setColors
} from "../../../../../redux/actions/printActions";
import { updateTemplate } from "../../../../../redux/actions/printTemplatesActions";
import { validatePageRanges } from "../../../../../helpers/utils";

const SidebarContainer = (props) => {
  const { pdf, onClose, pageName } = props;

  const printers = useSelector((store) => store.print.printers);
  const template = useSelector((store) => store.printTemplates[pageName]);

  const dispatch = useDispatch();

  const [printer, setPrinter] = useState("");
  const [allPages, setAllPages] = useState(true);
  const [rangeValid, setRangeValid] = useState(true);
  const [copies, setCopies] = useState(1);
  const [initialNumOfPages, setInitialNumOfPages] = useState(0);
  const [pageRanges, setPageRanges] = useState(null);

  useEffect(() => {
    const newTemplate = { ...template };
    if (pageRanges) newTemplate.pageRanges = pageRanges;

    dispatch(printPreview(newTemplate));
  }, [template, pageRanges, dispatch]);

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

    const valid = validatePageRanges(value, pageCount);

    if (!valid) setRangeValid(false);
    else {
      const range = value.split("-").map((x) => x.trim());
      setRangeValid(true);
      if (range.length === 1)
        setPageRanges({
          from: Number.parseInt(range[0]) - 1,
          to: Number.parseInt(range[0]) - 1
        });
      else
        setPageRanges({
          from: Number.parseInt(range[0]) - 1,
          to: Number.parseInt(range[1]) - 1
        });
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
        if (target.value === true) setPageRanges(null);
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
    newState.pageRanges = pageRanges;

    dispatch(print(newState));
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
