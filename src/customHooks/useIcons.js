import { Receipt, Label } from '@material-ui/icons';
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
      case "receipt": return Receipt;
      default: return Label
    };
  }

  return [generateIcon];
};

export default useIcons;