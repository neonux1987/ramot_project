const HistoryIcon = ({
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
        d="m10.414 3l2 2H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414zm-.828 2H4v14h16V7h-8.414l-2-2zM13 9v4h3v2h-5V9h2z"
      />
    </svg>
  );
};

export default HistoryIcon;
