const MenuIcon = ({
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
        d="M12 18H3v-2h9v2Zm9-5H3v-2h18v2Zm0-5h-9V6h9v2Z"
      />
    </svg>
  );
};

export default MenuIcon;
