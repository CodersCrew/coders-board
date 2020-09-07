import { useState } from 'react';

/**
 * Tracks state of a boolean.
 * @param initialValue Initial value for the toggle.
 */
export const useToggle = (initialValue = false) => {
  const [on, setOnState] = useState(initialValue);
  const toggle = () => setOnState(o => !o);
  const setOn = () => setOnState(true);
  const setOff = () => setOnState(false);

  return { on, setOn, setOff, toggle };
};
