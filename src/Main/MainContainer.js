// LIBRARIES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { Element, Events } from 'react-scroll'

// PAGES
import MonthExpanses from '../pages/MonthExpanses/MonthExpanses';
import Home from '../pages/Home/Home';
import BudgetExecutions from '../pages/BudgetExecutions/BudgetExecutions';
import SummarizedBudgets from '../pages/SummarizedBudgets/SummarizedBudgets';
import Settings from '../pages/Settings/Settings';
import Management from '../pages/Management/Management';
import Statistics from '../pages/Statistics/Statistics';

// COMPONENTS
import AppLoader from '../components/AnimatedLoaders/AppLoader';
import Toolbar from './Toolbar/Toolbar';
import Helper from '../helpers/Helper';

// ACTIONS
import * as sidebarActions from '../redux/actions/sidebarActions';
import * as routesActions from '../redux/actions/routesActions';

const styles = theme => ({
  main: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.default,
    //backgroundColor: "#f3f4f8",
    //padding: theme.spacing.unit * 3,
    overflow: "overlay",
    display: "block",
    position: "relative",
    right: "-1960px",
    opacity: "0",
    //paddingTop: "22px"
  },
  loadingWrapper: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    color: "#000",
    fontSize: "34px",
    margin: "0 auto"
  }
})

class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this.props.fetchSidebar();

    Events.scrollEvent.register('begin', function () {
    });

    Events.scrollEvent.register('end', function () {
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const { pathname, state } = this.props.location;

      const active = {
        pathname,
        state
      };

      this.props.updateRoute(active)
    }
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  //gnerate routes from menu array with sub arrays
  generateRoutes(menu) {
    //generate menu routes and submenu routes
    let routes = [];
    menu.forEach(route => {
      routes.push(route.submenu.map(subRoute => {
        return (<Route path={"/" + route.path + "/" + subRoute.path} exact component={this.whichPageComponent(subRoute.label)} key={route.id} />);
      }));
      /* routes.push(<Route path={"/" + route.path} exact component={MonthExpanses} key={route.id} />); */
    });
    return routes;
  }

  whichPageComponent(pageName) {
    switch (pageName) {
      case "הוצאות חודשי": return MonthExpanses;
      case "ביצוע מול תקציב": return BudgetExecutions;
      case "סיכום תקציבי": return SummarizedBudgets;
      case "סטטיסטיקה": return Statistics;
      case "ניהול": return Management;
      default: return Home;
    }
  }

  render() {
    let locationState = { ...this.props.location.state };
    //set default state for default / root location
    if (!this.props.location.state) {
      locationState = {
        page: "דף הבית"
      };
    }

    if (this.props.sidebar.menu.isFetching) {
      return <AppLoader style={{ width: "100%" }} loading={this.props.sidebar.menu.isFetching} />;
    } else {
      return (
        <Element id="mainContainer" className={this.props.classes.main + this.props.toggleMain}>
          <main ref={this.props.mainContainer}>
            <Toolbar
              buildingName={locationState.buildingName}
              page={locationState.page}
              year={Helper.getCurrentYear()}
              quarter={Helper.getCurrentQuarterHeb()}
              month={Helper.getCurrentMonthHeb()}
            />
            <div /* style={{ padding: "15px 24px 24px 24px" }} */ style={{ height: "100%", paddingBottom: "100px" }}>
              <Switch>
                {this.generateRoutes(this.props.sidebar.menu.data)}
                <Route path="/דף-הבית" component={Home} />
                <Route path="/הגדרות"
                  render={routeProps => (
                    <Settings {...routeProps} />
                  )}
                />
                <Route path="/ניהול" component={Management} />
                <Route exact path="/" component={Home} history={{
                  page: "דף-הבית",
                  buildingName: "דף הבית",
                  buildingNameEng: "home"
                }} />
              </Switch>
            </div>
          </main>
        </Element>
      );
    }
  }

}

const mapStateToProps = state => ({
  generalSettings: state.generalSettings,
  sidebar: state.sidebar,
  routes: state.routes
});

const mapDispatchToProps = dispatch => ({
  fetchSidebar: () => dispatch(sidebarActions.fetchSidebar()),
  updateRoute: (active) => dispatch(routesActions.updateRoute(active))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(
    MainContainer
  ))
);