import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SettingsExpandableSection from "../../../../components/Section/SettingsExpandableSection/SettingsExpandableSection";
import TitleTypography from "../../../../components/Typographies/TitleTypography";
import Page from "../../../../components/Page/Page";
import ColorSeries from "./ColorSeries";
import Note from "../../../../components/Note/Note";
import {
  updateSpecificSettings,
  saveSettings
} from "../../../../redux/actions/settingsActions";
import { setDirty } from "../../../../redux/actions/routerPromptActions";
import StyleIcon from "../../../../components/Icons/StyleIcon";

const SETTINGS_NAME = "theme";

export const Theme = () => {
  const dispatch = useDispatch();
  const settings = useSelector((store) => store.settings.data.theme);
  const [data, setData] = useState(settings);

  const save = async (event) => {
    event.stopPropagation();

    const dataCopy = { ...data };

    dispatch(updateSpecificSettings(SETTINGS_NAME, dataCopy));
    dispatch(saveSettings(SETTINGS_NAME, dataCopy)).then(() => {
      dispatch(setDirty(false));
    });
  };

  const onColorSetChange = (colorSet) => {
    setData({
      ...data,
      colorSet
    });
    dispatch(setDirty(true));
  };

  return (
    <Page>
      <SettingsExpandableSection
        title={"עיצוב"}
        Icon={StyleIcon}
        onSaveClick={save}
      >
        <TitleTypography>סדרת צבעים:</TitleTypography>

        <Note
          margin="0 0 20px"
          text="סדרת הצבעים משמשת את צביעת החודשים והרבעונים בטבלאות מימין לשמאל"
          important
        />

        <ColorSeries
          colorSet={data.colorSet}
          defaultColorSet={data.defaultColorSet}
          action={onColorSetChange}
        />
      </SettingsExpandableSection>
    </Page>
  );
};

export default Theme;
