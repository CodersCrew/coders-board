import React from 'react';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { DatePicker, DatePickerProps, Form, Input } from 'formik-antd';
import { pick } from 'lodash';
import moment from 'moment';
import * as yup from 'yup';

import { Box } from '@/components/atoms';
import { Modal, ModalProps } from '@/components/molecules';
import { FormikClanSelect, FormikGuildPositionKindSelect } from '@/components/selects';
import { FormikUserSelect } from '@/components/selects/UserSelect';
import { useGuildPositions } from '@/graphql/guilds';
import { useGuildMembersIds } from '@/graphql/guilds/guildMember';
import { CFC } from '@/typings/components';
import { YupSchema } from '@/typings/forms';
import { CreateGuildPositionInput, GuildPositionKind } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

type FormValues = Omit<CreateGuildPositionInput, 'guildId'>;

type FormConfig = FormikConfig<FormValues>;

export type GuildPositionModalProps = ModalProps & {
  onCancel: () => void;
  data: (FormValues & { id: string }) | null;
  guildId: string;
};

const GuildPositionModalComponent: CFC<GuildPositionModalProps> = ({ data, guildId, ...props }) => {
  const formik = useFormikContext<FormValues>();
  const guildMambersIds = useGuildMembersIds({ guildId });
  const title = data?.id ? 'Edit position' : 'Add position';
  const okText = data?.id ? 'Update position' : 'Add position';

  const buttonProps = { loading: formik.isSubmitting };

  const pickerProps: Partial<DatePickerProps> = {
    picker: 'month',
    style: { width: '100%' },
  };

  return (
    <Modal
      title={title}
      okText={okText}
      okButtonProps={buttonProps}
      onOk={formik.submitForm}
      cancelButtonProps={buttonProps}
      {...props}
    >
      <Form layout="vertical" colon>
        <Form.Item name="memberId" label="Guild member" required>
          <FormikUserSelect
            name="memberId"
            placeholder="Select team member..."
            ids={guildMambersIds.userIds}
            idMapper={guildMambersIds.userToMemberMap}
            showSearch
          />
        </Form.Item>
        <Box display="flex">
          <Box width={1 / 2}>
            <Form.Item name="from" label="Start date" required>
              <DatePicker
                name="from"
                placeholder="Choose start date..."
                {...pickerProps}
                disabledDate={current => (formik.values.to ? current.isAfter(formik.values.to) : false)}
              />
            </Form.Item>
          </Box>
          <Box width={40} />
          <Box width={1 / 2}>
            <Form.Item name="to" label="End date">
              <DatePicker
                name="to"
                placeholder="Choose end date..."
                {...pickerProps}
                disabledDate={current => {
                  return formik.values.from ? current.isBefore(moment(formik.values.from).add(1, 'month')) : false;
                }}
              />
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
    </Modal>
  );
};

export const GuildPositionModal: CFC<GuildPositionModalProps> = props => {
  const guildPositions = useGuildPositions();

  const validationSchema: YupSchema<FormValues> = yup.object({
    from: yup.date().required().default(null),
    to: yup.string().optional().nullable(),
    notes: yup.string().optional().nullable(),
    kind: yup.mixed<GuildPositionKind>().required().default(GuildPositionKind.Member),
    memberId: yup.string().required(),
    clanId: yup.string().optional(),
  });

  const initialValues = props.data ?? getInitialValuesFromSchema(validationSchema);
  const messages = getBasicMessages('guild position', props.data ? 'update' : 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      if (props.data?.id) {
        await guildPositions.update({
          variables: { data: { ...pick(values, ['from', 'to', 'notes']), id: props.data.id, guildId: props.guildId } },
        });
      } else {
        await guildPositions.create({ variables: { data: { ...values, guildId: props.guildId } } });
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

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <GuildPositionModalComponent {...props} />
    </Formik>
  );
};
