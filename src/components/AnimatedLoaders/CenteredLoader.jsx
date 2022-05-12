import React from 'react';
import { AlignCenterMiddle } from '../AlignCenterMiddle/AlignCenterMiddle';
import Spinner from '../Spinner/Spinner';

const CenteredLoader = ({ text = "טוען נתונים", color }) => <AlignCenterMiddle>
  <Spinner loadingText={text} color={color} />
</AlignCenterMiddle>;

export default CenteredLoader;