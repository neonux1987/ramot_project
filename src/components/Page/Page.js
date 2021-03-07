import { Slide } from '@material-ui/core';
import React from 'react';
import { page } from './Page.module.css';

const Page = props => <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={300}><div className={page}>{props.children}</div></Slide>

export default Page;