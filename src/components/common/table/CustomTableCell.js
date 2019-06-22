import React, { useRef } from 'react';
import { TableCell, withStyles } from '@material-ui/core';
import ColorCell from '../ColorCell';

const styles = theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: "16px",
    fontWeight: "bold"
  },
  alternativeHead: {
    backgroundColor: "#fff",
    color: "#000",
    fontSize: "16px",
    fontWeight: "bold"
  },
  body: {
    fontSize: "16px",
    border: "1px solid #e2e2e2"
  },
  root: {
    padding: "4px 24px 4px 24px",
    direction: "rtl"
  }
});

const CustomTableCell = props => {

  let editingInput = useRef(null);

  let rendered = props.children;
  if (props.edited && (props.editedId === props.itemId) && (props.itemName === props.editingLabel)) {
    rendered = <input ref={editingInput} type="text" defaultValue={props.children} onKeyPress={(event) => {
      if (event.key === "Enter") {
        console.log(event.target.value);
      }
    }} />
  }

  return (
    <ColorCell colored={props.colored} styles={props.styles} number={props.children} >
      {(bg, fontColor) =>
        <TableCell
          style={{ background: bg, color: fontColor }}
          align="center"
          classes={{ root: props.classes.root, head: (props.alternativeHead ? props.classes.alternativeHead : props.classes.head), body: props.classes.body }}
          onDoubleClick={(editingInput) => props.toggleEdit(editingInput, props.itemId, props.itemName)}
        >
          {rendered}
        </TableCell>
      }
    </ColorCell>

    //<TableCell align="center" classes={{ root: props.classes.root, head: (props.alternativeHead ? props.classes.alternativeHead : props.classes.head), body: props.classes.body }}>{props.children}</TableCell>
  );
};

export default withStyles(styles)(CustomTableCell);