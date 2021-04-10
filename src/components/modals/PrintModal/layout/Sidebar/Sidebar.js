import React, { useEffect, useReducer, useState } from 'react';
import { css } from 'emotion';
import PrimaryButton from '../../../../buttons/PrimaryButton';
import { Collapse, Input, MenuItem, Typography } from '@material-ui/core';
import DefaultButton from '../../../../buttons/DefaultButton';
import Select from '../../../../Select/Select';
import { reducer, initialState } from './reducer';

const sidebar = css`
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 10px;
  width: 350px;
  border-left: 1px solid #ececec;
  display: flex;
  flex-direction: column;
`;

const printbutton = css`margin-right: 10px`;

const buttonWrapper = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
`;
const row = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px 15px;
`;

const rightPane = css`
  display: flex;
  flex-grow: 1;
`;

const leftPane = css`
  padding-left: 0;
`;

const label = css`
  font-size: 16px;
`;

const select = css`
  direction: ltr;
  width: 180px;
  background: #f5f5f5;
  margin: 0;
`;

const input = css`
  text-align: center;
  width: 180px;
  background: #f5f5f5;
  margin: 0;
`;

const Sidebar = props => {
  const {
    pdf,
    onClose,
    onPrint,
    printers
  } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    printers.data.forEach(({ isDefault, displayName }) => {
      if (isDefault)
        dispatch({ type: "setPrinter", printer: displayName });
    });
  }, [printers]);

  const onPrinterChange = (event) => {
    const target = event.target;
    dispatch({ type: "setPrinter", printer: target.value });
  }

  const onPagesChange = (event) => {
    const target = event.target;
    dispatch({ type: "setPages", pages: target.value });
  }

  const onSizeChange = (event) => {
    const target = event.target;
    dispatch({ type: "setSize", size: target.value });
  }

  const onRangeBlur = (event) => {
    const target = event.target;
    const range = target.value.split("-");
    dispatch({ type: "setRange", from: range[0], to: range[1] });
  }

  const onOrientationChange = (event) => {
    const target = event.target;
    dispatch({ type: "setOrientation", orientation: target.value });
  }

  const onColorsChange = (event) => {
    const target = event.target;
    dispatch({ type: "setColors", colors: target.value });
  }

  const onPrintClick = () => {
    onPrint(state.printer, "black-white");
  }

  const range = state.range.from !== "" & state.range.to !== "" ? `${state.range.from}-${state.range.to}` : "";

  return <div className={sidebar}>

    <Row>
      <RightPane>
        <Typography variant="h5">הדפסה</Typography>
      </RightPane>

      <LeftPane>
        {pdf !== null ? <Typography variant="h6">{`${pdf.pageCount} דפי נייר`}</Typography> : null}
      </LeftPane>
    </Row>

    <Row>
      <RightPane>
        <Label>מדפסות</Label>
      </RightPane>

      <LeftPane>
        <WideSelect
          name="printers"
          value={state.printer}
          onChange={onPrinterChange}
          loading={printers.isFetching}
        >
          {printers.data.map(({ displayName, isDefault }) => {
            return <MenuItem value={displayName} key={displayName}>{displayName}</MenuItem>;
          })}
        </WideSelect>
      </LeftPane>
    </Row>

    <Row>
      <RightPane>
        <Label>עמודים</Label>
      </RightPane>

      <LeftPane>
        <WideSelect
          name="pages"
          value={state.pages}
          onChange={onPagesChange}
        >
          <MenuItem value="all">הכל</MenuItem>
          <MenuItem value="custom">מותאם</MenuItem>
        </WideSelect>
      </LeftPane>
    </Row>

    <Collapse timeout={300} in={state.pages === "custom"}>
      <div className={row}>
        <RightPane>
        </RightPane>
        <LeftPane>
          <Input
            classes={{ root: select }}
            inputProps={{ className: input, min: 0, max: pdf ? pdf.pageCount : 0, onBlur: onRangeBlur }}
            value={range}
            placeholder="דוגמא: 1-5, 8, 11-13"
          />
        </LeftPane>
      </div>
    </Collapse>

    <Row>
      <RightPane>
        <Label>גודל</Label>
      </RightPane>

      <LeftPane>
        <WideSelect
          name="pages"
          value={state.size}
          onChange={onSizeChange}
        >
          <MenuItem value="A4">A4</MenuItem>
          <MenuItem value="A5">A5</MenuItem>
        </WideSelect>
      </LeftPane>
    </Row>

    <Row>
      <RightPane>
        <Label>כיוון</Label>
      </RightPane>

      <LeftPane>
        <WideSelect
          name="orientation"
          value={state.orientation}
          onChange={onOrientationChange}
        >
          <MenuItem value="portrait">לאורך</MenuItem>
          <MenuItem value="landscape">לרוחב</MenuItem>
        </WideSelect>
      </LeftPane>
    </Row>

    <Row>
      <RightPane>
        <Label>צבעים</Label>
      </RightPane>

      <LeftPane>
        <WideSelect
          name="colors"
          value={state.colors}
          onChange={onColorsChange}
        >
          <MenuItem value="colorful">צבעוני</MenuItem>
          <MenuItem value="balck-white">שחור לבן</MenuItem>
        </WideSelect>
      </LeftPane>
    </Row>

    <div className={buttonWrapper}>
      <DefaultButton onClick={onClose}>סגור</DefaultButton>
      <PrimaryButton className={printbutton} onClick={onPrintClick}>
        הדפס
    </PrimaryButton>
    </div>

  </div>;
}

export default React.memo(Sidebar);

const Row = props => (<div className={row}>{props.children}</div>);

const RightPane = props => (<div className={rightPane}>{props.children}</div>);

const LeftPane = props => (<div className={leftPane}>{props.children}</div>);

const Label = props => (<div className={label}>{props.children}</div>);

const WideSelect = props => (<Select {...props} selectStyle={select}></Select>);