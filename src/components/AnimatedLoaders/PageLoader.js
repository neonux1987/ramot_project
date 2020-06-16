import React from 'react';
import AppLoader from './AppLoader';

export default ({ style }) => {
  return <AppLoader loading={true} title={"טוען עמוד"} style={{ height: "75%", ...style }} />;
}