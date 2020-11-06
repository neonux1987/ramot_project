import React from 'react';
import Row from './Row';

export default ({ gridTemplateColumns, style = {}, children }) => {
    return (
        <Row
            style={{
                borderBottom: "none",
                borderTopRightRadius: "4px",
                borderTopLeftRadius: "4px",
                borderTop: "1px solid #e3eaec",
                borderLeft: "1px solid #e3eaec",
                backgroundColor: "rgb(247, 248, 249)",
                //boxShadow: "rgba(53, 64, 82, 0.05) 0px 0px 14px 0px",
                ...style
            }}
            gridTemplateColumns={gridTemplateColumns}
        >
            {children}
        </Row>
    );
}