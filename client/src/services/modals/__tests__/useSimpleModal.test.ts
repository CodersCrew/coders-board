import { act, renderHook } from '@testing-library/react-hooks';

import { useSimpleModal } from '../useSimpleModal';

const simpleModalHook = () => useSimpleModal();

describe('useSimpleModal', () => {
  it('Makes modal unmounted and not visible by default', () => {
    const { result } = renderHook(simpleModalHook);

    expect(result.current.mounted).toBe(false);
    expect(result.current.visible).toBe(false);
  });

  it('Makes modal mounted and visible when open function is invoked', () => {
    const { result } = renderHook(simpleModalHook);

    act(() => {
      result.current.open();
    });

    expect(result.current.mounted).toBe(true);
    expect(result.current.visible).toBe(true);
  });

  it('Makes modal mounted and not visible immediately after close function is invoked', () => {
    const { result } = renderHook(simpleModalHook);

    act(() => {
      result.current.open();
      result.current.close();
    });

    expect(result.current.mounted).toBe(true);
    expect(result.current.visible).toBe(false);
  });

  const hideTimeout = 600;

  it(`Makes modal unmounted ${hideTimeout} miliseconds after it has been closed`, async () => {
    const { result, waitForNextUpdate } = renderHook(simpleModalHook);

    act(() => {
      result.current.open();
      result.current.close();
    });

    expect(result.current.mounted).toBe(true);

    await act(async () => {
      await new Promise(r => setTimeout(r, hideTimeout - 50));
    });

    expect(result.current.mounted).toBe(true);

    await waitForNextUpdate({ timeout: 50 });

    expect(result.current.mounted).toBe(false);
  });
});
