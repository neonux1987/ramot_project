import React from 'react';
import { css } from 'emotion';
import PrimaryButton from '../../../../buttons/PrimaryButton';
import { Collapse, Input, MenuItem, Slider, Typography } from '@material-ui/core';
import WhiteButton from '../../../../buttons/WhiteButton';
import Select from '../../../../Select/Select';

const sidebar = css`
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 10px;
  width: 350px;
  border-left: 1px solid #ececec;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
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
  border: 1px solid #efecec;

  ::before {
    border-bottom: none;
  } 
`;

const inputInner = css`
  text-align: center;
`;

const rangeRow = css`
  margin-top: -10px;
`;

const rangeError = css`
  color: red;
  display: flex;
  justify-content: center;
  margin-top: -15px;
  padding-left: 20px;
`;

const slider = css`
  width: 180px;
  margin: 0;
  display: flex;
`;

const sliderMarks = [
  {
    value: 0,
    label: '0'
  },
  {
    value: 100,
    label: '100'
  },
];

const Sidebar = props => {
  const {
    pdf,
    onClose,
    onPrintClick,
    printers,
    state,
    onChange,
    onPageRangesBlur,
    onScaleFactorBlur,
    allPages,
    copies,
    rangeValid
  } = props;

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
          name="deviceName"
          value={state.deviceName}
          onChange={onChange}
          loading={printers.isFetching}
        >
          {printers.data.map(({ deviceName }) => {
            return <MenuItem value={deviceName} key={deviceName}>{deviceName}</MenuItem>;
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
          name="copies"
          value={copies}
          className={input}
          onChange={onChange}
          inputProps={{
            className: inputInner,
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
          onChange={onChange}
        >
          <MenuItem value={true}>הכל</MenuItem>
          <MenuItem value={false}>מותאם</MenuItem>
        </WideSelect>
      </LeftPane>
    </Row>

    <Collapse timeout={300} in={!allPages}>
      <div>
        <div className={row + " " + rangeRow}>
          <RightPane>
          </RightPane>
          <LeftPane>
            <Input
              name="pageRanges"
              classes={{ root: input }}
              inputProps={{
                className: inputInner,
                min: 0,
                max: pdf ? pdf.pageCount : 0,
                onBlur: onPageRangesBlur
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
        <Label>גודל דף</Label>
      </RightPane>

      <LeftPane>
        <WideSelect
          name="pageSize"
          value={state.pageSize}
          onChange={onChange}
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
          name="landscape"
          value={state.landscape}
          onChange={onChange}
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
          onChange={onChange}
        >
          <MenuItem value={true}>צבעוני</MenuItem>
          <MenuItem value={false}>שחור לבן</MenuItem>
        </WideSelect>
      </LeftPane>
    </Row>

    <Row>
      <RightPane>
        <Label>קנה מידה</Label>
      </RightPane>

      <LeftPane>
        <Slider
          className={slider}
          defaultValue={100}
          onBlur={onScaleFactorBlur}
          step={1}
          min={0}
          max={100}
          marks={sliderMarks}
          valueLabelDisplay="auto"
        />
      </LeftPane>
    </Row>

    <div className={buttonWrapper}>
      <WhiteButton onClick={onClose}>בטל</WhiteButton>
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