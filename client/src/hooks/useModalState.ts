import { useState } from 'react';

type State = {
  visible: boolean;
  mounted: boolean;
};

export const useModalState = () => {
  const [state, setState] = useState<State>({ visible: false, mounted: false });

  const handleClose = () => {
    setState({ visible: false, mounted: true });
    setTimeout(() => {
      setState({ visible: false, mounted: false });
    }, 600);
  };

  const handleOpen = () => {
    setState({ visible: true, mounted: true });
  };

  return {
    isMounted: state.mounted,
    isVisible: state.visible,
    open: handleOpen,
    close: handleClose,
  };
};
