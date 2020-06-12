// LIBRARIES
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GoodBye from 'react-goodbye';

// COMPONENTS
import LeaveWithoutSavingModal from '../components/modals/LeaveWithoutSavingModal/LeaveWithoutSavingModal';
import { setDirty } from '../redux/actions/goodByeActions';

const GoodByeWrapper = () => {
  const dispatch = useDispatch();

  const { dirty } = useSelector(store => store.goodBye)

  const ok = () => {

  }

  return <GoodBye when={dirty}>
    {({ isShow, handleOk, handleCancel }) =>
      isShow && (
        <LeaveWithoutSavingModal
          onAgreeHandler={() => {
            dispatch(setDirty(false));
            handleOk();
          }
          }
          onCancelHandler={handleCancel}
        />
      )
    }
  </GoodBye>;
}

export default GoodByeWrapper;