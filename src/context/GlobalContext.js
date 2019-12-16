import React from 'react';

const GlobalContext = React.createContext({
  groupColors: {
    0: "rgb(76, 139, 218)",
    1: "rgb(107, 187, 139)",
    2: "rgb(218, 87, 87)",
    3: "rgb(75, 81, 95)",
    4: "orange",
  }
});

export default GlobalContext;