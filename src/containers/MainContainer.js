import React, { Component } from 'react';
import { connect } from 'react-redux';
import MonthExpanses from '../Layout/pages/MonthExpanses/MonthExpanses';
import Home from '../Layout/pages/Home/Home';
import BudgetExecutions from '../Layout/pages/BudgetExecutions/BudgetExecutions';
import SummarizedBudgets from '../Layout/pages/SummarizedBudgets/SummarizedBudgets';
import Settings from '../Layout/pages/Settings/Settings';
import Statistics from '../Layout/pages/Statistics/Statistics'
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import LoadingCircle from '../components/common/LoadingCircle';
import Toolbar from '../components/layout/main/Toolbar/Toolbar';
import Helper from '../helpers/Helper';
import sidebarActions from '../redux/actions/sidebarActions';
import { withRouter } from 'react-router';

const styles = theme => ({
  main: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.default,
    backgroundColor: "#f3f4f8",
    //padding: theme.spacing.unit * 3,
    overflow: "auto",
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
    //const {buildingName,page} = this.props.location.state;
    const { generalSettings } = this.props.generalSettings;
    if (this.props.sidebar.sidebar.isFetching) {
      return <LoadingCircle wrapperStyle={this.props.classes.loadingWrapper} />;
    } else {
      return (
        <main id="main" className={this.props.classes.main + this.props.toggleMain}>
          <Toolbar buildingName={locationState.buildingName} header={locationState.page} year={Helper.getCurrentYear()} quarter={Helper.getCurrentQuarterHeb()} month={Helper.getCurrentMonthHeb()} tax={`${generalSettings.data[0].tax}%`} />
          <div /* style={{ padding: "15px 24px 24px 24px" }} */ style={{ height: "100%" }}>
            <Switch>
              {this.generateRoutes(this.props.sidebar.sidebar.data)}
              <Route path="/דף-הבית" component={Home} />
              <Route path="/הגדרות" component={Settings} />
              <Route exact path="/" component={Home} history={{
                page: "דף-הבית",
                buildingName: "דף הבית",
                buildingNameEng: "home"
              }} />
            </Switch>
          </div>
        </main>
      );
    }
  }

}

const mapStateToProps = state => ({
  generalSettings: state.generalSettings,
  sidebar: state.sidebar
});

const mapDispatchToProps = dispatch => ({
  fetchSidebar: () => dispatch(sidebarActions.fetchSidebar())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(
    MainContainer
  ))
);