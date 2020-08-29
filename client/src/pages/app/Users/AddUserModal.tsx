import React from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { useUsersMutations } from '@/graphql/users';
import { runMutation } from '@/services/graphql';
import { CFC } from '@/typings/components';
import { CreateUserInput } from '@/typings/graphql';
import { createValidationSchema } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';

type FormValues = Omit<CreateUserInput, 'password'>;

type FormConfig = FormikConfig<FormValues>;

type AddUserModalProps = ModalProps & {
  onCancel: () => void;
};

type AddUserModalComponentProps = AddUserModalProps;

const EMAIL_SUFFIX = '@coderscrew.pl';

export const AddUserModalComponent: CFC<AddUserModalComponentProps> = props => {
  const formik = useFormikContext<FormValues>();

  return (
    <Modal
      {...props}
      destroyOnClose
      title="Add a new user"
      okButtonProps={{ onClick: formik.submitForm, children: 'Add user', loading: formik.isSubmitting }}
    >
      <Form layout="vertical" colon>
        <Form.Item name="firstName" label="First name" required>
          <Input name="firstName" placeholder="Enter first name..." />
        </Form.Item>
        <Form.Item name="lastName" label="Last name" required>
          <Input name="lastName" placeholder="Enter last name..." />
        </Form.Item>
        <Form.Item name="primaryEmail" label="CodersCrew email" required>
          <Input name="primaryEmail" placeholder="Enter CodersCrew email..." addonAfter={EMAIL_SUFFIX} />
        </Form.Item>
        <Form.Item name="recoveryEmail" label="Private email" required>
          <Input name="recoveryEmail" placeholder="Enter private email..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const AddUserModal: CFC<AddUserModalProps> = props => {
  const { createUser } = useUsersMutations();

  const validationSchema = createValidationSchema<FormValues>({
    firstName: yup.string().required().default(''),
    lastName: yup.string().required().default(''),
    primaryEmail: yup.string().required().lowercase().default(''),
    recoveryEmail: yup.string().required().email().default(''),
  });

  const { initialValues } = validationSchema;

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    const primaryEmail = values.primaryEmail + EMAIL_SUFFIX;

    const isEmailValid = yup.string().email().isValidSync(primaryEmail);

    if (!isEmailValid) {
      helpers.setFieldError('primaryEmail', 'Invalid email format');
    } else {
      runMutation({
        mutation: createUser({ ...values, primaryEmail, password: 'Li837jdk3JKP' }),
        success: () => props.onCancel(),
        finally: () => helpers.setSubmitting(false),
        messages: getGenericMessages('user', 'create'),
      });
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <AddUserModalComponent {...props} />
    </Formik>
  );
};
