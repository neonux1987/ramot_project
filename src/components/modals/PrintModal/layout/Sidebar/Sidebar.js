import React, { useEffect, useReducer, useState } from 'react';
import { css } from 'emotion';
import PrimaryButton from '../../../../buttons/PrimaryButton';
import { Collapse, Input, MenuItem, Typography } from '@material-ui/core';
import DefaultButton from '../../../../buttons/DefaultButton';
import Select from '../../../../Select/Select';
import { reducer } from './reducer';
import printTemplates from "../../printTemplates";

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

  '&:before'{
    border-bottom: none;
  }
`;

const rangeError = css`
  color: red;
  display: flex;
  justify-content: center;
  margin-top: -15px;
  padding-left: 20px;
`;

const rangeRegex = "^(\\s*\\d+\\s*\\-\\s*\\d+\\s*,?|\\d)+$";

function initState(data, pageName) {
  const state = printTemplates[pageName];
  if (data.length !== 0) {

    data.forEach(({ isDefault, displayName }) => {
      if (isDefault)
        state.printer = displayName;
    });

  }
  return state;
}

const Sidebar = props => {
  const {
    pdf,
    onClose,
    onPrint,
    printers,
    initiateGeneration,
    pageName
  } = props;
  const [state, dispatch] = useReducer(reducer, initState(printers.data, pageName));

  const [allPages, setAllPages] = useState(true);

  const [rangeValid, setRangeValid] = useState(true);

  const [copies, setCopies] = useState(1);

  useEffect(() => {
    initiateGeneration(state);
  }, [state, initiateGeneration]);

  const onPrinterChange = (event) => {
    const target = event.target;
    dispatch({ type: "setPrinter", printer: target.value });
  }

  const onAllPagesChange = (event) => {
    const target = event.target;
    setAllPages(target.value);

    if (target.value === true)
      dispatch({ type: "setRange", range: null });
  }

  const onPageSizeChange = (event) => {
    const target = event.target;
    dispatch({ type: "setPageSize", pageSize: target.value });
  }

  const onCopiesChange = (event) => {
    const target = event.target;
    setCopies(Number.parseInt(target.value));
  }

  const onRangeBlur = (event) => {
    const target = event.target;
    const value = target.value;

    const regex = new RegExp(rangeRegex);
    const passed = regex.test(value);

    let valid = true;
    const range = target.value.split("-");

    if (passed) {

      // two values range
      if (range.length === 2) {

        if (range[0] > pdf.pageCount || range[1] > pdf.pageCount || range[0] > range[1])
          valid = false;

      }

      // one value range, duplicate first value
      // and push to the array
      if (range.length === 1) {

        if (range[0] > pdf.pageCount)
          valid = false;
        else {
          range.push(range[0]);
        }

      }

    }

    if (!valid)
      setRangeValid(false);
    else {
      if (rangeValid === false)
        setRangeValid(true);

      dispatch({ type: "setRange", range: { from: Number.parseInt(range[0]), to: Number.parseInt(range[1]) } });
    }


  }

  const onLandscapeChange = (event) => {
    const target = event.target;
    dispatch({ type: "setLandscape", landscape: target.value });
  }

  const onColorsChange = (event) => {
    const target = event.target;
    dispatch({ type: "setColors", colors: target.value });
  }

  const onPrintClick = () => {
    const newState = { ...state };
    newState.copies = copies;
    onPrint(state);
  }

  return <form className={sidebar}>

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
        <Label>עותקים</Label>
      </RightPane>

      <LeftPane>
        <Input
          value={copies}
          classes={{ root: select }}
          onChange={onCopiesChange}
          inputProps={{
            className: input,
            min: 1,
            max: 10,
            type: "number"
          }}
        />
      </LeftPane>
    </Row>

    <Row>
      <RightPane>
        <Label>עמודים</Label>
      </RightPane>

      <LeftPane>
        <WideSelect
          name="allPages"
          value={allPages}
          onChange={onAllPagesChange}
        >
          <MenuItem value={true}>הכל</MenuItem>
          <MenuItem value={false}>מותאם</MenuItem>
        </WideSelect>
      </LeftPane>
    </Row>

    <Collapse timeout={300} in={!allPages}>
      <div>
        <div className={row}>
          <RightPane>
          </RightPane>
          <LeftPane>
            <Input
              classes={{ root: select }}
              inputProps={{
                className: input,
                min: 0,
                max: pdf ? pdf.pageCount : 0,
                onBlur: onRangeBlur
              }}
              placeholder="דוגמא: 1-5, 8, 11-13"
            />
          </LeftPane>
        </div>

        {!rangeValid ? <div className={rangeError}>
          טווח עמודים לא תקין, דוגמא תקינה: 1-5, 8, 11-13
        </div> : null}
      </div>
    </Collapse>

    <Row>
      <RightPane>
        <Label>גודל</Label>
      </RightPane>

      <LeftPane>
        <WideSelect
          name="pages"
          value={state.pageSize}
          onChange={onPageSizeChange}
        >
          <MenuItem value="A3">A3</MenuItem>
          <MenuItem value="A4">A4</MenuItem>
          <MenuItem value="A5">A5</MenuItem>
          <MenuItem value="Legal">Legal</MenuItem>
          <MenuItem value="Letter">Letter</MenuItem>
          <MenuItem value="Tabloid">Tabloid</MenuItem>
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
          value={state.landscape}
          onChange={onLandscapeChange}
        >
          <MenuItem value={false}>לאורך</MenuItem>
          <MenuItem value={true}>לרוחב</MenuItem>
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
          <MenuItem value={true}>צבעוני</MenuItem>
          <MenuItem value={false}>שחור לבן</MenuItem>
        </WideSelect>
      </LeftPane>
    </Row>

    <div className={buttonWrapper}>
      <DefaultButton onClick={onClose}>סגור</DefaultButton>
      <PrimaryButton className={printbutton} onClick={onPrintClick}>
        הדפס
    </PrimaryButton>
    </div>

  </form>;
}

export default React.memo(Sidebar);

const Row = props => (<div className={row}>{props.children}</div>);

const RightPane = props => (<div className={rightPane}>{props.children}</div>);

const LeftPane = props => (<div className={leftPane}>{props.children}</div>);

const Label = props => (<div className={label}>{props.children}</div>);

const WideSelect = props => (<Select {...props} selectStyle={select}></Select>);