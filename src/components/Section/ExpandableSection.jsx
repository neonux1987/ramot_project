import React, { useState } from 'react';
import Collapse from '@material-ui/core/Collapse';
import { css } from 'emotion';
import styles from './ExpandableSection.module.css';
import DefaultLoader from '../AnimatedLoaders/DefaultLoader';
import StyledSection from './StyledSection';
import ExpandButton from '../buttons/ExpandButton';

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

  return <StyledSection
    title={title}
    Icon={Icon}
    bgColor={bgColor}
    extraDetails={<ExtraDetails extraDetails={extraDetails} open={open} expandClick={expandClick} style={styles.expandIconWrapper} />}
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

const ExtraDetails = ({ extraDetails, open, expandClick, style }) => <div className={styles.extraDetailsWrapper}>
  <div>
    {extraDetails}
  </div>

  <div className={style}>
    <ExpandButton checked={open} onClick={expandClick} />
  </div>
</div>;