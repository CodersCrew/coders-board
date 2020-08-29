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
import { createFormFields } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';

const { initialValues, validationSchema, fields } = createFormFields({
  name: yup.string().label('Position name').required().default(''),
  description: yup.string().label('Description').optional().nullable(),
  image: yup.string().label('').optional().nullable(),
  clanId: yup.string().label('Related clan').optional().nullable(),
  guildId: yup.string().label('Related guild').optional().nullable(),
});

type FormValues = typeof initialValues;

type FormConfig = FormikConfig<FormValues>;

export type PositionModalData = WithId<FormValues> | null;

type PositionModalProps = DataModalProps<PositionModalData>;

const usePositionModal = (props: PositionModalProps) => {
  const { data, ...modalProps } = props;

  const { createPosition, updatePosition } = usePositionMutations();

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
      initialValues: data ?? initialValues,
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
    <Form.Item {...fields.clanId}>
      <FormikClanSelect
        name={fields.clanId.name}
        placeholder="Choose related clan..."
        allowClear
        guildId={values.guildId}
      />
    </Form.Item>
  );
};

export const PositionModal = createDataModal<PositionModalProps>(props => {
  const { form, modal } = usePositionModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <Form.Item {...fields.name}>
          <Input name={fields.name.name} placeholder="Enter position name..." />
        </Form.Item>
        <Form.Item {...fields.description}>
          <Input.TextArea name={fields.description.name} placeholder="Enter description..." />
        </Form.Item>
        <Form.Item {...fields.guildId}>
          <FormikGuildSelect name={fields.guildId.name} placeholder="Choose related guild..." allowClear />
        </Form.Item>
        <ClanSelectField />
      </Form>
    </FormikModal>
  );
});
