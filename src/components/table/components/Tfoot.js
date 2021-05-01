import React from 'react'

const Tfoot = ({ printMode, children }) => {
  return printMode ? <tfoot>
    <tr>
      <th>
        {children}
      </th>
    </tr>
  </tfoot> : <div>{children}</div>;
}

export default Tfoot;