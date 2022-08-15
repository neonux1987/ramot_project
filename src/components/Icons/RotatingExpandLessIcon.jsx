import { css } from "emotion";
import ExpandLessIcon from "../Icons/ExpandLessIcon";

const expandIconCss = css`
  transition: transform ease 0.3s;
`;

const rotate = css`
  transform: rotate(180deg);
`;

const RotatingExpandLessIcon = ({ open, className, ...otherProps }) => (
  <ExpandLessIcon
    className={`${expandIconCss} ${!open ? rotate : ""} ${className}`}
    {...otherProps}
  />
);

export default RotatingExpandLessIcon;
