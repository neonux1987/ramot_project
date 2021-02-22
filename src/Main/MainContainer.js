// LIBRARIES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { Element, Events } from 'react-scroll'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { css } from 'emotion';
import classnames from 'classnames';

// PAGES
import MonthExpanses from '../pages/MonthExpanses/MonthExpanses';
import Home from '../pages/Home/Home';
import BudgetExecutions from '../pages/BudgetExecutions/BudgetExecutions';
import SummarizedBudgets from '../pages/SummarizedBudgets/SummarizedBudgets';
import Settings from '../pages/Settings/Settings';
import Management from '../pages/Management/Management';
import Statistics from '../pages/Statistics/Statistics';

// COMPONENTS
import BreadcrumbsContainer from './Toolbar/Breadcrumbs/BreadcrumbsContainer';

// ACTIONS
import * as sidebarActions from '../redux/actions/sidebarActions';
import * as routesActions from '../redux/actions/routesActions';


const mainStyle = css`
  height: 100%;
`;

const elementStyle = css`
  left: -1960px;
  display: block;
  opacity: 0;
  overflow: overlay;
  position: relative;
  flex-grow: 1;
`;

class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this._isMounted = false;
  }

  componentDidMount() {
    Events.scrollEvent.register('begin', function () {
    });

    Events.scrollEvent.register('end', function () {
    });

    const { history } = this.props;

    const { state, pathname } = this.props.routes.active;
    history.replace(pathname, state);
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
    });
    return routes;
  }

  whichPageComponent(pageName) {
    switch (pageName) {
      case "הוצאות חודשיות": return MonthExpanses;
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
    const timeout = { enter: 800, exit: 400 };

    return <Element
      id="mainContainer"
      className={classnames(elementStyle, this.props.toggleMain)}
    >

      <BreadcrumbsContainer />

      <main ref={this.props.mainContainer} className={mainStyle}>

        <Route render={({ location }) => (
          <TransitionGroup style={{ position: "relative" /* height: "100%" */ }}>
            <CSSTransition
              style={{ height: "100%", paddingBottom: "80px" }}
              //key={location.key}
              timeout={timeout}
              classNames="fade"
              mountOnEnter={false}
              unmountOnExit={true}
            >

              <Switch location={location}>
                {this.generateRoutes(this.props.sidebar.menu.data)}
                <Route path="/" exact component={Home} />
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

            </CSSTransition>
          </TransitionGroup>
        )} />

      </main>
    </Element>

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
  withRouter(MainContainer)
);