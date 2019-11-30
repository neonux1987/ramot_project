import React from 'react';

const themeContext = React.createContext({
  groupColors: {
    1: "rgb(76, 139, 218)",
    2: "rgb(107, 187, 139)",
    3: "rgb(218, 87, 87)",
    4: "rgb(75, 81, 95)",
    5: "orange",
  }
});

export default themeContext;