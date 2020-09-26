import { act, renderHook } from '@testing-library/react-hooks';

import { useDataModal } from '../useDataModal';

type Data = {
  name: string;
};

const dataModalHook = () => useDataModal<Data>();

describe('useDataModal', () => {
  it('Makes modal unmounted and not visible by default. Data is null', () => {
    const { result } = renderHook(dataModalHook);

    expect(result.current.mounted).toBe(false);
    expect(result.current.visible).toBe(false);
    expect(result.current.data).toBe(null);
  });

  it('Makes modal mounted and visible when open function is invoked', () => {
    const { result } = renderHook(dataModalHook);
    const data = { name: 'John' };

    act(() => {
      result.current.open(data);
    });

    expect(result.current.mounted).toBe(true);
    expect(result.current.visible).toBe(true);
    expect(result.current.data).toEqual(data);
  });

  it('Makes modal mounted and not visible immediately after close function is invoked', () => {
    const { result } = renderHook(dataModalHook);
    const data = { name: 'John' };

    act(() => {
      result.current.open(data);
      result.current.close();
    });

    expect(result.current.mounted).toBe(true);
    expect(result.current.visible).toBe(false);
    expect(result.current.data).toEqual(data);
  });

  const hideTimeout = 600;

  it(`Makes modal unmounted ${hideTimeout} miliseconds after it has been closed`, async () => {
    const { result, waitForNextUpdate } = renderHook(dataModalHook);
    const data = { name: 'John' };

    act(() => {
      result.current.open(data);
      result.current.close();
    });

    expect(result.current.mounted).toBe(true);
    expect(result.current.data).toEqual(data);

    await act(async () => {
      await new Promise(r => setTimeout(r, hideTimeout - 50));
    });

    expect(result.current.mounted).toBe(true);
    expect(result.current.data).toEqual(data);

    await waitForNextUpdate({ timeout: 50 });

    expect(result.current.mounted).toBe(false);
    expect(result.current.data).toBe(null);
  });
});
