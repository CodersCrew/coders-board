import { useState } from 'react';

export const useToggle = (initialValue = false) => {
  const [on, setOnState] = useState(initialValue);
  const toggle = () => setOnState(o => !o);
  const setOn = () => setOnState(true);
  const setOff = () => setOnState(false);

  return { on, setOn, setOff, toggle };
};
