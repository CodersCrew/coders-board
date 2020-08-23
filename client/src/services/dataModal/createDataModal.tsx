import React, { ComponentType } from 'react';

import { ModalProps } from '@/components/molecules';

import { DataModal } from './useDataModal';

export type DataModalProps<D> = Omit<ModalProps, 'onCancel'> & {
  onCancel: () => void;
  data: D;
};

type InferData<T> = T extends DataModalProps<infer D> ? D : T;

export function createDataModal<P extends DataModalProps<unknown>>(modal: ComponentType<P>) {
  return ({
    visible,
    mounted,
    open: _open,
    close,
    ...props
  }: DataModal<InferData<P>> | (DataModal<null> & Omit<P, 'onCancel'>)) => {
    if (!mounted) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ModalComponent = modal as any;

    return <ModalComponent {...props} visible={visible} onCancel={close} />;
  };
}
