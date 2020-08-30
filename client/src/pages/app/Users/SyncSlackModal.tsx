import React from 'react';
import { FormikConfig } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { useSlackMutations } from '@/graphql/integrations';
import { runMutation } from '@/services/graphql';
import { createDataModal, DataModalProps } from '@/services/modals';
import { SyncSlackUserInput } from '@/typings/graphql';
import { createFormFields } from '@/utils/forms';

const { getInitialValues, validationSchema, fields } = createFormFields({
  slackId: yup.string().label('Slack Member ID').required().default(''),
});

type FormValues = Omit<SyncSlackUserInput, 'userId'>;

type FormConfig = FormikConfig<FormValues>;

export type SyncSlackModalData = { userId: string };

type SyncSlackModalProps = DataModalProps<SyncSlackModalData>;

const useSyncSlackModal = ({ data, ...modalProps }: SyncSlackModalProps) => {
  const { syncSlackUser } = useSlackMutations();

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    runMutation({
      mutation: syncSlackUser({ userId: data.userId, slackId: values.slackId }),
      success: () => modalProps.onCancel(),
      finally: () => helpers.setSubmitting(false),
      messages: {
        loading: 'Syncing user with Slack account',
        success: 'User synced with Slack',
        failure: 'Error during syncing with Slack',
      },
    });
  };

  return {
    modal: {
      ...modalProps,
      title: 'Sync user with Slack',
      okText: 'Sync user',
    },
    form: {
      initialValues: getInitialValues(),
      validationSchema,
      onSubmit: handleSubmit,
    },
  };
};

export const SyncSlackModal = createDataModal<SyncSlackModalProps>(props => {
  const { form, modal } = useSyncSlackModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <Form.Item {...fields.slackId}>
          <Input name={fields.slackId.name} />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
