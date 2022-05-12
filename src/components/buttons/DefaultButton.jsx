import React from 'react';
import { css } from 'emotion';
import { Button } from '@material-ui/core';

const DefaultButton = (props) => {
  return <Button {...props} className={`${props.className} ${css`transition: none;`}`} />
}

export default DefaultButton;