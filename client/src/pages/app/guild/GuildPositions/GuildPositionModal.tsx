import React from 'react';
import { FormikConfig, useFormikContext } from 'formik';
import { DatePicker, DatePickerProps, Form, Input } from 'formik-antd';
import moment from 'moment';
import * as yup from 'yup';

import { Box } from '@/components/atoms';
import { FormikModal } from '@/components/molecules';
import { FormikClanSelect, FormikGuildPositionKindSelect } from '@/components/selects';
import { FormikUserSelect } from '@/components/selects/UserSelect';
import { useGuildPositions } from '@/graphql/guilds';
import { useGuildMembersIds } from '@/graphql/guilds/guildMember';
import { createDataModal, DataModalProps } from '@/services/modals';
import { WithId } from '@/typings/enhancers';
import { CreateGuildPositionInput, GuildPositionKind } from '@/typings/graphql';
import { createValidationSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useGuildContext } from '../GuildContext';

type FormValues = Omit<CreateGuildPositionInput, 'guildId'>;

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
  const guildMembersIds = useGuildMembersIds({ guildId });

  const guildPositions = useGuildPositions();

  const validationSchema = createValidationSchema<FormValues>({
    from: yup.date().required().default(null),
    to: yup.date().optional().nullable(),
    notes: yup.string().optional().nullable(),
    kind: yup.mixed<GuildPositionKind>().required().default(GuildPositionKind.Member),
    memberId: yup.string().required(),
    clanId: yup.string().optional(),
  });

  const initialValues = props.data ?? validationSchema.initialValues;

  const messages = getBasicMessages('guild position', props.data ? 'update' : 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      if (props.data?.id) {
        await guildPositions.update({
          variables: { data: { ...values, id: props.data.id, guildId } },
        });
      } else {
        await guildPositions.create({ variables: { data: { ...values, guildId } } });
      }

      props.onCancel();
      messages.success();
    } catch (ex) {
      console.log(ex);
      messages.failure();
    } finally {
      helpers.setSubmitting(false);
    }
  };

  modalProps.title = data?.id ? 'Edit position' : 'Add position';
  modalProps.okText = data?.id ? 'Update position' : 'Add position';

  return {
    modal: modalProps,
    form: {
      initialValues,
      validationSchema,
      onSubmit: handleSubmit,
    },
    guildMembersIds,
    guildId,
  };
};

const FromDatePicker = () => {
  const { values } = useFormikContext<FormValues>();

  return (
    <DatePicker
      name="from"
      placeholder="Choose start date..."
      {...pickerProps}
      disabledDate={current => (values.to ? current.isAfter(values.to) : false)}
    />
  );
};

const ToDatePicker = () => {
  const { values } = useFormikContext<FormValues>();

  return (
    <DatePicker
      name="to"
      placeholder="Choose end date..."
      {...pickerProps}
      disabledDate={current => {
        return values.from ? current.isBefore(moment(values.from).add(1, 'month')) : false;
      }}
    />
  );
};

export const GuildPositionModal = createDataModal<GuildPositionModalProps>(props => {
  const { form, modal, guildMembersIds, guildId } = useGuildPositionModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <Form.Item name="memberId" label="Guild member" required>
          <FormikUserSelect
            name="memberId"
            placeholder="Select team member..."
            ids={guildMembersIds.userIds}
            idMapper={guildMembersIds.userToMemberMap}
            showSearch
          />
        </Form.Item>
        <Box display="flex">
          <Box width={1 / 2}>
            <Form.Item name="from" label="Start date" required>
              <FromDatePicker />
            </Form.Item>
          </Box>
          <Box width={40} />
          <Box width={1 / 2}>
            <Form.Item name="to" label="End date">
              <ToDatePicker />
            </Form.Item>
          </Box>
        </Box>
        <Form.Item name="kind" label="Position" required>
          <FormikGuildPositionKindSelect name="kind" placeholder="Select position..." />
        </Form.Item>
        <Form.Item name="notes" label="Notes about position">
          <Input.TextArea name="notes" placeholder="Enter notes..." />
        </Form.Item>
        <Form.Item name="clanId" label="Clan">
          <FormikClanSelect guildId={guildId} name="clanId" placeholder="Select clan for the role..." allowClear />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
