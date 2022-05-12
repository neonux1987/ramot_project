import React from 'react';
import AppLoader from './AppLoader';

const PageLoader = ({ style }) => {
  return <AppLoader loading={true} title={"טוען עמוד"} style={{ height: "75%", ...style }} />;
}

export default PageLoader;