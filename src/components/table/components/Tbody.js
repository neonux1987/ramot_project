import React from 'react'

const Tbody = ({ printMode, children, divProps = {} }) => {
  return printMode ? <tbody>
    {children}
  </tbody> : <div {...divProps}>{children}</div>;
}

export default Tbody;