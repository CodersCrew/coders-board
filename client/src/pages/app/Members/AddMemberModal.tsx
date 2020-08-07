import React from 'react';
import { message, Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { Form, Input } from 'formik-antd';

import { useUsers } from '@/graphql/users';
import { CFC } from '@/typings/components';
import { CreateUserInput } from '@/typings/graphql';

type FormValues = Omit<CreateUserInput, 'password'>;

type FormConfig = FormikConfig<FormValues>;

type AddMemberModalProps = ModalProps & {
  onCancel: () => void;
};

type AddMemberModalComponentProps = AddMemberModalProps;

export const AddMemberModalComponent: CFC<AddMemberModalComponentProps> = props => {
  const formik = useFormikContext<FormValues>();

  return (
    <Modal
      {...props}
      destroyOnClose
      title="Add a new member"
      okButtonProps={{ onClick: formik.submitForm, children: 'Add member', loading: formik.isSubmitting }}
    >
      <Form layout="vertical" colon>
        <Form.Item name="firstName" label="First name" required>
          <Input name="firstName" placeholder="Enter first name..." />
        </Form.Item>
        <Form.Item name="lastName" label="Last name" required>
          <Input name="lastName" placeholder="Enter last name..." />
        </Form.Item>
        <Form.Item name="primaryEmail" label="CodersCrew email" required>
          <Input name="primaryEmail" placeholder="Enter CodersCrew email..." />
        </Form.Item>
        <Form.Item name="recoveryEmail" label="Private email" required>
          <Input name="recoveryEmail" placeholder="Enter private email..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const AddMemberModal: CFC<AddMemberModalProps> = props => {
  const users = useUsers();

  const initialValues: FormValues = {
    firstName: 'John',
    lastName: 'Doe',
    primaryEmail: 'john-doe-5@coderscrew.pl',
    recoveryEmail: 'konrad.szwarc.dev@gmail.com',
  };

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    const hideMessage = message.loading('Adding a new member...', 0);

    try {
      await users.create({ variables: { data: { ...values, password: '12345678' } } });
      props.onCancel();
      message.success('Member added successfully');
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
      <AddMemberModalComponent {...props} />
    </Formik>
  );
};
