import React, { Component } from 'react';
import { FormControl, Select, Button } from '@material-ui/core';
import styles from './DatePicker.module.css';

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
    let value = event.target.id === "year" || event.target.id === "quarter" ? parseInt(event.target.value) : event.target.value;
    this.setState({ [event.target.id]: value });
  }

  renderMonth() {

    if (this.props.enableMonth) {
      return <Select
        id="month"
        className={styles.formSelect}
        native
        value={this.state.month}
        onChange={this.handleChange}
        style={{ display: this.props.enableMonth ? "" : "none" }}
      >
        <option value={"january"}>ינואר</option>
        <option value={"february"}>פברואר</option>
        <option value={"march"}>מרץ</option>
        <option value={"april"}>אפריל</option>
        <option value={"may"}>מאי</option>
        <option value={"june"}>יוני</option>
        <option value={"july"}>יולי</option>
        <option value={"august"}>אוגוסט</option>
        <option value={"septemer"}>ספטמבר</option>
        <option value={"october"}>אוקטובר</option>
        <option value={"november"}>נובמבר</option>
        <option value={"december"}>דצמבר</option>
      </Select>
    }
    return null;
  }

  renderQuarter() {

    if (this.props.enableQuarter) {
      return <Select
        id="quarter"
        className={styles.formSelect}
        native
        value={this.state.quarter}
        onChange={this.handleChange}
        style={{ display: this.props.enableQuarter ? "" : "none" }}
      >
        <option value={1}>רבעון 1</option>
        <option value={2}>רבעון 2</option>
        <option value={3}>רבעון 3</option>
        <option value={4}>רבעון 4</option>
      </Select>
    }
    return null;
  }

  renderYear() {

    if (this.props.enableYear) {
      return <Select
        id="year"
        className={styles.formSelect}
        native
        value={this.state.year}
        onChange={this.handleChange}
        style={{ display: this.props.enableYear ? "" : "none" }}
      >
        <option value={2016}>2016</option>
        <option value={2017}>2017</option>
        <option value={2018}>2018</option>
        <option value={2019}>2019</option>
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
        <Button variant="contained" color="secondary" className={styles.button} onClick={() => this.props.loadDataByDateHandler(this.state.month, this.state.year, this.state.quarter)}>
          טען
          </Button>
      </form>
    );
  }

}

export default DatePicker;