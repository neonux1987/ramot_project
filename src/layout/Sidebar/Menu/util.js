import ChecklistIcon from "../../../components/Icons/ChecklistIcon";
import ExpensesIcon from "../../../components/Icons/ExpensesIcon";
import SumIcon from "../../../components/Icons/SumIcon";
import StatsIcon from "../../../components/Icons/StatsIcon";
import HomeIcon from "../../../components/Icons/HomeIcon";

export const generateIcon = (iconName) => {
  switch (iconName) {
    case "הוצאות חודשיות":
      return ExpensesIcon;
    case "ביצוע מול תקציב":
      return ChecklistIcon;
    case "סיכום תקציבי":
      return SumIcon;
    case "סטטיסטיקה":
      return StatsIcon;
    default:
      return HomeIcon;
  }
};
