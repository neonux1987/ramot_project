import React from 'react';
import { Button } from "@material-ui/core"

const PrimaryButton = (props) => {
  return <Button variant="contained" color="primary" {...props} style={{ backgroundColor: "rgb(3, 101, 162)", ...props.style }} />
}

export default PrimaryButton;