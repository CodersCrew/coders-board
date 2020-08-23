import React, { useEffect } from 'react';
import { FormikConfig, useFormikContext } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { FormikClanSelect, FormikGuildSelect } from '@/components/selects';
import { usePositions } from '@/graphql/positions';
import { createDataModal, DataModalProps } from '@/services/dataModal';
import { WithId } from '@/typings/enhancers';
import { YupSchema } from '@/typings/forms';
import { CreatePositionInput } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

type FormValues = CreatePositionInput;

type FormConfig = FormikConfig<FormValues>;

export type PositionModalData = WithId<FormValues> | null;

type PositionModalProps = DataModalProps<PositionModalData>;

const usePositionModal = (props: PositionModalProps) => {
  const { data, ...modalProps } = props;

  const positions = usePositions();

  const validationSchema: YupSchema<FormValues> = yup.object({
    name: yup.string().required().default(''),
    description: yup.string().optional().nullable(),
    image: yup.string().optional().nullable(),
    clanId: yup.string().optional().nullable(),
    guildId: yup.string().optional().nullable(),
  });

  const initialValues = data ?? getInitialValuesFromSchema(validationSchema);
  const messages = getBasicMessages('position', data ? 'update' : 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      if (data?.id) {
        await positions.update({ variables: { data: { ...values, id: data.id } } });
      } else {
        await positions.create({ variables: { data: values } });
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

  modalProps.title = data?.id ? 'Edit position' : 'Create position';
  modalProps.okText = data?.id ? 'Update position' : 'Create';

  return {
    modal: modalProps,
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
