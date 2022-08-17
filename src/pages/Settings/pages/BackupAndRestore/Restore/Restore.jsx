import React, { useEffect, useState } from "react";
import { Typography, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ExpandableSection from "../../../../../components/Section/ExpandableSection";
import Separator from "../../../../../components/Seperator/Separator";
import RestoreFromList from "./RestoreFromList/RestoreFromList";
import RestoreFromFile from "./RestoreFromFile/RestoreFromFile";
import { fetchRegisteredBackups } from "../../../../../redux/actions/registeredBackupsActions";
import DefaultLoader from "../../../../../components/AnimatedLoaders/DefaultLoader";
import { selectFileDialog } from "../../../../../services/electronDialogs.svc";
import { resetDB, restore } from "../../../../../services/restoreDbService";
import { toastManager } from "../../../../../toasts/toastManager";
import useModalLogic from "../../../../../customHooks/useModalLogic";
import ConfirmDbRestoreModal from "../../../../../components/modals/ConfirmDbRestoreModal/ConfirmDbRestoreModal";
import WhiteButton from "../../../../../components/buttons/WhiteButton";
import RestoreIco from "../../../../../components/Icons/RestoreIcon";
import CheckboxWithLabel from "../../../../../components/Checkboxes/CheckboxWithLabel";
import ResetDB from "./ResetDB/ReseDB";
import ConfirmReset from "../../../../../components/modals/ConfirmReset/ConfirmReset";

const RestoreIcon = (props) => (
  <RestoreIco width="30px" height="30px" {...props} />
);

const NO_BACKUPS_MESSAGE = "לא קיימים גיבויים שמורים";

const Restore = () => {
  const dispatch = useDispatch();
  const { showModal } = useModalLogic();
  const { isFetching, data } = useSelector((store) => store.registeredBackups);
  const [selectedBackupDate, setSelectedBackupDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [checkBoxValue, setCheckBoxValue] = useState({
    byList: true,
    byFile: false
  });
  const [withConfig, setWithConfig] = useState(true);

  useEffect(() => {
    dispatch(fetchRegisteredBackups()).then(({ data }) => {
      if (data.length === 0) setSelectedBackupDate(NO_BACKUPS_MESSAGE);
      else setSelectedBackupDate(data[0].fileName);
    });
  }, [dispatch]);

  const backupsNamesRender =
    data.length > 0 ? (
      data.map((backup, index) => {
        const date = new Date(backup.backupDateTime);
        const formatter = new Intl.DateTimeFormat("he-IL", {
          dateStyle: "short",
          timeStyle: "short"
        });
        const formattedDate = formatter.format(date);

        return (
          <MenuItem value={backup.fileName} key={index}>
            {formattedDate}
          </MenuItem>
        );
      })
    ) : (
      <MenuItem value="לא קיימים גיבויים שמורים" disabled>
        לא קיימים גיבויים
      </MenuItem>
    );

  const onBackupDateChangeHandler = (event) => {
    const { value } = event.target;
    setSelectedBackupDate(value);
  };

  const selectDbFileHandler = () => {
    selectFileDialog().then(({ canceled, filePaths }) => {
      if (!canceled) {
        setSelectedFile(filePaths[0]);
      } // end if
    }); //end selectFolderDialog
  };

  const onCheckBoxChangeHandler = (event) => {
    const { name } = event.target;

    switch (name) {
      case "byList":
        setCheckBoxValue({
          byFile: false,
          byList: true,
          byReset: false
        });
        break;
      case "byFile":
        setCheckBoxValue({
          byList: false,
          byFile: true,
          byReset: false
        });
        break;
      default:
        setCheckBoxValue({
          byFile: false,
          byList: false,
          byReset: true
        });
    }
  };

  const onCheckBoxWithConfigChangeHandler = () => {
    setWithConfig((prev) => !prev);
  };

  const restoreHandler = () => {
    const { byList, byFile } = checkBoxValue;

    // if the byList is checked then set the file name
    // from the list, otherwise byFile is checked so
    // set the name of the user selected file
    const payload = {
      fileName: byList ? selectedBackupDate : selectedFile,
      withConfig
    };

    if (byFile && selectedFile === null) {
      toastManager.error("לא נבחר קובץ");
      return;
    }

    showModal(ConfirmDbRestoreModal, {
      onAgreeHandler: () => restore(payload, byList)
    });
  };

  const resetHandler = () => {
    showModal(ConfirmReset, {
      onAgreeHandler: () => resetDB({ withConfig })
    });
  };

  const initSelectedFile = () => setSelectedFile(null);

  const render = isFetching ? (
    <DefaultLoader loading={isFetching} />
  ) : (
    <>
      <RestoreFromList
        onBackupDateChangeHandler={onBackupDateChangeHandler}
        selectedBackupDate={selectedBackupDate}
        backupsNamesRender={backupsNamesRender}
        onCheckBoxChangeHandler={onCheckBoxChangeHandler}
        byList={checkBoxValue.byList}
      />

      <Separator title={"או"} />

      <RestoreFromFile
        selectDbFileHandler={selectDbFileHandler}
        selectedFile={selectedFile}
        onCheckBoxChangeHandler={onCheckBoxChangeHandler}
        byFile={checkBoxValue.byFile}
        initSelectedFile={initSelectedFile}
      />

      <Separator title={"או"} />

      <ResetDB
        onCheckBoxChangeHandler={onCheckBoxChangeHandler}
        byReset={checkBoxValue.byReset}
      />

      <Separator title={""} />
      <Separator title={""} />

      <CheckboxWithLabel
        label={`כולל ${
          checkBoxValue.byReset ? "איפוס" : "שיחזור"
        } של קובץ הגדרות?`}
        checked={withConfig}
        onChange={onCheckBoxWithConfigChangeHandler}
        name="withConfig"
      />

      <Separator title={""} />
      <Separator title={""} />

      <Typography variant="body2">
        *לתשומת ליבך, לפני ביצוע שיחזור או איפוס, אנא בצע גיבוי ידני למקרה חירום
        במידה ויש אפשרות
      </Typography>

      {(checkBoxValue.byFile || checkBoxValue.byList) && (
        <WhiteButton margin="8px 0 0" onClick={restoreHandler}>
          בצע שיחזור
        </WhiteButton>
      )}

      {checkBoxValue.byReset && (
        <WhiteButton margin="8px 0 0" onClick={resetHandler}>
          בצע איפוס
        </WhiteButton>
      )}
    </>
  );

  return (
    <ExpandableSection title={"שיחזור בסיס נתונים והגדרות"} Icon={RestoreIcon}>
      {render}
    </ExpandableSection>
  );
};

export default Restore;
