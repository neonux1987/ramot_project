import React, { Component } from 'react';
import ReactTable from 'react-table';

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
        <ReactTable
          data={data}
          columns={[{
            Header: 'Name',
            columns: [{
              Header: 'First Name',
              accessor: 'firstName'
            }, {
              Header: 'Last Name',
              id: 'lastName',
              accessor: d => d.lastName
            }]
          }, {
            Header: 'Info',
            columns: [{
              Header: 'Profile Progress',
              accessor: 'progress',
              Cell: row => (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#dadada',
                    borderRadius: '2px'
                  }}
                >
                  <div
                    style={{
                      width: `${row.value}%`,
                      height: '100%',
                      backgroundColor: row.value > 66 ? '#85cc00'
                        : row.value > 33 ? '#ffbf00'
                          : '#ff2e00',
                      borderRadius: '2px',
                      transition: 'all .2s ease-out'
                    }}
                  />
                </div>
              )
            }, {
              Header: 'Status',
              accessor: 'status',
              Cell: row => this.cell(row)
            }]
          }]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }

}