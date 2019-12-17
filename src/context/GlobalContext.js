import React from 'react';

const GlobalContext = React.createContext({
  groupColors: {
    0: "rgb(112, 81, 185)",
    1: "rgb(69, 129, 206)",
    2: "rgb(56, 167, 124)",
    3: "rgb(220, 60, 96)",
    4: "orange",
  }
});

export default GlobalContext;