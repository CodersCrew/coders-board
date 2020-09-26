import { useState } from 'react';

/**
 * Tracks state of a boolean.
 * @param initialValue Initial value for the toggle.
 */
export const useToggle = (initialValue = false) => {
  const [on, setOnState] = useState(initialValue);

  const toggle = () => setOnState(o => !o);

  const setOn = () => {
    if (!on) {
      setOnState(true);
    }
  };

  const setOff = () => {
    if (on) {
      setOnState(false);
    }
  };

  return { on, setOn, setOff, toggle };
};
