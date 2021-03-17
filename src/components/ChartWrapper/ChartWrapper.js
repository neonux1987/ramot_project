// LIBRARIES
import React from 'react';
import { css } from 'emotion';

// COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';

const container = css`
  background: #ffffff;
  margin-top: 20px;
  min-height: 500px;
`;

const text = css`
 font-size: 18px;
`;

const ChartWrapper = props => {
  const { children, isFetching, itemCount } = props;

  const Loading = isFetching ? <Loader /> : <div>
    {children}
  </div>;

  return <div className={container}>

    {isFetching === false && itemCount === 0 ? <AlignCenterMiddle><span className={text}>לא נטענו נתונים.</span></AlignCenterMiddle> : Loading}
  </div>

}

export default ChartWrapper;

const Loader = () => {
  return <AlignCenterMiddle><Spinner size={60} loadingText={"טוען נתונים..."} /></AlignCenterMiddle>;
}