import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Prompt, useHistory } from "react-router";
import LeaveWithoutSavingModal from "../components/modals/LeaveWithoutSavingModal/LeaveWithoutSavingModal";
import { setDirty } from "../redux/actions/routerPromptActions";
import useModalLogic from "../customHooks/useModalLogic";
import { useEffect } from "react";
import { useRef } from "react";

const RouterPrompt = () => {
  const history = useHistory();
  const { dirty } = useSelector((store) => store.routerPrompt);
  const [currentPath, setCurrentPath] = useState("");
  const [agree, setAgree] = useState(false);
  const dispatch = useDispatch();
  const { showModal, hideModal } = useModalLogic();
  const onAgreeLogicRef = useRef();

  onAgreeLogicRef.current = () => {
    hideModal();
    dispatch(setDirty(false));
    history.push(currentPath.pathname, currentPath.state);
    setAgree(false);
  };

  useEffect(() => {
    if (agree) {
      onAgreeLogicRef.current();
    }
  }, [agree]);

  const allowTransition = (location) => {
    if (dirty && !agree) {
      setCurrentPath(location);
      showModalHandler();
      return false;
    }

    return true;
  };

  const showModalHandler = () => {
    showModal(LeaveWithoutSavingModal, {
      onAgreeHandler,
      onCancelHandler,
      onBackdropClickHandler: onCancelHandler
    });
  };

  const onCancelHandler = () => {
    hideModal();
  };

  const onAgreeHandler = () => {
    setAgree(true);
  };

  return <Prompt message={allowTransition} />;
};

export default RouterPrompt;
