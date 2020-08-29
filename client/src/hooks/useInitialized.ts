import { useRef } from 'react';

/**
 * Waits for a specified criteria to be met for the first time and then always returns true.
 * @param shouldInitialize Result of an expression that causes initialization.
 */
export const useInitialized = (shouldInitialize: boolean) => {
  const initialized = useRef(false);

  if (!initialized.current) {
    initialized.current = shouldInitialize;
  }

  return initialized.current;
};
