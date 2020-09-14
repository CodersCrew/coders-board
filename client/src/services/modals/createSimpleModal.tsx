import React, { ComponentType } from 'react';

import { ModalProps } from '@/components/molecules';

import { SimpleModal } from './useSimpleModal';

/**
 * Props of modal component that can be used as a simple modal.
 */
export type SimpleModalProps = Omit<ModalProps, 'onCancel'> & {
  onCancel: () => void;
};

/**
 * Transforms component props to ones required for simple modal and returns the resulting component.
 * @param modal Modal component that accepts all props specified by SimpleModalProps type.
 */
export function createSimpleModal<P extends SimpleModalProps>(modal: ComponentType<P>) {
  return ({ visible, mounted, open: _open, close, ...props }: SimpleModal) => {
    if (!mounted) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ModalComponent = modal as any;

    return <ModalComponent {...props} visible={visible} onCancel={close} />;
  };
}
