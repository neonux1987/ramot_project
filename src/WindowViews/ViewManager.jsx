import React from "react";
import APPInitializer from "../APPInitializer";
import AppLoadingView from "./AppLoadingView/AppLoadingView";
import ChartExportView from "./ChartExportView/ChartExportView";

// get url query param for the views
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const viewName = urlParams.get("view");

const ViewManager = () => {
  // i had to extract the AppLoadingView from the ViewManger
  // and put it one level above because it will ignore this view
  // because of the if statement under that loades the AppLoader
  if (viewName === "AppLoadingView") return <AppLoadingView />;

  // to avoid the overhead of using the redux store
  if (viewName === "ChartExportView") return <ChartExportView />;

  return <APPInitializer viewName={viewName} />;
};

export default ViewManager;
