import React from 'react';
import { css } from 'emotion';
import CenteredLoader from '../../AnimatedLoaders/CenteredLoader';

const _content = css`
  margin: 0;
  flex-grow: 1;
`;

const iframeStyle = css`
  width: 100%; 
  height: 100%; 
  border: 1px solid #ececec;
`;

const Content = props => {
  const {
    blob,
    loading
  } = props;

  return <div id="print-table" className={_content}>

    {loading ?
      <CenteredLoader text="טוען תצוגה מקדימה" /> :
      <iframe
        title="print-preview"
        id="print-iframe"
        className={iframeStyle}
        src={`./print.html?pdf=${blob ? blob : ""}`}
      >

      </iframe>
    }



  </div>;
}

export default Content;