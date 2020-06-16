// LIBRARIES
import React, { Fragment, useState } from 'react';
import { Style } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

// COMPONENTS
import StyledExpandableSection from '../../../../components/Section/StyledExpandableSection';
import SaveButton from '../../../../components/SaveButton/SaveButton';
import CheckboxWithLabel from '../../../../components/CheckboxWithLabel/CheckboxWithLabel';
import GoodByeWrapper from '../../../../goodbye/GoodByeWrapper';
import TitleTypography from '../../../../components/Typographies/TitleTypography';

// ACTIONS
import { updateSettings, saveSettings } from '../../../../redux/actions/settingsActions';
import { setDirty } from '../../../../redux/actions/goodByeActions';

const SETTINGS_NAME = "theme";

export const Theme = () => {

  const dispatch = useDispatch();

  // state
  const settings = useSelector(store => store.settings.data.theme);

  const [data, setData] = useState(settings);

  const save = async (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };

    dispatch(updateSettings(SETTINGS_NAME, dataCopy))
    dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
      dispatch(setDirty(false));
    });
  }

  const onCheckChange = (event) => {
    const { name, checked } = event.target;
    setData({
      ...data,
      [name]: checked
    });
    dispatch(setDirty());
  }

  return (
    <Fragment>

      <StyledExpandableSection
        title={"עיצוב"}
        TitleIcon={Style}
        iconColor={"#0365a2"}
        extraDetails={() => <SaveButton onClick={save}>שמור</SaveButton>}
        padding={"30px 20px"}
      >

        <TitleTypography>
          כללי:
        </TitleTypography>

        <CheckboxWithLabel label="סרגל כלים דביק" name="sticky_toolbar" value={data.sticky_toolbar} onChange={onCheckChange} />

      </StyledExpandableSection >

      <GoodByeWrapper />
    </Fragment>
  );

}

export default Theme;