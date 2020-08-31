import React from 'react';
import { FormikConfig } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { useUsersMutations } from '@/graphql/users';
import { runMutation } from '@/services/graphql';
import { createDataModal, DataModalProps } from '@/services/modals';
import { WithId } from '@/typings/enhancers';
import { createFormFields } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';

const { getInitialValues, validationSchema, fields } = createFormFields({
  firstName: yup.string().label('First name').required().default(''),
  lastName: yup.string().label('Last name').required().default(''),
  primaryEmail: yup.string().label('CodersCrew email').required().lowercase().default(''),
  recoveryEmail: yup.string().label('Private email').required().email().default(''),
});

type FormValues = ReturnType<typeof getInitialValues>;

type FormConfig = FormikConfig<FormValues>;

export type UserModalData = WithId<FormValues> | null;

type UserModalProps = DataModalProps<UserModalData>;

const EMAIL_SUFFIX = '@coderscrew.pl';

const useUserModal = ({ data, ...modalProps }: UserModalProps) => {
  const { createUser, updateUser } = useUsersMutations();

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    const primaryEmail = values.primaryEmail + EMAIL_SUFFIX;

    const isEmailValid = yup.string().email().isValidSync(primaryEmail);

    if (!isEmailValid) {
      helpers.setFieldError('primaryEmail', 'Invalid email format');
    } else {
      const mutation = data
        ? updateUser({ ...values, primaryEmail, id: data.id })
        : createUser({ ...values, primaryEmail, password: 'Li837jdk3JKP' });

      runMutation({
        mutation,
        success: () => modalProps.onCancel(),
        finally: () => helpers.setSubmitting(false),
        messages: getGenericMessages('user', data ? 'update' : 'create'),
      });
    }
  };

  const initialData: FormValues | undefined = data
    ? { ...data, primaryEmail: data.primaryEmail.replace(EMAIL_SUFFIX, '') }
    : undefined;

  return {
    modal: {
      ...modalProps,
      title: data ? 'Update user' : 'Add a new user',
      okText: data ? 'Update user' : 'Add user',
    },
    form: {
      initialValues: getInitialValues(initialData),
      validationSchema,
      onSubmit: handleSubmit,
    },
  };
};

export const UserModal = createDataModal<UserModalProps>(props => {
  const { form, modal } = useUserModal(props);

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
