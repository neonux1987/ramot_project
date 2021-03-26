import { Slide } from '@material-ui/core';
import React from 'react';

const Page = props => <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={300}><div>{props.children}</div></Slide>

export default Page;