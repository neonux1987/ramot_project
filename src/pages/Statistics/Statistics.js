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
      <div>
        <h1>statistics</h1>
      </div>
    );
  }

}