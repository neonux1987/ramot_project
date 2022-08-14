const StatsIcon = ({ width = "24px", height = "24px", color, style }) => {
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
    >
      <path
        fill="currentColor"
        d="M1.75 13.25V1.5H.5v12a1.24 1.24 0 0 0 1.22 1H15.5v-1.25z"
      />
      <path
        fill="currentColor"
        d="M3.15 8H4.4v3.9H3.15zm3.26-4h1.26v7.9H6.41zm3.27 2h1.25v5.9H9.68zm3.27-3.5h1.25v9.4h-1.25z"
      />
    </svg>
  );
};

export default StatsIcon;
