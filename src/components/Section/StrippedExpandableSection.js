// LIBRARIES
import React, { useState } from 'react';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import Collapsible from 'react-collapsible';
import { css } from 'emotion';

// CSS
import styles from './ExpandableSection.module.css';

const header = css`
  display: flex;
  padding: 0px 5px;
  /* border-bottom: 1px solid #e8eaf1; */
  line-height: 50px;
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

const collapsibleOuter = css`
  padding: 20px 20px;
  margin: -20px -20px;
`;

const collapsibleInner = css`
  padding: 0;
`;

export default ({ children, title = "", margin = "20px", TitleIcon, iconColor = "#000000" }) => {
  const [open, setOpen] = useState(true);

  const expandClick = () => {
    setOpen(!open);
  }

  const expandIcon = open ? <ExpandLess className={styles.expandIcon} /> : <ExpandMore className={styles.expandIcon} />

  const headerWrapper = () => {

    return <div>

      <div className={header}>

        <div className={css`
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          background: ${iconColor};
          box-shadow: 0px 0px 20px 0px rgba(44, 101, 144, 0.1);
          width: 50px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        `}>
          {TitleIcon}
        </div>

        <div className={css`
          display: flex;
          justify-content: flex-start;
          flex-grow: 1;
          font-weight: 600;
          color: #21558ceb;
          align-items: center;
          font-size: 1.500em;
          padding-right: 10px;
        `}>
          {title}
        </div>

        <div className={iconWrapper}>
          <div className={icon} onClick={expandClick}>
            {expandIcon}
          </div>
        </div>

      </div>

      <div style={{ height: "1px", borderRight: `120px solid ${iconColor}`, borderBottom: "1px dotted #ccc" }}></div>

    </div >;
  }

  return (
    <div className={css`margin: ${margin};`}>
      <Collapsible
        transitionTime={100}
        open={open}
        triggerDisabled={true}
        trigger={headerWrapper()}
        contentInnerClassName={collapsibleInner}
        contentOuterClassName={collapsibleOuter}
      >
        {children}
      </Collapsible>
    </div>
  );

}