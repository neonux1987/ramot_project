import React from 'react';
import { Icon as Icon_ } from '@iconify/react';

const useIconWrapper = () => {
  const getIcon = ({ iconName, width = 24, height = 24 }) => {
    return props => <Icon_ icon={iconName} width={width} height={height} {...props} />;
  }

  return [getIcon];
};

export default useIconWrapper;