// LIBRARIES
import React from 'react';
import { css } from 'emotion';

// COMPONENTS
import { AlignCenterMiddle } from '../../components/AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../../components/Spinner/Spinner';

const container = css`
  background: #ffffff;
`;

const text = css`
 font-size: 18px;
`;

export default props => {
  const { children, isFetching, itemCount } = props;

  const Loading = isFetching ? <Spinner size={60} loadingText={"טוען נתונים..."} /> : <div>
    {children}
  </div>;

  return <div className={container}>

    {!isFetching && itemCount === 0 ? <AlignCenterMiddle><span className={text}>או שאין נתונים או שלא נבחר תאריך.</span></AlignCenterMiddle> : Loading}
  </div>

}