import { Home, AttachMoney, AssignmentTurnedIn, Receipt, Label, Dashboard } from '@material-ui/icons';
import { BiStats } from 'react-icons/bi';
import SvgIcon from '../components/SvgIcon/SvgIcon';
import useIconWrapper from './useIconWrapper';

/* 
  this hook generates icons
*/
const useIcons = () => {

  const [getIcon] = useIconWrapper();

  const generateIcon = (iconName) => {
    switch (iconName) {
      case "הוצאות חודשיות": return getIcon({ iconName: "ant-design:dollar-twotone" });
      case "ביצוע מול תקציב": return getIcon({ iconName: "bi:list-check" });
      case "סיכום תקציבי": return getIcon({ iconName: "fluent:autosum-24-filled" });
      case "סטטיסטיקה": return getIcon({ iconName: "nimbus:stats" });
      case "home": return getIcon({ iconName: "fa6-solid:house-chimney" });
      case "dashboard": return Home;
      case "receipt": return Receipt;
      default: return Label
    };
  }

  return [generateIcon];
};

export default useIcons;