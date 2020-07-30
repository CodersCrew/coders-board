import { ModalProps } from '@/components/molecules';

export type DataModalProps<V extends object> = ModalProps & {
  onCancel: () => void;
  data: (V & { id: string }) | null;
};
