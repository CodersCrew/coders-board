import React from 'react';
import { Formik, FormikConfig } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { Button } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { useAuth } from '@/graphql/users';
import { runMutation } from '@/services/graphql';
import { createFormFields } from '@/utils/forms';

const { getInitialValues, validationSchema, fields } = createFormFields({
  primaryEmail: yup.string().label('CodersCrew email').required(),
  password: yup.string().label('Password').required(),
});

type FormValues = ReturnType<typeof getInitialValues>;

type FormConfig = FormikConfig<FormValues>;

export const LocalLogin = () => {
  const { signIn } = useAuth();

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    await runMutation({
      mutation: signIn(values),
      finally: () => helpers.setSubmitting(false),
      messages: { loading: 'Logging in...', success: 'You are in 😄', failure: 'Wrong email or password' },
    });
  };

  return (
    <Formik initialValues={getInitialValues()} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form layout="vertical" colon>
        <Card p={24} width={320}>
          <Form.Item {...fields.primaryEmail}>
            <Input name={fields.primaryEmail.name} />
          </Form.Item>
          <Form.Item {...fields.password}>
            <Input.Password name={fields.password.name} />
          </Form.Item>
          <Button mt={16} htmlType="submit" block type="primary">
            Log in
          </Button>
        </Card>
      </Form>
    </Formik>
  );
};
