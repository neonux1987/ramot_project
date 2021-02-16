import React from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      /* const container = this.props.mainContainer.current;
      container.scrollTop = 0;
      window.scrollTo(0, 0); */
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);