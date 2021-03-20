import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()], insertionPoint: document.getElementById('jss-insertion-point') });

// Custom Material-UI class name generator.
/* const generateClassName = createGenerateClassName(); */

function RTL(props) {
  return (
    <StylesProvider jss={jss} /* generateClassName={generateClassName} */>
      {props.children}
    </StylesProvider>
  );
}

export default RTL;