import { useEffect } from 'react';

/**
 * Runs a callback when someone types the specified letter sequence.
 * @param sequence Sequence of letters that will run the callback.
 * @param callback Function invoked when someone types the sequence.
 */
export const useKeySequence = (sequence: string, callback: () => void) => {
  const pressed: string[] = [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      pressed.push(e.key);
      pressed.splice(-sequence.length - 1, pressed.length - sequence.length);

      if (pressed.join('') === sequence) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
};
