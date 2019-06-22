import React from 'react';

const TableBodyRowCol = (props) => {

    return (
        <td className={"col-"+props.colSize}>{props.colData}</td>
    );

}

export default TableBodyRowCol;