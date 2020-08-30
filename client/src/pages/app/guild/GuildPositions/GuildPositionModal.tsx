import React from 'react';
import { isAfter, isBefore, isFuture } from 'date-fns';
import { FormikConfig, useFormikContext } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { Box } from '@/components/atoms';
import { DatePicker, DatePickerProps } from '@/components/formik';
import { FormikModal } from '@/components/molecules';
import { FormikClanSelect, FormikGuildPositionKindSelect } from '@/components/selects';
import { FormikUserSelect } from '@/components/selects/UserSelect';
import { useGuildPositionMutations } from '@/graphql/guilds';
import { useGuildMembersIds } from '@/graphql/guilds/guildMember';
import { runMutation } from '@/services/graphql';
import { createDataModal, DataModalProps } from '@/services/modals';
import { WithId } from '@/typings/enhancers';
import { GuildPositionKind } from '@/typings/graphql';
import { createFormFields } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';

import { useGuildContext } from '../GuildContext';

const { getInitialValues, validationSchema, fields } = createFormFields({
  from: yup.date().label('Start date').required(),
  to: yup.date().label('End date').optional().nullable(),
  notes: yup.string().label('Notes about position').optional().nullable(),
  kind: yup.mixed<GuildPositionKind>().label('').required().default(GuildPositionKind.Member),
  memberId: yup.string().label('Guild member').required(),
  clanId: yup.string().label('Clan').optional().nullable(),
});

type FormValues = ReturnType<typeof getInitialValues>;

type FormConfig = FormikConfig<FormValues>;

export type GuildPositionModalData = WithId<FormValues> | null;

type GuildPositionModalProps = DataModalProps<GuildPositionModalData>;

const pickerProps: Partial<DatePickerProps> = {
  picker: 'month',
  style: { width: '100%' },
};

const useGuildPositionModal = (props: GuildPositionModalProps) => {
  const { data, ...modalProps } = props;

  const { guildId } = useGuildContext();

  const { createGuildPosition, updateGuildPosition } = useGuildPositionMutations();

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    const mutation = props.data?.id
      ? updateGuildPosition({ ...values, id: props.data.id, guildId })
      : createGuildPosition({ ...values, guildId });

    runMutation({
      mutation,
      success: () => props.onCancel(),
      finally: () => helpers.setSubmitting(false),
      messages: getGenericMessages('guild position', props.data ? 'update' : 'create'),
    });
  };

  return {
    modal: {
      ...modalProps,
      title: data?.id ? 'Edit position' : 'Add position',
      okText: data?.id ? 'Update position' : 'Add position',
    },
    form: {
      initialValues: getInitialValues(props.data),
      validationSchema,
      onSubmit: handleSubmit,
    },
    isUpdateModal: !!data,
  };
};

const FromDatePicker = () => {
  const { values } = useFormikContext<FormValues>();

  return (
    <Form.Item {...fields.from}>
      <DatePicker
        name={fields.from.name}
        placeholder="Choose start date..."
        {...pickerProps}
        disabledDate={current => {
          if (isFuture(current)) return true;
          return values.to ? isAfter(current, values.to) : false;
        }}
      />
    </Form.Item>
  );
};

const ToDatePicker = () => {
  const { values } = useFormikContext<FormValues>();

  return (
    <Form.Item {...fields.to}>
      <DatePicker
        name={fields.to.name}
        placeholder="Choose end date..."
        {...pickerProps}
        disabledDate={current => {
          if (isFuture(current)) return true;
          return values.from ? isBefore(current, values.from) : false;
        }}
      />
    </Form.Item>
  );
};

const UserPicker = (props: { isUpdateModal: boolean }) => {
  const { guildId } = useGuildContext();
  const guildMembersIds = useGuildMembersIds({ guildId });

  return (
    <Form.Item {...fields.memberId}>
      <FormikUserSelect
        name={fields.memberId.name}
        placeholder="Select team member..."
        ids={guildMembersIds.userIds}
        idMapper={guildMembersIds.userToMemberMap}
        showSearch
        disabled={props.isUpdateModal}
      />
    </Form.Item>
  );
};

const ClanPicker = (props: { isUpdateModal: boolean }) => {
  const { guildId } = useGuildContext();

  return (
    <Form.Item {...fields.clanId}>
      <FormikClanSelect
        guildId={guildId}
        name={fields.clanId.name}
        placeholder="Select clan for the role..."
        allowClear
        disabled={props.isUpdateModal}
      />
    </Form.Item>
  );
};

export const GuildPositionModal = createDataModal<GuildPositionModalProps>(props => {
  const { form, modal, isUpdateModal } = useGuildPositionModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <UserPicker isUpdateModal={isUpdateModal} />
        <Box display="flex">
          <Box width={1 / 2}>
            <FromDatePicker />
          </Box>
          <Box width={40} />
          <Box width={1 / 2}>
            <ToDatePicker />
          </Box>
        </Box>
        <Form.Item {...fields.kind}>
          <FormikGuildPositionKindSelect name={fields.kind.name} placeholder="Select position..." />
        </Form.Item>
        <Form.Item {...fields.notes}>
          <Input.TextArea name={fields.notes.name} placeholder="Enter notes..." />
        </Form.Item>
        <ClanPicker isUpdateModal={isUpdateModal} />
      </Form>
    </FormikModal>
  );
});
