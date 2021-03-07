// LIBRARIES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { css } from 'emotion';

// ACTIONS
import * as routesActions from '../redux/actions/routesActions';
import Toolbar from './Toolbar/Toolbar';
import Routes from './Routes';


const mainStyle = css`
  height: 100%;
`;

const _main = css`
  display: block;
  overflow: overlay;
  flex-grow: 1;
`;

class MainContainer extends Component {

  componentDidMount() {
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

  render() {
    return <main id="mainContainer" ref={this.props.mainContainer} className={_main}>

      <Toolbar />

      <div className={mainStyle}>

        <Route render={({ location }) => (
          <Routes location={location} />
        )} />

      </div>

    </main>


  }

}

const mapStateToProps = state => ({
  generalSettings: state.generalSettings,
  routes: state.routes
});

const mapDispatchToProps = dispatch => ({
  updateRoute: (active) => dispatch(routesActions.updateRoute(active))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(MainContainer)
);