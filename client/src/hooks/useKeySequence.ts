import { useEffect } from 'react';

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
