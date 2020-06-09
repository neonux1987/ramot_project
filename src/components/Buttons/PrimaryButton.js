import React from 'react';
import ButtonWithSound from '../../componentsWithSound/ButtonWithSound/ButtonWithSound';

const PrimaryButton = (props) => {
  return <ButtonWithSound variant="contained" color="primary" {...props} style={{ backgroundColor: "rgb(3, 101, 162)", ...props.style }} />
}

export default PrimaryButton;