const StyleIcon = ({
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
      viewBox="0 0 512 512"
      color={color}
      style={style}
      className={className}
    >
      <path
        fill="currentColor"
        d="M512 255.1c0 1.8-.9 2.7-.9 3.6c.5 36.5-32.7 60.4-69.2 60.4H344c-26.5 0-48 22.4-48 48.9c0 3.4.4 6.7 1 9.9c2.2 10.2 6.5 19.2 10.9 29.9c6 13.8 12.1 27.5 12.1 42c0 31.9-21.6 60.7-53.4 62c-3.5.1-7.1.2-10.6.2C114.6 512 0 397.4 0 256S114.6 0 256 0s256 114.6 256 256v-.9zm-416 0c-17.67 0-32 15.2-32 32c0 18.6 14.33 32 32 32c17.7 0 32-13.4 32-32c0-16.8-14.3-32-32-32zm32-64c17.7 0 32-13.4 32-32c0-16.8-14.3-32-32-32s-32 15.2-32 32c0 18.6 14.3 32 32 32zm128-128c-17.7 0-32 15.23-32 32c0 18.6 14.3 32 32 32s32-13.4 32-32c0-16.77-14.3-32-32-32zm128 128c17.7 0 32-13.4 32-32c0-16.8-14.3-32-32-32s-32 15.2-32 32c0 18.6 14.3 32 32 32z"
      />
    </svg>
  );
};

export default StyleIcon;
