import { useSelector } from "react-redux";

const useTheme = () => {
  const settings = useSelector((store) => store.settings);

  return settings.data.theme;
};

export default useTheme;
