// LIBRARIES
import React, { useState } from 'react';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import Collapsible from 'react-collapsible';
import { css } from 'emotion';

// CSS
import styles from './ExpandableSection.module.css';

const container = css`
  margin: 20px 20px 40px;
`;

const header = css`
  display: flex;
  padding: 0px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  line-height: 60px;
`;

const titleWrapper = css`
  display: flex;
  justify-content: flex-start;
  flex-grow: 1;
  font-weight: 400;
  color: #3f414d;
  align-items: center;
  font-size: 1.500em;
`;

const iconWrapper = css`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

const icon = css`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const collapsibleInner = css`
  padding-top: 20px;
`;

export default ({ children, title = "" }) => {
  const [open, setOpen] = useState(true);

  const expandClick = () => {
    setOpen(!open);
  }

  const expandIcon = open ? <ExpandLess className={styles.expandIcon} /> : <ExpandMore className={styles.expandIcon} />

  const headerWrapper = () => {

    return <div className={header}>

      <div className={titleWrapper}>
        {title}
      </div>

      <div className={iconWrapper}>
        <div className={icon} onClick={expandClick}>
          {expandIcon}
        </div>
      </div>

    </div>;
  }

  return (
    <div className={container}>
      <Collapsible
        transitionTime={100}
        open={open}
        triggerDisabled={true}
        trigger={headerWrapper()}
        contentInnerClassName={collapsibleInner}
      >
        {children}
      </Collapsible>
    </div>
  );

}