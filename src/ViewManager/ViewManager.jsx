import React from "react";
import AppContainer from "../AppContainer";
import AppLoadingView from "../WindowViews/AppLoadingView/AppLoadingView";
import RestoreWizardView from "../WindowViews/RestoreWizardView/RestoreWizardView";
import { MemoryRouter } from "react-router-dom";

const ViewManager = ({ viewName }) => {
  const whichView = () => {
    switch (viewName) {
      case "AppLoadingView":
        return AppLoadingView;
      case "RestoreWizardView":
        return RestoreWizardView;
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
