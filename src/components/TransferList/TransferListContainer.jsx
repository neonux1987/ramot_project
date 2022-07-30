import React from "react";
import TransferList from "./TransferList";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const TransferListContainer = ({
  isFetching,
  rightItems,
  leftItems,
  rightTitle,
  leftTitle,
  updateLeft,
  updateRight
}) => {
  const [checked, setChecked] = React.useState([]);

  const leftChecked = intersection(checked, leftItems);
  const rightChecked = intersection(checked, rightItems);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setChecked(not(checked, leftChecked));
    updateLeft(not(leftItems, leftChecked), leftChecked);
    updateRight(rightItems.concat(leftChecked));
  };

  const handleCheckedLeft = () => {
    setChecked(not(checked, rightChecked));
    updateLeft(leftItems.concat(rightChecked), rightChecked);
    updateRight(not(rightItems, rightChecked));
  };

  return (
    <TransferList
      handleCheckedLeft={handleCheckedLeft}
      leftChecked={leftChecked}
      leftItems={leftItems}
      leftTitle={leftTitle}
      handleCheckedRight={handleCheckedRight}
      rightChecked={rightChecked}
      rightItems={rightItems}
      rightTitle={rightTitle}
      handleToggleAll={handleToggleAll}
      handleToggle={handleToggle}
      numberOfChecked={numberOfChecked}
      checked={checked}
      isFetching={isFetching}
    />
  );
};

export default TransferListContainer;
