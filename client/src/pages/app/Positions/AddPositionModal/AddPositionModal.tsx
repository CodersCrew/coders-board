import React from 'react';
import { message, Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { Form, Input } from 'formik-antd';

import { useCreatePositionMutation } from './AddPositionModal.apollo';
import { FormikTeamSelect } from '@/components/selects/TeamSelect';
import { CFC } from '@/typings/components';
import { CreatePositionInput, GraphQLOperations } from '@/typings/graphql';

type FormValues = Omit<CreatePositionInput, 'password'>;

type FormConfig = FormikConfig<FormValues>;

type AddPositionModalProps = ModalProps & {
  onCancel: () => void;
};

type AddPositionModalComponentProps = AddPositionModalProps;

export const AddPositionModalComponent: CFC<AddPositionModalComponentProps> = props => {
  const { submitForm, isSubmitting } = useFormikContext<FormValues>();

  return (
    <Modal
      {...props}
      title="Add a new member"
      okButtonProps={{ onClick: submitForm, children: 'Add member', loading: isSubmitting }}
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

export const AddPositionModal: CFC<AddPositionModalProps> = props => {
  const [createPosition] = useCreatePositionMutation({ refetchQueries: [GraphQLOperations.Query.positions] });

  const initialValues: FormValues = {
    name: '',
    description: '',
    image: '',
    teamId: '',
  };

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    const hideMessage = message.loading('Adding a new member...', 0);

    try {
      await createPosition({ variables: { data: values } });
      helpers.resetForm();
      props.onCancel();
      message.success('Position added successfully');
    } catch (ex) {
      console.log(ex);
      message.error('Error with adding member');
    } finally {
      hideMessage();
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <AddPositionModalComponent {...props} />
    </Formik>
  );
};
