import React from 'react';
import { FormikConfig } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { useUsersMutations } from '@/graphql/users';
import { runMutation } from '@/services/graphql';
import { createDataModal, DataModalProps } from '@/services/modals';
import { createFormFields } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';

const { initialValues, validationSchema, fields } = createFormFields({
  firstName: yup.string().label('First name').required().default(''),
  lastName: yup.string().label('Last name').required().default(''),
  primaryEmail: yup.string().label('CodersCrew email').required().lowercase().default(''),
  recoveryEmail: yup.string().label('Private email').required().email().default(''),
});

type FormValues = typeof initialValues;

type FormConfig = FormikConfig<FormValues>;

type AddUserModalProps = DataModalProps<null>;

const EMAIL_SUFFIX = '@coderscrew.pl';

const useAddUserModal = (props: AddUserModalProps) => {
  const { createUser } = useUsersMutations();

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

  return {
    modal: {
      ...props,
      title: 'Add a new user',
      okText: 'Add user',
    },
    form: {
      initialValues,
      validationSchema,
      onSubmit: handleSubmit,
    },
  };
};

export const AddUserModal = createDataModal<AddUserModalProps>(props => {
  const { form, modal } = useAddUserModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <Form.Item {...fields.firstName}>
          <Input name={fields.firstName.name} placeholder="Enter first name..." />
        </Form.Item>
        <Form.Item {...fields.lastName}>
          <Input name={fields.lastName.name} placeholder="Enter last name..." />
        </Form.Item>
        <Form.Item {...fields.primaryEmail}>
          <Input name={fields.primaryEmail.name} placeholder="Enter CodersCrew email..." addonAfter={EMAIL_SUFFIX} />
        </Form.Item>
        <Form.Item {...fields.recoveryEmail}>
          <Input name={fields.recoveryEmail.name} placeholder="Enter private email..." />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
