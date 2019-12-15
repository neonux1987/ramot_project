import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import Spinner from '../Spinner/Spinner';

export default ({ message = "", spinner = false, done = false, spinnerColor = "#ffffff" }) => {
  let renderSpinner = spinner ? <Spinner color={spinnerColor} size={24} /> : null;
  let renderDoneIcon = done ? <DoneIcon /> : null;
  return (<div style={{
    justifyContent: "center",
    display: "inline-flex",
    alignItems: "center",
    textAlign: "right",
  }}>
    <div style={{ marginLeft: "5px" }}>{renderDoneIcon}{renderSpinner}</div><span>{message}</span>
  </div>)
}