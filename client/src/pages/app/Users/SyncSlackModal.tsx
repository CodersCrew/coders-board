import React from 'react';
import { message } from 'antd';
import { FormikConfig } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { useSlackMutations } from '@/graphql/integrations';
import { createDataModal, DataModalProps } from '@/services/modals';
import { SyncSlackUserInput } from '@/typings/graphql';
import { createValidationSchema } from '@/utils/forms';

type FormValues = Omit<SyncSlackUserInput, 'userId'>;

type FormConfig = FormikConfig<FormValues>;

export type SyncSlackModalData = { userId: string };

type SyncSlackModalProps = DataModalProps<SyncSlackModalData>;

const useSyncSlackModal = ({ data, ...modalProps }: SyncSlackModalProps) => {
  const slackMutations = useSlackMutations();

  const validationSchema = createValidationSchema<FormValues>({
    slackId: yup.string().required().default(''),
  });

  const { initialValues } = validationSchema;

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    message.loading('Syncing user with Slack account');

    try {
      await slackMutations.syncUser({ userId: data.userId, slackId: values.slackId });
      modalProps.onCancel();
      message.success('User synced with Slack');
    } catch (ex) {
      console.log(ex);
      message.error('Error during syncing with Slack');
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return {
    modal: {
      ...modalProps,
      title: 'Sync user with Slack',
      okText: 'Sync user',
    },
    form: {
      initialValues,
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
        <Form.Item name="slackId" label="Slack ID" required>
          <Input name="slackId" />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
