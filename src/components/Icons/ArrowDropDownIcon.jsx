const ArrowDropDownIcon = ({
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
      <path fill="currentColor" d="m12 15l-5-5h10Z" />
    </svg>
  );
};

export default ArrowDropDownIcon;
