import React from 'react';
import { Button } from "@material-ui/core"

const PrimaryButton = (props) => {
  const { bgColor = "rgb(3, 101, 162)" } = props;
  return <Button variant="contained" color="primary" {...props} style={{ backgroundColor: bgColor }} />
}

export default PrimaryButton;