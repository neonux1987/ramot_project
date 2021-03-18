import React from 'react';
import AlignCenterMiddle from '../AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../Spinner/Spinner';

const CenteredLoader = () => <AlignCenterMiddle>
  <Spinner loadingText={"טוען נתונים"} />
</AlignCenterMiddle>;

export default CenteredLoader;