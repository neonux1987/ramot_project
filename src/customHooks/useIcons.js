import { Label } from "@material-ui/icons";
import useIconWrapper from "./useIconWrapper";

/* 
  this hook generates icons
*/
const useIcons = () => {
  const [getIcon] = useIconWrapper();

  const generateIcon = (iconName, style) => {
    switch (iconName) {
      case "הוצאות חודשיות":
        return getIcon({ iconName: "ph:currency-dollar-simple-bold", style });
      case "ביצוע מול תקציב":
        return getIcon({ iconName: "bi:list-check", style });
      case "סיכום תקציבי":
        return getIcon({ iconName: "fluent:autosum-24-filled", style });
      case "סטטיסטיקה":
        return getIcon({ iconName: "nimbus:stats", style });
      case "home":
        return getIcon({ iconName: "iconoir:home", style });
      case "dashboard":
        return getIcon({ iconName: "lucide:layout-dashboard", style });
      case "print":
        return getIcon({ iconName: "fluent:print-16-regular", style });
      case "excel":
        return getIcon({ iconName: "ri:file-excel-2-line", style });
      case "edit":
        return getIcon({ iconName: "clarity:edit-line", style });
      case "add":
        return getIcon({ iconName: "bi:journal-plus", style });
      case "fullscreen":
        return getIcon({ iconName: "ant-design:fullscreen-outlined", style });
      case "fullscreen-exit":
        return getIcon({
          iconName: "ant-design:fullscreen-exit-outlined",
          style
        });
      case "table":
        return getIcon({
          iconName: "ant-design:borderless-table-outlined",
          style
        });
      case "stats":
        return getIcon({
          iconName: "ic:round-donut-large",
          style: { width: "30px", height: "30px", ...style }
        });
      case "user":
        return getIcon({ iconName: "ant-design:user-outlined", style });
      case "android":
        return getIcon({ iconName: "icon-park-solid:system", style });
      case "style":
        return getIcon({ iconName: "fa6-solid:palette", style });
      case "backup":
        return getIcon({ iconName: "bi:cloud-arrow-up-fill", style });
      case "restore":
        return getIcon({
          iconName: "ic:sharp-settings-backup-restore",
          style: { width: "30px", height: "30px", ...style }
        });
      case "update":
        return getIcon({
          iconName: "ic:baseline-update",
          style: { width: "30px", height: "30px", ...style }
        });
      case "settings":
        return getIcon({
          iconName: "fluent:settings-20-regular",
          style: { width: "24px", height: "24px", ...style }
        });
      case "more-menu":
        return getIcon({ iconName: "ci:menu-alt-05", style });
      case "volume-on":
        return getIcon({ iconName: "fa-solid:volume-up", style });
      case "volume-off":
        return getIcon({ iconName: "fa-solid:volume-mute", style });
      case "developer":
        return getIcon({ iconName: "fluent:developer-board-24-filled", style });
      case "about":
        return getIcon({ iconName: "eos-icons:software", style });
      case "calendar":
        return getIcon({ iconName: "fontisto:date", style });
      case "close":
        return getIcon({
          iconName: "ic:baseline-close",
          style: { width: "24px", height: "24px", ...style }
        });
      case "maximize":
        return getIcon({
          iconName: "ic:baseline-crop-square",
          style: { width: "24px", height: "24px", ...style }
        });
      case "minimize":
        return getIcon({
          iconName: "ic:baseline-minimize",
          style: { width: "24px", height: "24px", ...style }
        });
      default:
        return Label;
    }
  };

  return [generateIcon];
};

export default useIcons;
