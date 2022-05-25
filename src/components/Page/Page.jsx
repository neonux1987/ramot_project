import { Slide } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

const Page = props => {
  const { printMode } = useSelector(store => store.print);
  return <Slide direction="up" style={{ margin: printMode ? "0" : "15px" }} in={true} mountOnEnter unmountOnExit timeout={300}><div>{props.children}</div></Slide>;
}

export default Page;