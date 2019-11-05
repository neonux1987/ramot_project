import React, { Component } from 'react';
import { Select, Button, MenuItem } from '@material-ui/core';
import styles from './DatePicker.module.css';
import Spinner from '../Spinner/Spinner';

class DatePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: {
        month: this.props.date.month,
        year: this.props.date.year,
        quarter: this.props.date.quarter
      }
    }
    //binds
    this.handleChange = this.handleChange.bind(this);
    this.spinnerWrapperStyle = { width: "110px" };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date.month !== this.props.date.month ||
      prevProps.date.year !== this.props.date.year ||
      prevProps.date.quarter !== this.props.date.quarter) {
      this.setState({
        date: {
          month: this.props.date.month,
          year: this.props.date.year,
          quarter: this.props.date.quarter
        }
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.date.month !== nextProps.date.month ||
      this.state.date.year !== nextProps.date.year ||
      this.state.date.quarter !== nextProps.date.quarter) {
      return true;
    } else if (this.state.date.month !== nextState.date.month ||
      this.state.date.year !== nextState.date.year ||
      this.state.date.quarter !== nextState.date.quarter) {
      return true;
    } else if (this.props.enableMonth && (this.props.months.length !== nextProps.months.length)) {
      return true;
    } else if (this.props.enableYear && (this.props.years.length !== nextProps.years.length)) {
      return true;
    } else if (this.props.enableQuarter && (this.props.quarters.length !== nextProps.quarters.length)) {
      return true;
    }
    return false;
  }

  handleChange(event) {
    const { name, value } = event.target;
    const newValue = name === "year" || name === "quarter" ? Number.parseInt(value) : value;
    this.setState({
      date: {
        ...this.state.date,
        [name]: newValue
      }
    });
  }

  renderMonth() {
    if (this.props.enableMonth) {
      if (!this.props.months || this.props.months.length === 0) {
        return <div className={styles.formSelect} style={this.spinnerWrapperStyle}><Spinner loadingText={"חודשים"} size={20} /></div>;
      }
      return <Select
        name="month"
        className={styles.formSelect}
        value={this.state.date.month}
        onChange={this.handleChange}
      >
        {this.props.months.map((month) => {
          return <MenuItem value={month.month} key={month.id}>{month.monthHeb}</MenuItem>;
        })}
      </Select>
    }
    return null;
  }

  renderQuarter() {
    if (this.props.enableQuarter) {
      if (!this.props.quarters || this.props.quarters.length === 0) {
        return <div className={styles.formSelect} style={this.spinnerWrapperStyle}><Spinner loadingText={"רבעונים"} size={20} /></div>;
      }
      return <Select
        name="quarter"
        className={styles.formSelect}
        value={this.state.date.quarter}
        onChange={this.handleChange}
      >
        {this.props.quarters.map((quarter) => {
          return <MenuItem value={quarter.quarter} key={quarter.id}>{quarter.quarterHeb}</MenuItem>;
        })}
      </Select>
    }
    return null;
  }

  renderYear() {
    if (this.props.enableYear) {
      if (!this.props.years || this.props.years.length === 0) {
        return <div className={styles.formSelect} style={this.spinnerWrapperStyle}><Spinner loadingText={"שנים"} size={20} /></div>;
      }
      return <Select
        name="year"
        className={styles.formSelect}
        value={this.state.date.year}
        onChange={this.handleChange}
      >
        {this.props.years.map((year) => {
          return <MenuItem value={year.year} key={year.id}>{year.year}</MenuItem>;
        })}
      </Select>
    }
    return null;
  }

  render() {
    return (
      <div id="dates" className={styles.dates} style={this.props.style}>
        <form className={styles.formControl}>
          {this.renderMonth()}
          {this.renderQuarter()}
          {this.renderYear()}
        </form>
        <Button variant="contained" color="secondary" className={styles.button} onClick={() => this.props.loadDataByDateHandler(this.state.date)}

        >
          טען
          </Button>
      </div>
    );
  }

}

export default DatePicker;