// LIBRARIES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Element, Events } from 'react-scroll'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { css } from 'emotion';
import classnames from 'classnames';

// ACTIONS
import * as routesActions from '../redux/actions/routesActions';
import Toolbar from './Toolbar/Toolbar';
import Routes from './Routes';


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

  render() {
    const timeout = { enter: 800, exit: 400 };

    return <main id="mainContainer" ref={this.props.mainContainer} className={classnames(elementStyle, this.props.toggleMain)}>

      <Toolbar />

      <div className={mainStyle}>

        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              style={{ height: "100%", paddingBottom: "80px" }}
              //key={location.key}
              timeout={timeout}
              classNames="fade"
              mountOnEnter={false}
              unmountOnExit={true}
            >

              <Routes location={location} />

            </CSSTransition>
          </TransitionGroup>
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