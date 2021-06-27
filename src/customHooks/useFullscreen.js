import { useState } from 'react';

/* 
  this hook manages state to enable
  or disable fullscreen mode
*/
const useFullscreen = (status = false) => {

  const [isFullscreen, setIsFullscreen] = useState(status);

  const toggle = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
    }
    else {
      setIsFullscreen(false);
    }

  }

  return [isFullscreen, toggle];
};

export default useFullscreen;