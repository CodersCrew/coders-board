import React from 'react';
import { FormikConfig, useFormikContext } from 'formik';
import { DatePicker, DatePickerProps, Form, Input } from 'formik-antd';
import moment from 'moment';
import * as yup from 'yup';

import { Box } from '@/components/atoms';
import { FormikModal } from '@/components/molecules';
import { FormikChapterSelect, FormikPositionSelect } from '@/components/selects';
import { FormikUserSelect } from '@/components/selects/UserSelect';
import { useSquadMembersIds, useSquadPositionMutations } from '@/graphql/squads';
import { runMutation } from '@/services/graphql';
import { createDataModal, DataModalProps } from '@/services/modals';
import { WithId } from '@/typings/enhancers';
import { CreateSquadPositionInput } from '@/typings/graphql';
import { createValidationSchema } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';
import { pick } from '@/utils/objects';

import { useSquadContext } from '../SquadContext';

type FormValues = Omit<CreateSquadPositionInput, 'squadId'>;

type FormConfig = FormikConfig<FormValues>;

export type SquadPositionModalData = WithId<FormValues> | null;

type SquadPositionModalProps = DataModalProps<SquadPositionModalData>;

const pickerProps: Partial<DatePickerProps> = {
  picker: 'month',
  style: { width: '100%' },
};

const useSquadPositionModal = (props: SquadPositionModalProps) => {
  const { data, ...modalProps } = props;

  const { squadId } = useSquadContext();
  const { createSquadPosition, updateSquadPosition } = useSquadPositionMutations();
  const squadMembersIds = useSquadMembersIds({ squadId });

  const validationSchema = createValidationSchema<FormValues>({
    from: yup.date().required(),
    to: yup.date().optional().nullable(),
    notes: yup.string().optional().nullable(),
    memberId: yup.string().required(),
    positionId: yup.string().required(),
    chapterId: yup.string().optional(),
  });

  const initialValues = data ?? validationSchema.initialValues;

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    const mutation = data?.id
      ? updateSquadPosition({ ...pick(values, ['from', 'to', 'notes']), id: data.id, squadId })
      : createSquadPosition({ ...values, squadId });

    runMutation({
      mutation,
      success: () => props.onCancel(),
      finally: () => helpers.setSubmitting(false),
      messages: getGenericMessages('squad position', data ? 'update' : 'create'),
    });
  };

  return {
    modal: {
      ...modalProps,
      title: data?.id ? 'Edit position' : 'Add position',
      okText: data?.id ? 'Update position' : 'Add position',
    },
    form: {
      initialValues,
      validationSchema,
      onSubmit: handleSubmit,
    },
    squadMembersIds,
    squadId,
    isUpdateModal: Boolean(data),
  };
};

const FromPicker = () => {
  const { values } = useFormikContext<FormValues>();

  return (
    <Form.Item name="from" label="Start date" required>
      <DatePicker
        name="from"
        allowClear={false}
        placeholder="Choose start date..."
        {...pickerProps}
        disabledDate={current => {
          if (current.isAfter(moment())) return true;
          return values.to ? current.isAfter(values.to) : false;
        }}
      />
    </Form.Item>
  );
};

const ToPicker = () => {
  const { values } = useFormikContext<FormValues>();

  return (
    <Form.Item name="to" label="End date">
      <DatePicker
        name="to"
        placeholder="Choose end date..."
        {...pickerProps}
        disabledDate={current => {
          if (current.isAfter(moment())) return true;
          return values.from ? current.isBefore(moment(values.from).add(1, 'month')) : false;
        }}
      />
    </Form.Item>
  );
};

export const SquadPositionModal = createDataModal<SquadPositionModalProps>(props => {
  const { form, modal, squadMembersIds, isUpdateModal, squadId } = useSquadPositionModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <Form.Item name="memberId" label="Squad member" required>
          <FormikUserSelect
            name="memberId"
            placeholder="Select team member..."
            ids={squadMembersIds.membersUserIds}
            idMapper={squadMembersIds.userIdToMemberIdMap}
            disabled={isUpdateModal}
            showSearch
          />
        </Form.Item>
        <Form.Item name="positionId" label="Position" required>
          <FormikPositionSelect name="positionId" placeholder="Select position..." disabled={isUpdateModal} />
        </Form.Item>
        <Box display="flex">
          <Box width={1 / 2}>
            <FromPicker />
          </Box>
          <Box width={40} />
          <Box width={1 / 2}>
            <ToPicker />
          </Box>
        </Box>
        <Form.Item name="notes" label="Notes about position">
          <Input.TextArea name="notes" placeholder="Enter notes..." />
        </Form.Item>
        <Form.Item name="chapterId" label="Chapter">
          <FormikChapterSelect
            squadId={squadId}
            name="chapterId"
            placeholder="Select chapter for the role..."
            allowClear
            disabled={isUpdateModal}
          />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
