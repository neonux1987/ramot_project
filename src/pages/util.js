export function areEqual(prevProps, nextProps) {
  if (
    prevProps.date.year === nextProps.date.year &&
    prevProps.date.month === nextProps.date.month &&
    prevProps.date.quarter === nextProps.date.quarter &&
    prevProps.location.state.buildingName === nextProps.location.state.buildingName
  ) return true;
  else return false;
}