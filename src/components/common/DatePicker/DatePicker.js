import React, { Component } from 'react';
import { FormControl, Select, Button, MenuItem } from '@material-ui/core';
import styles from './DatePicker.module.css';
import { DotLoader } from 'react-spinners';

class DatePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      month: this.props.date.month,
      year: this.props.date.year,
      quarter: this.props.date.quarter
    }
    //binds
    this.handleChange = this.handleChange.bind(this);
  }

  /* shouldComponentUpdate(nextProps, nextState) {
    if (nextState.month === nextProps.date.month &&
      nextState.year === nextProps.date.year &&
      nextState.quarter === nextProps.date.quarter) {
      return false
    }
    return true;
  } */

  handleChange(event) {
    const { name, value } = event.target;
    const newValue = name === "year" || name === "quarter" ? Number.parseInt(value) : value;
    this.setState({ [name]: newValue });
  }

  renderMonth() {

    if (this.props.enableMonth) {
      return <Select
        name="month"
        className={styles.formSelect}
        value={this.state.month}
        onChange={this.handleChange}
        style={{ display: this.props.enableMonth ? "" : "none" }}
      >

        {this.props.data.months.map((month) => {
          return <MenuItem value={month.month} key={month.id}>{month.monthHeb}</MenuItem>;
        })}
      </Select>
    }
    return null;
  }

  renderQuarter() {

    if (this.props.enableQuarter) {
      if (this.props.data.quarters.length === 0) {
        return <DotLoader size={20} />;
      }
      return <Select
        name="quarter"
        className={styles.formSelect}
        value={this.state.quarter}
        onChange={this.handleChange}
        style={{ display: this.props.enableQuarter ? "" : "none" }}
      >
        {this.props.data.quarters.map((quarter) => {
          return <MenuItem value={quarter.quarter} key={quarter.id}>{quarter.quarterHeb}</MenuItem>;
        })}
      </Select>
    }
    return null;
  }

  renderYear() {

    if (this.props.enableYear) {
      return <Select
        name="year"
        className={styles.formSelect}
        value={this.state.year}
        onChange={this.handleChange}
        style={{ display: this.props.enableYear ? "" : "none" }}
      >
        {this.props.data.years.map((year) => {
          return <MenuItem value={year.year} key={year.id}>{year.year}</MenuItem>;
        })}
      </Select>
    }
    return null;
  }

  render() {
    return (
      <form id="dates" className={styles.dates}>
        <FormControl className={styles.formControl}>
          {this.renderMonth()}
          {this.renderQuarter()}
          {this.renderYear()}
        </FormControl>
        <Button variant="contained" color="secondary" className={styles.button} onClick={() => this.props.loadDataByDateHandler({
          month: this.state.month,
          year: this.state.year,
          quarter: this.state.quarter
        })}>
          טען
          </Button>
      </form>
    );
  }

}

export default DatePicker;