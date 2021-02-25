import React from 'react';
import { css } from 'emotion';
import { Edit } from '@material-ui/icons';

const iconWrapper = css`
  position: absolute;
  top: 5px;
  right: 2px;
`;

const icon = css`
  color: #5a5c65;
`;

const EditIcon = ({ show }) => {

  return <div>
    {show ? <div className={iconWrapper}>
      <Edit className={icon} />
    </div> : null}
  </div>;

};

export default React.memo(EditIcon);