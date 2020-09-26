import { useState } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useInitialized } from '../useInitialized';

describe('useInitialized', () => {
  it('Waits for a specified criteria to be met for the first time and then always returns true', () => {
    const testingHook = () => {
      const [state, setState] = useState(false);
      const initialized = useInitialized(state);

      return {
        setState,
        initialized,
      };
    };

    const { result } = renderHook(() => testingHook());

    expect(result.current.initialized).toBe(false);

    act(() => {
      result.current.setState(true);
    });

    expect(result.current.initialized).toBe(true);

    act(() => {
      result.current.setState(false);
    });

    expect(result.current.initialized).toBe(true);
  });
});
