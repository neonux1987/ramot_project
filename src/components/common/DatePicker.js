import React, { Component } from 'react';
import { FormControl, Select, withStyles, Button } from '@material-ui/core';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    display: "inline-block"
  },
  formSelect: {
    display: "inline-block",
    padding: "0 10px",
    margin: "0 5px"
  },
  dates: {
    display: "inline-block",
    float: "right",
    background: "#fff",
    border: "1px solid #e6e6e6",
    borderRadius: "4px"
  },
  month: {
    display: "inline-block",
    marginRight: "10px"
  },
  year: {
    display: "inline-block",
    marginLeft: "10px"
  },
  button: {
    display: "inline-block",
    margin: "6px 5px 0",
    backgroundColor: "#439dd2"
  }
});

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

  render() {
    return (
      <form id="dates" className={this.props.classes.dates}>
        <FormControl className={this.props.classes.formControl}>
          <Select
            id="month"
            className={this.props.classes.formSelect}
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

          <Select
            id="quarter"
            className={this.props.classes.formSelect}
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

          <Select
            id="year"
            className={this.props.classes.formSelect}
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
        </FormControl>
        <Button variant="contained" color="secondary" className={this.props.classes.button} onClick={() => this.props.loadDataByDateHandler(this.state.month, this.state.year, this.state.quarter)}>
          טען
          </Button>
      </form>
    );
  }

}

export default withStyles(styles)(DatePicker);