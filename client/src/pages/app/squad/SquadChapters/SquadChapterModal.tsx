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

const { initialValues, validationSchema, fields } = createFormFields({
  name: yup.string().label('Name').required().default(''),
  description: yup.string().label('E-mail').optional().default(''),
  email: yup.string().label('Description').required().lowercase().default(''),
});

type FormValues = typeof initialValues;

type FormConfig = FormikConfig<FormValues>;

export type SquadChapterModalData = WithId<FormValues> | null;

type SquadChapterModalProps = DataModalProps<SquadChapterModalData>;

const CHAPTER_SUFFIX = '-chapter@coderscrew.pl';

const useSquadChapterModal = (props: SquadChapterModalProps) => {
  const { data, ...modalProps } = props;

  const { squadId } = useSquadContext();
  const squad = useSquad({ id: squadId });
  const { createChapter, updateChapter } = useChapterMutations();

  if (!squad.data) {
    throw new Error('SquadChapterModal must be used in a scope of the particular squad');
  }

  const chapterPrefix = `${squad.data.name.toLowerCase().replace(/\s/g, '-')}-`;
  const emailRegex = new RegExp(`${chapterPrefix}(.*)${CHAPTER_SUFFIX}`);

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    const input: CreateChapterInput = {
      ...values,
      squadId,
      email: `${chapterPrefix}${values.email}${CHAPTER_SUFFIX}`,
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
      initialValues: data ? { ...data, email: data.email.match(emailRegex)?.[1] ?? '' } : initialValues,
      validationSchema,
      onSubmit: handleSubmit,
    },
    chapterPrefix,
  };
};

export const SquadChapterModal = createDataModal<SquadChapterModalProps>(props => {
  const { form, modal, chapterPrefix } = useSquadChapterModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <Form.Item {...fields.name}>
          <Input name={fields.name.name} placeholder="Enter chapter name..." />
        </Form.Item>
        <Form.Item {...fields.email}>
          <Input
            name={fields.email.name}
            placeholder="Enter e-mail prefix..."
            addonBefore={chapterPrefix}
            addonAfter={CHAPTER_SUFFIX}
          />
        </Form.Item>
        <Form.Item {...fields.description}>
          <Input.TextArea name={fields.description.name} placeholder="Enter description..." />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});