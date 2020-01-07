import React, { Component } from 'react';

export default class Statistics extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          firstName: "andrew",
          lastName: "andrew",
          progress: "",
          status: ""
        },
        {
          firstName: "ross",
          lastName: "ross",
          progress: "",
          status: ""
        }
      ]
    };
  }
  cell() {
    return null;
  }
  render() {
    const { data } = this.state;
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <h3>דף סטטיסטיקה נמצא בבנייה.</h3>
      </div>
    );
  }

}