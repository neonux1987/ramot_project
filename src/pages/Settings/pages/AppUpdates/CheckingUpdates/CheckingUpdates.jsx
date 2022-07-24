import React from 'react';
import { container } from './CheckingUpdates.module.css';
import PacmanLoader from '../../../../../components/AnimatedLoaders/PacmanLoader';

const CheckingUpdates = ({ loading }) => {
  return (
    <div className={container} >
      <PacmanLoader loading={loading} loaderColor="#d9dc22" title={"בודק אם קיימים עדכונים חדשים"} />
    </div>
  );
};

export default CheckingUpdates;