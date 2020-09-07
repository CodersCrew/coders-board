import React from 'react';
import { FormikConfig } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { useChapterMutations, useSquad } from '@/graphql/squads';
import { runMutation } from '@/services/graphql';
import { createDataModal, DataModalProps } from '@/services/modals';
import { WithId } from '@/typings/enhancers';
import { CreateChapterInput } from '@/typings/graphql';
import { createFormFields } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';

import { useSquadContext } from '../SquadContext';

const { getInitialValues, validationSchema, fields } = createFormFields({
  name: yup.string().label('Name').required().default(''),
  description: yup.string().label('Description').optional().default(''),
});

type FormValues = ReturnType<typeof getInitialValues>;

type FormConfig = FormikConfig<FormValues>;

export type SquadChapterModalData = WithId<FormValues> | null;

type SquadChapterModalProps = DataModalProps<SquadChapterModalData>;

const useSquadChapterModal = (props: SquadChapterModalProps) => {
  const { data, ...modalProps } = props;

  const { squadId } = useSquadContext();
  const squad = useSquad({ id: squadId });
  const { createChapter, updateChapter } = useChapterMutations();

  if (!squad.data) {
    throw new Error('SquadChapterModal must be used in a scope of the particular squad');
  }

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    const input: CreateChapterInput = {
      ...values,
      squadId,
    };

    const mutation = data ? updateChapter({ ...input, id: data.id }) : createChapter(input);

    runMutation({
      mutation,
      success: () => modalProps.onCancel(),
      finally: () => helpers.setSubmitting(false),
      messages: getGenericMessages('chapter', data ? 'update' : 'create'),
    });
  };

  modalProps.title = data ? 'Update chapter' : 'Add new chapter';
  modalProps.okText = data ? 'Update chapter' : 'Add chapter';

  return {
    modal: modalProps,
    form: {
      initialValues: getInitialValues(data),
      validationSchema,
      onSubmit: handleSubmit,
    },
  };
};

export const SquadChapterModal = createDataModal<SquadChapterModalProps>(props => {
  const { form, modal } = useSquadChapterModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <Form.Item {...fields.name}>
          <Input name={fields.name.name} placeholder="Enter chapter name..." />
        </Form.Item>
        <Form.Item {...fields.description}>
          <Input.TextArea name={fields.description.name} placeholder="Enter description..." />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
