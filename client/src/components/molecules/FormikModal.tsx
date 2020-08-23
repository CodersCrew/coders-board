import React, { ReactNode } from 'react';
import { FormikConfig, FormikProvider, useFormik } from 'formik';

import { Modal, ModalProps } from './Modal';

export type FormikModalProps<V> = {
  form: FormikConfig<V>;
  modal: Omit<ModalProps, 'onCancel' | 'onOk'> & { onCancel: () => void };
  children: ReactNode;
};

export function FormikModal<V>({ children, form, modal }: FormikModalProps<V>) {
  const formik = useFormik<V>(form);

  const buttonProps = { loading: formik.isSubmitting };

  return (
    <Modal
      {...modal}
      onOk={formik.submitForm}
      okButtonProps={{ ...modal.okButtonProps, ...buttonProps }}
      cancelButtonProps={{ ...modal.cancelButtonProps, ...buttonProps }}
    >
      <FormikProvider value={formik}>{children}</FormikProvider>
    </Modal>
  );
}

FormikModal.defaultProps = {
  okButtonProps: {},
  cancelButtonProps: {},
};
