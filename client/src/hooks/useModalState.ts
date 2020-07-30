import { useSetState } from 'react-use';

type State<T> = {
  visible: boolean;
  mounted: boolean;
  data: T | null;
};

export const useModalState = <T>() => {
  const [state, setState] = useSetState<State<T>>({ visible: false, mounted: false, data: null });

  const handleClose = () => {
    setState({ visible: false });
    setTimeout(() => {
      setState({ mounted: false, data: null });
    }, 600);
  };

  const handleOpen = (data?: T) => {
    setState({ visible: true, mounted: true, data: data ?? null });
  };

  return {
    isVisible: state.visible,
    isMounted: state.mounted,
    data: state.data,
    open: handleOpen,
    close: handleClose,
    props: {
      onCancel: handleClose,
      visible: state.visible,
      data: state.data,
    },
  };
};
