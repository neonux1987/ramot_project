// LIBRARIES
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from 'emotion';
import '../../cssTransitions/fade.css';
import { hideSavedNotification } from "../../redux/actions/savedNotificationActions";
import { useSound } from "../../soundManager/SoundManager";
import { Fade } from "@material-ui/core";

const container = css`
  background: rgb(47, 53, 58);
  padding: 6px 16px;
  border-radius: 3px;
  color: #ffffff;
  z-index: 888;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  `;

const SavedNotification = () => {
  const dispatch = useDispatch();
  const { show } = useSelector(store => store.savedNotification);
  console.log("why");
  const { play, types } = useSound(null);

  if (show)
    play(types.action);

  const onEntered = useCallback(() => {
    dispatch(hideSavedNotification())
  }, [dispatch]);

  return (
    <Fade
      in={show}
      timeout={600}
      onEntered={onEntered}
    >
      <div className={container}>
        <span>נשמר!</span>
      </div>
    </Fade>
  );

}

export default React.memo(SavedNotification);