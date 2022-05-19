import { Label } from '@material-ui/icons';
import useIconWrapper from './useIconWrapper';

/* 
  this hook generates icons
*/
const useIcons = () => {

  const [getIcon] = useIconWrapper();

  const generateIcon = (iconName, style) => {
    switch (iconName) {
      case "הוצאות חודשיות": return getIcon({ iconName: "twemoji:heavy-dollar-sign", style });
      case "ביצוע מול תקציב": return getIcon({ iconName: "bi:list-check", style });
      case "סיכום תקציבי": return getIcon({ iconName: "fluent:autosum-24-filled", style });
      case "סטטיסטיקה": return getIcon({ iconName: "nimbus:stats", style });
      case "home": return getIcon({ iconName: "iconoir:home", style });
      case "dashboard": return getIcon({ iconName: "lucide:layout-dashboard", style });
      case "print": return getIcon({ iconName: "fluent:print-16-regular", style });
      case "excel": return getIcon({ iconName: "ri:file-excel-2-line", style });
      case "edit": return getIcon({ iconName: "clarity:edit-line", style });
      case "add": return getIcon({ iconName: "bi:journal-plus", style });
      case "fullscreen": return getIcon({ iconName: "ant-design:fullscreen-outlined", style });
      case "fullscreen-exit": return getIcon({ iconName: "ant-design:fullscreen-exit-outlined", style });
      default: return Label
    };
  }

  return [generateIcon];
};

export default useIcons;