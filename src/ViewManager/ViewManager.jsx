import React from "react";
import AppContainer from "../AppContainer";
import ChartExportView from "../WindowViews/ChartExportView/ChartExportView";
import AppLoadingView from "../WindowViews/AppLoadingView/AppLoadingView";
import RestoreWizardView from "../WindowViews/RestoreWizardView/RestoreWizardView";
import { MemoryRouter } from "react-router-dom";

const views = {
  AppView: AppContainer,
  AppLoadingView: AppLoadingView,
  ChartExportView: ChartExportView
};

const ViewManager = () => {
  const whichView = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const viewName = urlParams.get("view");
    const view = views[viewName];

    switch (view) {
      case "AppLoadingView":
        return AppLoadingView;
      case "RestoreWizardView":
        return RestoreWizardView;
      case "ChartExportView":
        return ChartExportView;
      default:
        return AppContainer;
    }
  };

  const Component = whichView();

  return (
    <MemoryRouter>
      <Component />
    </MemoryRouter>
  );
};

export default ViewManager;
