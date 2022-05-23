import React from 'react';
import Box from '@material-ui/core/Box';
import { Collapse, Paper, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import ExpandButton from '../buttons/ExpandButton';

const TitledSection = ({ title = "", children, TitleIcon, margin = "20px 0", collapsable = true }) => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const expandIcon = checked ? <ExpandLess /> : <ExpandMore />;

  return (
    <Box margin={margin} bgcolor="#ffffff">
      <Box id="titled-section-header" display="flex" alignItems="center" bgcolor="rgb(23 110 193)" height="70px" paddingLeft="15px">
        <Box color="#ffffff" marginRight="10px" >{TitleIcon}</Box>
        <Box flexGrow="1"><Typography style={{ color: "#ffffff" }} variant='h5'>{title}</Typography></Box>
        {
          collapsable && <Box marginRight="10px"><ExpandButton checked={checked} onClick={handleChange} /></Box>
        }
      </Box>

      <Collapse in={checked}>
        <div>
          {children}
        </div>
      </Collapse>

    </Box>
  );
}

export default TitledSection;