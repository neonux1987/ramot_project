const PrintIcon = ({ width = "24px", height = "24px", color, style }) => {
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
        d="M4 3.5A1.5 1.5 0 0 1 5.5 2h5A1.5 1.5 0 0 1 12 3.5V4h1a2 2 0 0 1 2 2v4.5a1.5 1.5 0 0 1-1.5 1.5h-1.4v.5a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 12.5V12H2.5A1.5 1.5 0 0 1 1 10.5V6a2 2 0 0 1 2-2h1v-.5Zm7 .5v-.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V4h6ZM4 5H3a1 1 0 0 0-1 1v4.5a.5.5 0 0 0 .5.5H4v-.5A1.5 1.5 0 0 1 5.5 9h5.1a1.5 1.5 0 0 1 1.5 1.5v.5h1.4a.5.5 0 0 0 .5-.5V6a1 1 0 0 0-1-1H4Zm1.5 5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h5.1a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5H5.5Z"
      />
    </svg>
  );
};

export default PrintIcon;
