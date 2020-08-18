import { useSetState } from 'react-use';

type State<T> =
  | {
      visible: boolean;
      mounted: true;
      data: T;
    }
  | {
      visible: boolean;
      mounted: false;
      data: null;
    };

type ReturnType<T> =
  | {
      isVisible: boolean;
      isMounted: true;
      data: T;
      open: (data: T) => void;
      close: () => void;
    }
  | {
      isVisible: false;
      isMounted: false;
      data: null;
      open: (data: T) => void;
      close: () => void;
    };

export const useModalState = <T>() => {
  const [state, setState] = useSetState<State<T>>({ visible: false, mounted: false, data: null });

  const handleClose = () => {
    setState({ visible: false });

    setTimeout(() => {
      setState({ mounted: false, data: null });
    }, 600);
  };

  const handleOpen = (data: T) => setState({ visible: true, mounted: true, data });

  return {
    isVisible: state.visible,
    isMounted: state.mounted,
    data: state.data,
    open: handleOpen,
    close: handleClose,
  } as ReturnType<T>;
};
