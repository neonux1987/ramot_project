import React from 'react';

const GlobalContext = React.createContext({
  groupColors: {
    0: "rgb(112, 81, 185)",
    1: "rgb(56, 109, 177)",
    2: "rgb(49, 146, 108)",
    3: "rgb(220, 60, 96)",
    4: "#F84D1E",
  }
});

export default GlobalContext;