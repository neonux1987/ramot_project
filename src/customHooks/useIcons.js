import { Home, AttachMoney, AssignmentTurnedIn, Receipt, Label, Dashboard } from '@material-ui/icons';
import { BiStats } from 'react-icons/bi';
import SvgIcon from '../components/SvgIconWrapper/SvgIcon';

const useIcons = () => {

  const generateIcon = (iconName) => {
    switch (iconName) {
      case "הוצאות חודשיות": return AttachMoney;
      case "ביצוע מול תקציב": return AssignmentTurnedIn;
      case "סיכום תקציבי": return Label;
      case "סטטיסטיקה": return props => <SvgIcon Icon={BiStats} {...props} />;
      case "home": return Home;
      case "dashboard": return Dashboard;
      case "receipt": return Receipt;
      default: return Label
    };
  }

  return [generateIcon];
};

export default useIcons;