import React, { useState } from 'react';
import Column from './Column';
import ReactSelect from '../ReactSelect/ReactSelect';

export default ({ children, onBlurHandler, data }) => {

  const [select, setSelect] = useState(false);
  const [value, setValue] = useState("");

  const onClick = () => {
    setSelect(true);
  }

  const onMenuCloseHandler = () => {
    setSelect(false);
  }

  const onChangeHandler = (event) => {
    console.log(event);
  }

  const render = select ?
    <ReactSelect
      inputValue={value}
      onChangeHandler={onChangeHandler}
      options={data.data}
      getOptionLabel={(option) => option.code}
      getOptionValue={(option) => option.code}
      onBlurHandler={() => { }}
      autoFocus={true}
      //onMenuClose={onMenuCloseHandler}
      isLoading={data.isFetching}
    /> :
    children;

  return <Column
    onDoubleClick={onClick}
    innerStyle={{ position: "absolute" }}
  >{render}
  </Column>;
}