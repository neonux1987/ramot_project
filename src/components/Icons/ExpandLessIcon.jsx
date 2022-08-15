const ExpandLessIcon = ({
  width = "24px",
  height = "24px",
  color,
  style,
  className
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      color={color}
      style={style}
      className={className}
    >
      <path
        fill="currentColor"
        d="M6.7 14.675q-.275-.275-.275-.7q0-.425.275-.7l4.6-4.6q.15-.15.325-.213Q11.8 8.4 12 8.4t.375.062q.175.063.325.213l4.625 4.625q.275.275.275.675t-.3.7q-.275.275-.7.275q-.425 0-.7-.275l-3.9-3.9L8.075 14.7q-.275.275-.675.275t-.7-.3Z"
      />
    </svg>
  );
};

export default ExpandLessIcon;
