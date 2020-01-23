import React, { useState } from 'react';
import Column from './Column';
import ReactSelect from '../ReactSelect/ReactSelect';

export default ({
  children,
  onBlurHandler,
  options,
  isFetching,
  index,
  type,
  value
}) => {

  const [select, setSelect] = useState(false);
  const [selectValue, setSelectValue] = useState(`${value}`);

  const onClick = () => {
    setSelect(true);
  }

  const onMenuCloseHandler = () => {
    setSelect(false);
  }

  const onChangeHandler = (data) => {

    const saveValue = data[type];
    setSelectValue(saveValue);

    return onBlurHandler({
      data,
      index
    });
  }
  console.log(selectValue);
  const render = select ?
    <ReactSelect
      inputValue={selectValue}
      onChangeHandler={onChangeHandler}
      options={options}
      getOptionLabel={(option) => option[type]}
      getOptionValue={(option) => option[type]}
      autoFocus={true}
      //onMenuClose={onMenuCloseHandler}
      blurInputOnSelect={true}
      isLoading={isFetching}
    /> :
    children;

  return <Column
    onDoubleClick={onClick}
    innerStyle={{ position: "absolute" }}
  >{render}
  </Column>;
}