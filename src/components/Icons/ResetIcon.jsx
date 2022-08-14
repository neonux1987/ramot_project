const ResetIcon = ({
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
        d="M12 22q-1.875 0-3.512-.712q-1.638-.713-2.85-1.926q-1.213-1.212-1.926-2.85Q3 14.875 3 13h2q0 2.925 2.038 4.962Q9.075 20 12 20t4.962-2.038Q19 15.925 19 13t-2.038-4.963Q14.925 6 12 6h-.15l1.55 1.55L12 9L8 5l4-4l1.4 1.45L11.85 4H12q1.875 0 3.513.713q1.637.712 2.85 1.924q1.212 1.213 1.925 2.85Q21 11.125 21 13t-.712 3.512q-.713 1.638-1.925 2.85q-1.213 1.213-2.85 1.926Q13.875 22 12 22Z"
      />
    </svg>
  );
};

export default ResetIcon;
