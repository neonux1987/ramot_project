import { Home, AttachMoney, AssignmentTurnedIn, Receipt, Label, Dashboard } from '@material-ui/icons';
import { BiStats } from 'react-icons/bi';
import SvgIcon from '../components/SvgIcon/SvgIcon';

/* 
  this hook generates icons
*/
const useIcons = () => {

  const generateIcon = (iconName) => {
    switch (iconName) {
      case "הוצאות חודשיות": return AttachMoney;
      case "ביצוע מול תקציב": return AssignmentTurnedIn;
      case "סיכום תקציבי": return Label;
      case "סטטיסטיקה": return props => <SvgIcon Icon={BiStats} color="rgb(208, 208, 208)" {...props} />;
      case "home": return Home;
      case "dashboard": return Dashboard;
      case "receipt": return Receipt;
      default: return Label
    };
  }

  return [generateIcon];
};

export default useIcons;