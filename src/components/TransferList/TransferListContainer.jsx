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

const TransferListContainer = ({ isFetching, rightItems, leftItems }) => {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(rightItems);
  const [right, setRight] = React.useState(leftItems);
  console.log(leftItems);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

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
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  return (
    <TransferList
      handleCheckedLeft={handleCheckedLeft}
      handleCheckedRight={handleCheckedRight}
      rightChecked={rightChecked}
      leftChecked={leftChecked}
      rightItems={right}
      leftItems={left}
      handleToggleAll={handleToggleAll}
      handleToggle={handleToggle}
      numberOfChecked={numberOfChecked}
      checked={checked}
      isFetching={isFetching}
    />
  );
};

export default TransferListContainer;
