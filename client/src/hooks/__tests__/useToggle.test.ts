import { act, renderHook } from '@testing-library/react-hooks';

import { useToggle } from '../useToggle';

describe('useToggle', () => {
  it('Is false by default', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.on).toBe(false);
  });

  it('Can be initialized with provided value', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current.on).toBe(true);
  });

  it('Toggles the value with toggle method', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.on).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.on).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.on).toBe(true);
  });

  it('Toggles the value with setOn and setOf methods', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.setOn();
    });

    expect(result.current.on).toBe(true);

    act(() => {
      result.current.setOn();
    });

    expect(result.current.on).toBe(true);

    act(() => {
      result.current.setOff();
    });

    expect(result.current.on).toBe(false);

    act(() => {
      result.current.setOff();
    });

    expect(result.current.on).toBe(false);
  });
});
