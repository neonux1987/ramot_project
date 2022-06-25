// LIBRARIES
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

// PAGES
import MonthExpanses from "../../pages/MonthExpanses/MonthExpanses";
import Home from "../../pages/Home/Home";
import BudgetExecutions from "../../pages/BudgetExecutions/BudgetExecutions";
import SummarizedBudgets from "../../pages/SummarizedBudgets/SummarizedBudgets";
import Management from "../../pages/Management/Management";
import Statistics from "../../pages/Statistics/Statistics";
import Settings from "../../pages/Settings/Settings";
import pages from "../../helpers/pages";

const Routes = (props) => {
  const data = useSelector((store) => store.menu.data);

  //gnerate routes from menu array with sub arrays
  const generateRoutes = (menu) => {
    //generate menu routes and submenu routes
    let routes = [];
    menu.forEach((route) => {
      routes.push(
        pages.map((page) => {
          return (
            <Route
              path={"/" + route.path + "/" + page.path}
              exact
              component={whichPageComponent(page.label)}
              key={"/" + route.path + "/" + page.path}
            />
          );
        })
      );
    });

    return routes;
  };

  const whichPageComponent = (pageName) => {
    switch (pageName) {
      case "הוצאות חודשיות":
        return MonthExpanses;
      case "ביצוע מול תקציב":
        return BudgetExecutions;
      case "סיכום תקציבי":
        return SummarizedBudgets;
      case "סטטיסטיקה":
        return Statistics;
      case "ניהול":
        return Management;
      default:
        return Home;
    }
  };

  return (
    <Switch location={props.location}>
      {generateRoutes(data)}
      <Route path="/דף-הבית" exact component={Home} />
      <Route
        path="/הגדרות"
        render={(routeProps) => <Settings {...routeProps} />}
      />
      <Route path="/ניהול" component={Management} />
      <Route
        exact
        path="/"
        component={Home}
        history={{
          page: "דף-הבית",
          buildingName: "דף הבית",
          buildingId: "home"
        }}
      />
    </Switch>
  );
};

export default React.memo(Routes);
