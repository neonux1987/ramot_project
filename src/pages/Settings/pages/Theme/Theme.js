// LIBRARIES
import React, { useState } from 'react';
import { Style } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

// COMPONENTS
import SettingsExpandableSection from '../../../../components/Section/SettingsExpandableSection/SettingsExpandableSection';
import CheckboxWithLabel from '../../../../components/CheckboxWithLabel/CheckboxWithLabel';
import GoodByeWrapper from '../../../../goodbye/GoodByeWrapper';
import TitleTypography from '../../../../components/Typographies/TitleTypography';

// ACTIONS
import { updateSettings, saveSettings } from '../../../../redux/actions/settingsActions';
import { setDirty } from '../../../../redux/actions/goodByeActions';
import Page from '../../../../components/Page/Page';

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
    <Page>

      <SettingsExpandableSection
        title={"עיצוב"}
        Icon={Style}
        bgColor={"#0365a2"}
        onSaveClick={save}
      >

        <TitleTypography>
          כללי:
        </TitleTypography>

        <CheckboxWithLabel label="סרגל כלים דביק" name="sticky_toolbar" value={data.sticky_toolbar} onChange={onCheckChange} />

      </SettingsExpandableSection >

      <GoodByeWrapper />
    </Page>
  );

}

export default Theme;