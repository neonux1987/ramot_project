// LIBRARIES
import React, { useState } from 'react';
import Collapse from '@material-ui/core/Collapse';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { css } from 'emotion';

// CSS
import styles from './ExpandableSection.module.css';
import DefaultLoader from '../AnimatedLoaders/DefaultLoader';
import StyledSection from './StyledSection';

const _content = css`
  padding: 20px 15px;
`;

const ExpandableSection = ({
  title,
  Icon,
  bgColor,
  children,
  extraDetails,
  loading = false
}) => {

  const [open, setOpen] = useState(true);

  const expandClick = () => {
    setOpen(!open);
  }

  const expandIcon = open ? <ExpandLess className={styles.expandIcon} /> : <ExpandMore className={styles.expandIcon} />

  const ExtraDetails = () => <div className={styles.extraDetailsWrapper}>
    <div>
      {extraDetails}
    </div>

    <div className={styles.expandIconWrapper} onClick={expandClick}>
      {expandIcon}
    </div>
  </div>;

  return <StyledSection
    title={title}
    Icon={Icon}
    bgColor={bgColor}
    extraDetails={<ExtraDetails />}
  >
    <Collapse
      timeout={300}
      in={open}
    >
      <div className={_content}>
        {loading ? <DefaultLoader loading={loading} /> : children}
      </div>
    </Collapse>
  </StyledSection>

}

export default ExpandableSection;