import { useState } from 'react';

const useColumnUpdate = (value) => {
  const [newValue, setNewValue] = useState(value);

  const onChange = (event) => {
    const target = event.currentTarget;
    setNewValue(target.value);
  }

  return [newValue, onChange, setNewValue];
};

export default useColumnUpdate;