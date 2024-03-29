// LIBRARIES
import React from "react";
import { Menu, Divider, Box } from "@material-ui/core";
import styles from "./MoreMenu.module.css";
import SubMenu from "./SubMenu/SubMenu";
import { initiateDbBackup } from "../../../../services/dbBackup.svc";
import { toastManager } from "../../../../toasts/toastManager";
import ToastRender from "../../../../components/ToastRender/ToastRender";
import { purgeCache } from "../../../../redux/actions/persistorActions";
import { refreshView, restartApp } from "../../../../services/mainProcess.svc";
import MoreMenuNavLinkItem from "../../../../components/moreMenu/MoreMenuNavLinkItem";
import MoreMenuItem from "../../../../components/moreMenu/MoreMenuItem";
import MoreButton from "../MoreButton/MoreButton";
import useModalLogic from "../../../../customHooks/useModalLogic";
import EditVatModal from "../../../../components/modals/EditVatModal/EditVatModal";
import PercentIcon from "../../../../components/Icons/PercentIcon";
import RotatingExpandLessIcon from "../../../../components/Icons/RotatingExpandLessIcon";
import DescriptionIcon from "../../../../components/Icons/DescriptionIcon";
import HomeIcon from "../../../../components/Icons/HomeIcon";
import ListIcon from "../../../../components/Icons/ListIcon";

const MoreMenu = ({ active }) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { showModal } = useModalLogic();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const taxClickHandler = () => {
    handleClose();
    showModal(EditVatModal);
  };

  const restartAppHandler = () => {
    restartApp();
  };

  const expandClick = () => {
    setOpen(!open);
  };

  const upgradedHandleClose = () => {
    handleClose();
    setOpen(false);
  };

  const clearCache = () => {
    purgeCache().then(() => {
      toastManager.success(
        "ניקוי היסטוריית מטמון בוצע בהצלחה. המערכת תרענן את העמוד.",
        {
          autoClose: 2500,
          onClose: () => refreshView()
        }
      );
    });
  };

  const dbBackupHandler = async () => {
    const id = toastManager.info(
      <ToastRender spinner={true} message={"גיבוי בסיס נתונים החל..."} />,
      {
        autoClose: false
      }
    );

    const promise = await initiateDbBackup().catch((result) => {
      toastManager.update(id, {
        render: <ToastRender message={result.error} />,
        type: toastManager.types.ERROR,
        delay: 3000,
        autoClose: 2500
      });
    });

    // success
    if (promise)
      toastManager.update(id, {
        render: (
          <ToastRender
            done={true}
            message={"גיבוי בסיס הנתונים הסתיים בהצלחה."}
          />
        ),
        type: toastManager.types.SUCCESS,
        delay: 2000,
        autoClose: 1500
      });
  };

  return (
    <Box display="flex" justifyContent="flex-start">
      <MoreButton
        className={styles.moreBtn}
        onClick={handleClick}
        active={active}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={upgradedHandleClose}
        className={styles.container}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        getContentAnchorEl={null}
      >
        <MoreMenuNavLinkItem
          icon={<DescriptionIcon />}
          label="הפקת דוחות"
          onClick={upgradedHandleClose}
          to={{
            pathname: "/ניהול/הפקת דוחות",
            state: {
              page: "הפקת דוחות",
              buildingName: "ניהול",
              buildingId: "management"
            }
          }}
        />

        <MoreMenuNavLinkItem
          icon={<HomeIcon />}
          label="ניהול בניינים"
          onClick={upgradedHandleClose}
          to={{
            pathname: "/ניהול/ניהול בניינים",
            state: {
              page: "ניהול בניינים",
              buildingName: "ניהול",
              buildingId: "management"
            }
          }}
        />

        <MoreMenuNavLinkItem
          icon={<ListIcon />}
          label="ניהול קודי הנהלת חשבונות"
          onClick={upgradedHandleClose}
          to={{
            pathname: "/ניהול/ניהול קודי הנהלת חשבונות/קודי הנהלת חשבונות",
            state: {
              page: "קודי הנהלת חשבונות",
              buildingName: "ניהול",
              buildingId: "management"
            }
          }}
        />

        <MoreMenuNavLinkItem
          icon={<ListIcon style={{ color: "#0e7ab9" }} />}
          label="ניהול סעיפים מסכמים"
          onClick={upgradedHandleClose}
          to={{
            pathname: "/ניהול/סעיפים מסכמים",
            state: {
              page: "סעיפים מסכמים",
              buildingName: "ניהול",
              buildingId: "management"
            }
          }}
        />

        <MoreMenuItem
          icon={<PercentIcon width="18px" height="18px" />}
          label={`שינוי מע"מ`}
          onClick={taxClickHandler}
        />

        <Divider style={{ margin: "8px" }} />

        <MoreMenuItem label="עוד..." onClick={expandClick}>
          <RotatingExpandLessIcon open={open} />
        </MoreMenuItem>

        <SubMenu
          open={open}
          restartAppHandler={restartAppHandler}
          dbBackupHandler={dbBackupHandler}
          purgeCache={clearCache}
        />
      </Menu>
    </Box>
  );
};

export default React.memo(MoreMenu);
