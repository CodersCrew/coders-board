import styled from '@emotion/styled';
import { Modal as AntModal } from 'antd';
import { ModalProps as AntModalProps } from 'antd/lib/modal';

export type ModalProps = AntModalProps;

export const Modal = styled(AntModal)<ModalProps>({
  '.ant-modal-footer': {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

export const confirmModal = AntModal.confirm;
