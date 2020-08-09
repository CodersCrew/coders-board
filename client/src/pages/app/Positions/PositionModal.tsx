import React from 'react';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { Modal, ModalProps } from '@/components/molecules';
import { FormikTeamSelect } from '@/components/selects/TeamSelect';
import { usePositions } from '@/graphql/positions';
import { CFC } from '@/typings/components';
import { WithId } from '@/typings/enhancers';
import { CreatePositionInput } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

type FormValues = CreatePositionInput;

type FormConfig = FormikConfig<FormValues>;

export type PositionModalProps = ModalProps & {
  onCancel: () => void;
  data: WithId<FormValues> | null;
};

const PositionModalComponent: CFC<PositionModalProps> = ({ data, ...props }) => {
  const { isSubmitting, submitForm } = useFormikContext<FormValues>();
  const title = data?.id ? 'Edit position' : 'Create position';
  const okText = data?.id ? 'Update position' : 'Create';

  const buttonProps = { loading: isSubmitting };

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
        <Form.Item name="name" label="Position name" required>
          <Input name="name" placeholder="Enter position name..." />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea name="description" placeholder="Enter description..." />
        </Form.Item>
        <Form.Item name="teamId" label="Related team">
          <FormikTeamSelect name="teamId" placeholder="Choose related team..." showSearch allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const PositionModal: CFC<PositionModalProps> = props => {
  const positions = usePositions();

  const validationSchema = yup.object({
    name: yup.string().required().default(''),
    description: yup.string().optional().default(''),
    teamId: yup.string().optional(),
  });

  const initialValues = props.data ?? getInitialValuesFromSchema(validationSchema);
  const messages = getBasicMessages('position', props.data ? 'update' : 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      if (props.data?.id) {
        await positions.update({ variables: { data: { ...values, id: props.data.id } } });
      } else {
        await positions.create({ variables: { data: values } });
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
      <PositionModalComponent {...props} />
    </Formik>
  );
};
