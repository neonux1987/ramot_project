import React from 'react'

const Thead = ({ printMode, children }) => {
  return printMode ? <thead>
    <tr>
      <th>
        {children}
      </th>
    </tr>
  </thead> : <div>{children}</div>;
}

export default Thead;