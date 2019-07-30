import React, { Component } from 'react';
import { connect } from 'react-redux';
import MonthExpanses from '../../pages/MonthExpanses/MonthExpanses';
import Home from '../../pages/Home/Home';
import BudgetExecution from '../../pages/BudgetExecution/BudgetExecution';
import SummarizedBudget from '../../pages/SummarizedBudget/SummarizedBudget';
import Settings from '../../pages/Settings/Settings';
import Statistics from '../../pages/Statistics/Statistics'
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import LoadingCircle from '../../common/LoadingCircle';
import Toolbar from './Toolbar/Toolbar';
import Helper from '../../../helpers/Helper';
import sidebarActions from '../../../redux/actions/sidebarActions';
import { withRouter } from 'react-router';

const styles = theme => ({
  main: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
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

class Main extends Component {

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
      case "ביצוע מול תקציב": return BudgetExecution;
      case "סיכום תקציבי": return SummarizedBudget;
      case "סטטיסטיקה": return Statistics;
      default: return Home;
    }
  }

  render() {
    let locationState = { ...this.props.location.state };
    //set default state for default / root location
    if (!this.props.location.state) {
      locationState = {
        page: "דף-הבית"
      };
    }
    //const {buildingName,page} = this.props.location.state;
    const { generalSettings } = this.props.generalSettings;
    if (this.props.sidebar.sidebar.isFetching) {
      return <LoadingCircle wrapperStyle={this.props.classes.loadingWrapper} />;
    } else {
      return (
        <main id="main" className={this.props.classes.main + this.props.toggleMain}>
          <Toolbar buildingName={locationState.buildingName} header={locationState.page} year={Helper.getCurrentYear()} month={Helper.getCurrentMonthHeb()} tax={`${generalSettings.data[0].tax}%`} />
          <div style={{ padding: "24px" }}>
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
  withStyles(styles)(
    withRouter(Main)
  )
);