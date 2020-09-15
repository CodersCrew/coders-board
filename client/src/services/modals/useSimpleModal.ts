import { useSetState } from 'react-use';

type RawState = { visible: boolean; mounted: true } | { visible: false; mounted: false };

export type SimpleModal = RawState & { open: () => void; close: () => void };

/**
 * Provides sate and handlers for components representing simple modals.
 */
export function useSimpleModal() {
  const [state, setState] = useSetState<RawState>({ visible: false, mounted: false });

  const handleClose = () => {
    setState({ visible: false });

    setTimeout(() => {
      setState({ mounted: false });
    }, 600);
  };

  const handleOpen = () => setState({ visible: true, mounted: true });

  return {
    ...state,
    open: handleOpen,
    close: handleClose,
  } as SimpleModal;
}
