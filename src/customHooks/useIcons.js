import { Home, AttachMoney, AssignmentTurnedIn, InsertChartOutlined, Receipt, Label, Dashboard } from '@material-ui/icons';
import { ImStatsDots } from 'react-icons/im';
import { BiStats } from 'react-icons/bi';
import SvgIconWrapper from '../components/SvgIconWrapper/SvgIconWrapper';
import { SvgIcon } from '@material-ui/core';

const useIcons = () => {

  const generateIcon = (iconName) => {
    switch (iconName) {
      case "מעקב הוצאות חודשיות": return AttachMoney;
      case "מעקב ביצוע מול תקציב": return AssignmentTurnedIn;
      case "סיכום תקציבי": return Label;
      case "סטטיסטיקה": return BiStats;
      case "home": return () => <SvgIcon component={Home} />;
      case "dashboard": return Dashboard;
      case "receipt": return Receipt;
      default: return Label
    };
  }

  return [generateIcon];
};

export default useIcons;