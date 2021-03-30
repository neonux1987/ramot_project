import { useEffect, useState } from 'react';

const useColumnUpdate = (value) => {
  const [newValue, setNewValue] = useState(value);

  // have to use useEffect since the useState
  // runs only once to init the data and when the
  // value updates the local state needs to be
  // updated as well because the input value is
  // not connected directly to the outside state
  useEffect(() => {
    setNewValue(() => value);
  }, [value]);

  const onChange = (event) => {
    const target = event.currentTarget;
    setNewValue(target.value);
  }

  return [newValue, onChange, setNewValue];
};

export default useColumnUpdate;