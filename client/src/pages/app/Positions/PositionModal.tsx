import React, { useEffect } from 'react';
import { FormikConfig, useFormikContext } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { FormikClanSelect, FormikGuildSelect } from '@/components/selects';
import { usePositionMutations } from '@/graphql/positions';
import { runMutation } from '@/services/graphql';
import { createDataModal, DataModalProps } from '@/services/modals';
import { WithId } from '@/typings/enhancers';
import { CreatePositionInput } from '@/typings/graphql';
import { createValidationSchema } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';

type FormValues = CreatePositionInput;

type FormConfig = FormikConfig<FormValues>;

export type PositionModalData = WithId<FormValues> | null;

type PositionModalProps = DataModalProps<PositionModalData>;

const usePositionModal = (props: PositionModalProps) => {
  const { data, ...modalProps } = props;

  const { createPosition, updatePosition } = usePositionMutations();

  const validationSchema = createValidationSchema<FormValues>({
    name: yup.string().required().default(''),
    description: yup.string().optional().nullable(),
    image: yup.string().optional().nullable(),
    clanId: yup.string().optional().nullable(),
    guildId: yup.string().optional().nullable(),
  });

  const initialValues = data ?? validationSchema.initialValues;

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    const mutation = data?.id ? updatePosition({ ...values, id: data.id }) : createPosition(values);

    runMutation({
      mutation,
      success: () => modalProps.onCancel(),
      finally: () => helpers.setSubmitting(false),
      messages: getGenericMessages('position', data ? 'update' : 'create'),
    });
  };

  return {
    modal: {
      ...modalProps,
      title: data?.id ? 'Edit position' : 'Create position',
      okText: data?.id ? 'Update position' : 'Create',
    },
    form: {
      initialValues,
      validationSchema,
      onSubmit: handleSubmit,
    },
  };
};

const ClanSelectField = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  useEffect(() => {
    if (!values.guildId && values.clanId) {
      setFieldValue('clanId', undefined);
    }
  }, [values.guildId]);

  if (!values.guildId) return null;

  return (
    <Form.Item name="clanId" label="Related clan">
      <FormikClanSelect name="clanId" placeholder="Choose related clan..." allowClear guildId={values.guildId} />
    </Form.Item>
  );
};

export const PositionModal = createDataModal<PositionModalProps>(props => {
  const { form, modal } = usePositionModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <Form.Item name="name" label="Position name" required>
          <Input name="name" placeholder="Enter position name..." />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea name="description" placeholder="Enter description..." />
        </Form.Item>
        <Form.Item name="guildId" label="Related guild">
          <FormikGuildSelect name="guildId" placeholder="Choose related guild..." allowClear />
        </Form.Item>
        <ClanSelectField />
      </Form>
    </FormikModal>
  );
});
