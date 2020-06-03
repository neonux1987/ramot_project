import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './Home.module.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={`${styles.wrapper} page`}>

        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <h3>דף הבית נמצא בבנייה.</h3>
        </div>

      </div>
    );
  }
}

export default withStyles(styles)(Home);