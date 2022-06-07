import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFullScreenMode } from "../../../redux/actions/fullscreenActions";
import FullScreenButton from "../../buttons/FullScreenButton";
import styles from "./TableControls.module.css";

const TableControls = ({
  style,
  rightPane,
  middlePane,
  leftPane,
  withFullscreen = true,
}) => {
  const dispatch = useDispatch();
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);

  const onClick = useCallback(() => {
    dispatch(toggleFullScreenMode());
  }, [dispatch]);

  return (
    <div className={styles.wrapper} style={style} id="tableControls">
      <div className={styles.controls}>
        <div className={styles.rightPane}>{rightPane}</div>

        <div className={styles.middlePane}>{middlePane}</div>

        <div className={styles.leftPane}>{leftPane}</div>

        <div className={styles.fullscreen}>
          {withFullscreen ? (
            <FullScreenButton isFullscreen={isFullscreen} onClick={onClick} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TableControls;
