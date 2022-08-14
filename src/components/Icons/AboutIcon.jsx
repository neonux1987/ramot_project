const AboutIcon = ({
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
        d="M14 18.32A7.06 7.06 0 0 1 11.28 16H3V4h18v2.26a7.08 7.08 0 0 1 2 2.15V4a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7v2H8v2h8v-2h-2Z"
      />
      <path
        fill="currentColor"
        d="M17 6a6 6 0 1 0 6 6a6 6 0 0 0-6-6Zm0 7.5a1.5 1.5 0 1 1 1.5-1.5a1.5 1.5 0 0 1-1.5 1.5Z"
      />
    </svg>
  );
};

export default AboutIcon;
