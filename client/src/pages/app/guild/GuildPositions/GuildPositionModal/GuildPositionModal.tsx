import React from 'react';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { DatePicker, DatePickerProps, Form, Input } from 'formik-antd';
import { pick } from 'lodash';
import moment from 'moment';
import * as yup from 'yup';

import { Box } from '@/components/atoms';
import { Modal, ModalProps } from '@/components/molecules';
import { FormikClansSelect, FormikGuildPositionKindSelect } from '@/components/selects';
import { FormikUserSelect } from '@/components/selects/UserSelect';
import { CFC } from '@/typings/components';
import { YupSchema } from '@/typings/forms';
import { CreateGuildPositionInput, GraphQLOperations, GuildPositionKind } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useCreateGuildPositionMutation, useUpdateGuildPositionMutation } from './GuildPositionModal.apollo';

type FormValues = CreateGuildPositionInput;

type FormConfig = FormikConfig<FormValues>;

type GuildPositionModalProps = ModalProps & {
  onCancel: () => void;
  data: (FormValues & { id: string }) | null;
  currentUsersIds: string[];
  userIdToMemberIdMap: Record<string, string>;
  guildId: string;
};

const GuildPositionModalComponent: CFC<GuildPositionModalProps> = ({
  data,
  guildId,
  currentUsersIds,
  userIdToMemberIdMap,
  ...props
}) => {
  const { isSubmitting, submitForm, values } = useFormikContext<FormValues>();
  const title = data?.id ? 'Edit position' : 'Add position';
  const okText = data?.id ? 'Update position' : 'Add position';

  const buttonProps = { loading: isSubmitting };

  const pickerProps: Partial<DatePickerProps> = {
    picker: 'month',
    style: { width: '100%' },
  };

  return (
    <Modal
      title={title}
      okText={okText}
      okButtonProps={buttonProps}
      onOk={submitForm}
      cancelButtonProps={buttonProps}
      {...props}
    >
      <Form layout="vertical" colon>
        <Form.Item name="memberId" label="Team member" required>
          <FormikUserSelect
            name="memberId"
            placeholder="Select team member..."
            ids={currentUsersIds}
            idMapper={userIdToMemberIdMap}
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
                disabledDate={current => (values.to ? current.isAfter(values.to) : false)}
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
                  return values.from ? current.isBefore(moment(values.from).add(1, 'month')) : false;
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
          <FormikClansSelect guildId={guildId} name="clanId" placeholder="Select clan for the role..." allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const GuildPositionModal: CFC<GuildPositionModalProps> = props => {
  const refetch = {
    refetchQueries: [GraphQLOperations.Query.guildMembers, GraphQLOperations.Query.guildPositions],
  };
  const [createPosition] = useCreateGuildPositionMutation(refetch);
  const [updatePosition] = useUpdateGuildPositionMutation(refetch);

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
        await updatePosition({ variables: { data: { ...pick(values, ['from', 'to', 'notes']), id: props.data.id } } });
      } else {
        await createPosition({ variables: { data: values } });
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
