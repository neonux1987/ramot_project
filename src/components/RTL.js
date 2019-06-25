import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()], insertionPoint: "jss-insertion-point" });

// Custom Material-UI class name generator.
/* const generateClassName = createGenerateClassName(); */

function RTL(props) {
  return (
    <JssProvider jss={jss} /* generateClassName={generateClassName} */>
      {props.children}
    </JssProvider>
  );
}

export default RTL;