const WarningIcon = ({
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
        d="M1 21h22L12 2L1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
      />
    </svg>
  );
};

export default WarningIcon;
