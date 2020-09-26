import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useKeySequence } from '../useKeySequence';

const dispatchKeyDown = (key: string) => {
  global.dispatchEvent(new KeyboardEvent('keydown', { key }));
};

describe('useKeySequence', () => {
  it('Runs a callback when someone types the specified letter sequence', () => {
    const sequence = 'test';
    const callback = jest.fn();

    renderHook(() => useKeySequence(sequence, callback));

    expect(callback).not.toBeCalled();

    act(() => {
      dispatchKeyDown('t');
      dispatchKeyDown('e');
      dispatchKeyDown('s');
      dispatchKeyDown('t');
    });

    expect(callback).toBeCalledTimes(1);
  });

  it("Doesn't run a callback when the sequence is interrupted by additional keypress", () => {
    const sequence = 'test';
    const callback = jest.fn();

    renderHook(() => useKeySequence(sequence, callback));

    act(() => {
      dispatchKeyDown('t');
      dispatchKeyDown('e');
      dispatchKeyDown('s');
      dispatchKeyDown('e');
      dispatchKeyDown('t');
    });

    expect(callback).not.toBeCalled();
  });
});
