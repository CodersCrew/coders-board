import { useSetState } from 'react-use';

type RawState<T> =
  | {
      visible: boolean;
      mounted: true;
      data: T;
    }
  | {
      visible: false;
      mounted: false;
      data: null;
    };

export type DataModal<T> = RawState<T> & { open: (data: T) => void; close: () => void };

/**
 * Provides sate and handlers for components representing data modals.
 */
export function useDataModal<T>() {
  const [state, setState] = useSetState<RawState<T>>({ visible: false, mounted: false, data: null });

  const handleClose = () => {
    setState({ visible: false });

    setTimeout(() => {
      setState({ mounted: false, data: null });
    }, 600);
  };

  const handleOpen = (data: T) => setState({ visible: true, mounted: true, data });

  return {
    ...state,
    open: handleOpen,
    close: handleClose,
  } as DataModal<T>;
}
