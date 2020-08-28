import React from 'react';
import { FormikConfig } from 'formik';
import { DatePicker, Form, Input } from 'formik-antd';
import moment from 'moment';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { FormikSuccessTypeSelect, FormikUserSelect } from '@/components/selects';
import { useSuccessesMutations } from '@/graphql/successes';
import { createDataModal, DataModalProps } from '@/services/modals';
import { WithId } from '@/typings/enhancers';
import { CreateSuccessInput, SuccessType } from '@/typings/graphql';
import { createValidationSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

type FormValues = CreateSuccessInput;

type FormConfig = FormikConfig<FormValues>;

export type SuccessModalData = WithId<FormValues> | null;

type SuccessModalProps = DataModalProps<SuccessModalData>;

const useSuccessModal = ({ data, ...modalProps }: SuccessModalProps) => {
  const successesMutations = useSuccessesMutations();

  const validationSchema = createValidationSchema<FormValues>({
    name: yup.string().required().default(''),
    description: yup.string().required().default(''),
    date: yup.date().required().max(moment().add(1, 'day').toDate()),
    type: yup.mixed<SuccessType>().required().oneOf(Object.values(SuccessType)).default(SuccessType.Epic),
    usersIds: yup.array(yup.string().required()).required().default([]),
  });

  const initialValues = data ?? validationSchema.initialValues;
  const messages = getBasicMessages('success', data ? 'update' : 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      if (data?.id) {
        await successesMutations.update({ variables: { data: { ...values, id: data.id } } });
      } else {
        await successesMutations.create({ variables: { data: values } });
      }

      modalProps.onCancel();
      messages.success();
    } catch (ex) {
      console.log(ex);
      messages.failure();
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return {
    modal: {
      ...modalProps,
      title: data?.id ? 'Edit success' : 'Add a new success',
      okText: data?.id ? 'Update success' : 'Add success',
    },
    form: {
      initialValues,
      validationSchema,
      onSubmit: handleSubmit,
    },
  };
};

export const SuccessModal = createDataModal<SuccessModalProps>(props => {
  const { form, modal } = useSuccessModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <Form.Item name="name" label="Success name" required>
          <Input name="name" placeholder="Enter position name..." />
        </Form.Item>
        <Form.Item name="description" label="Description" required>
          <Input.TextArea name="description" placeholder="Enter description..." />
        </Form.Item>
        <Form.Item name="date" label="Date" required>
          <DatePicker
            name="date"
            placeholder="Choose success date..."
            allowClear={false}
            disabledDate={current => current.isSameOrAfter(moment())}
          />
        </Form.Item>
        <Form.Item name="type" label="Type of the success" required>
          <FormikSuccessTypeSelect name="type" />
        </Form.Item>
        <Form.Item name="usersIds" label="Users participating in the success">
          <FormikUserSelect name="usersIds" mode="multiple" />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
