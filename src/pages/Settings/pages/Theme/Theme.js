// LIBRARIES
import React, { useState } from 'react';
import { Style } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

// COMPONENTS
import SettingsExpandableSection from '../../../../components/Section/SettingsExpandableSection/SettingsExpandableSection';
import GoodByeWrapper from '../../../../goodbye/GoodByeWrapper';
import TitleTypography from '../../../../components/Typographies/TitleTypography';
import Page from '../../../../components/Page/Page';
import ColorSeries from './ColorSeries';
import Note from '../../../../components/Note/Note';

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

  const onColorSetChange = (colorSet) => {
    setData({
      ...data,
      colorSet
    });
    dispatch(setDirty(true));
  }

  return (
    <Page>

      <SettingsExpandableSection
        title={"עיצוב"}
        Icon={Style}
        onSaveClick={save}
      >

        <TitleTypography>
          סדרת צבעים:
        </TitleTypography>

        <Note margin="0 0 20px" text="סדרת הצבעים משמשת את צביעת החודשים והרבעונים בטבלאות מימין לשמאל" important />

        <ColorSeries colorSet={data.colorSet} defaultColorSet={data.defaultColorSet} action={onColorSetChange} />

      </SettingsExpandableSection >

      <GoodByeWrapper />
    </Page>
  );

}

export default Theme;