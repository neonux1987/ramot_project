import React from 'react';
import useColumnUpdate from '../../../customHooks/useColumnUpdate';
import { css } from 'emotion';

const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;
`;

const textarea = css`
  outline-color: #000000;
  border: none;
  background: none;
  text-align: center;
  width: 100%;
  min-height: 100%;
  display: grid;
  align-content: center;
  white-space: pre-wrap;
  word-break: break-word;

  :hover,:focus,:active{
    border: 1px solid #000;
    outline: none;
  }
`;

const EditableTextareaColumn = props => {

  const [newValue, onChange] = useColumnUpdate(props.value);

  return <div className={wrapper}>
    <div
      contentEditable
      className={textarea}
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html: newValue
      }}
      onChange={onChange}
      {...props}
    />
  </div>;

};

export default React.memo(EditableTextareaColumn);