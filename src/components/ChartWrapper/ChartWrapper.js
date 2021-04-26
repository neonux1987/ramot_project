// LIBRARIES
import React from 'react';
import { css } from 'emotion';

// COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';
import { Fade } from '@material-ui/core';

const container = css`
  background: #ffffff;
  margin: 0;
  min-height: 500px;
  margin: 20px 15px;
`;

const text = css`
 font-size: 18px;
`;

const ChartWrapper = props => {
  const { children, isFetching, itemCount } = props;

  const Loading = isFetching ? <Loader /> : <div>
    {children}
  </div>;

  return <Fade in={true} mountOnEnter unmountOnExit timeout={500}>
    <div className={container}>

      {isFetching === false && itemCount === 0 ? <AlignCenterMiddle><span className={text}>לא נטענו נתונים.</span></AlignCenterMiddle> : Loading}
    </div>
  </Fade>;

}

export default ChartWrapper;

const Loader = () => {
  return <AlignCenterMiddle><Spinner size={60} loadingText={"טוען נתונים..."} /></AlignCenterMiddle>;
}