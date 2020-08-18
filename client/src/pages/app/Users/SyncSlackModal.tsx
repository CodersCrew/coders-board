import React from 'react';
import { message } from 'antd';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { Modal, ModalProps } from '@/components/molecules';
import { useSlackMutations } from '@/graphql/integrations';
import { CFC } from '@/typings/components';
import { YupSchema } from '@/typings/forms';
import { SyncSlackUserInput } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';

type FormValues = Omit<SyncSlackUserInput, 'userId'>;

type FormConfig = FormikConfig<FormValues>;

export type SyncSlackModalProps = ModalProps & {
  onCancel: () => void;
  data: { userId: string };
};

type SyncSlackModalComponentProps = Omit<SyncSlackModalProps, 'data' | 'ctx'>;

const SyncSlackModalComponent: CFC<SyncSlackModalComponentProps> = props => {
  const formik = useFormikContext<FormValues>();

  const buttonProps = { loading: formik.isSubmitting };

  return (
    <Modal
      title="Sync user with Slack"
      okText="Sync user"
      okButtonProps={buttonProps}
      onOk={formik.submitForm}
      cancelButtonProps={buttonProps}
      {...props}
    >
      <Form layout="vertical" colon>
        <Form.Item name="slackId" label="Slack ID" required>
          <Input name="slackId" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const SyncSlackModal: CFC<SyncSlackModalProps> = ({ data, ...props }) => {
  const slackMutations = useSlackMutations();

  const validationSchema: YupSchema<FormValues> = yup.object({
    slackId: yup.string().required().default(''),
  });

  const initialValues = getInitialValuesFromSchema(validationSchema);

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    message.loading('Syncing user with Slack account');

    try {
      await slackMutations.syncUser({ userId: data.userId, slackId: values.slackId });
      props.onCancel();
      message.success('User synced with Slack');
    } catch (ex) {
      console.log(ex);
      message.error('Error during syncing with Slack');
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <SyncSlackModalComponent {...props} />
    </Formik>
  );
};
