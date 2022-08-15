const CheckIcon = ({
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
      viewBox="0 0 16 16"
      color={color}
      style={style}
      className={className}
    >
      <path
        fill="currentColor"
        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06a.733.733 0 0 1 1.047 0l3.052 3.093l5.4-6.425a.247.247 0 0 1 .02-.022Z"
      />
    </svg>
  );
};

export default CheckIcon;
