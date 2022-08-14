const ExpensesIcon = ({ width = "24px", height = "24px", color, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 256 256"
      color={color}
      style={style}
    >
      <path
        fill="currentColor"
        d="M204 168a52 52 0 0 1-52 52h-12v12a12 12 0 0 1-24 0v-12h-12a52 52 0 0 1-52-52a12 12 0 0 1 24 0a28.1 28.1 0 0 0 28 28h48a28 28 0 0 0 0-56h-44a52 52 0 0 1 0-104h8V24a12 12 0 0 1 24 0v12h4a52 52 0 0 1 52 52a12 12 0 0 1-24 0a28.1 28.1 0 0 0-28-28h-36a28 28 0 0 0 0 56h44a52 52 0 0 1 52 52Z"
      />
    </svg>
  );
};

export default ExpensesIcon;
