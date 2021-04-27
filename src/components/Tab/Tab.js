import { Fade } from '@material-ui/core';
import React from 'react';

const Tab = props => <Fade in={true} mountOnEnter unmountOnExit timeout={500}><div>{props.children}</div></Fade>

export default Tab;