import React from 'react';
import { AlignCenterMiddle } from '../AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../Spinner/Spinner';

const CenteredLoader = ({ text = "טוען נתונים" }) => <AlignCenterMiddle>
  <Spinner loadingText={text} />
</AlignCenterMiddle>;

export default CenteredLoader;