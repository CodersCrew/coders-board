import React from 'react';
import { FormikConfig } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { useChaptersMutations, useSquad } from '@/graphql/squads';
import { createDataModal, DataModalProps } from '@/services/dataModal';
import { WithId } from '@/typings/enhancers';
import { YupSchema } from '@/typings/forms';
import { CreateChapterInput } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useSquadContext } from '../SquadContext';

type FormValues = Omit<CreateChapterInput, 'squadId'>;

type FormConfig = FormikConfig<FormValues>;

export type SquadChapterModalData = WithId<FormValues> | null;

type SquadChapterModalProps = DataModalProps<SquadChapterModalData>;

const CHAPTER_SUFFIX = '-chapter@coderscrew.pl';

const useSquadChapterModal = (props: SquadChapterModalProps) => {
  const { data, ...modalProps } = props;

  const { squadId } = useSquadContext();
  const squad = useSquad({ squadId });
  const chaptersMutations = useChaptersMutations();

  if (!squad.data) {
    throw new Error('SquadChapterModal must be used in a scope of the particular squad');
  }

  const chapterPrefix = `${squad.data.name.toLowerCase().replace(/\s/g, '-')}-`;
  const emailRegex = new RegExp(`${chapterPrefix}(.*)${CHAPTER_SUFFIX}`);

  const validationSchema: YupSchema<FormValues> = yup.object({
    name: yup.string().required().default(''),
    description: yup.string().optional().default(''),
    email: yup.string().required().lowercase().default(''),
  });

  const initialValues = data
    ? { ...data, email: data.email.match(emailRegex)?.[1] ?? '' }
    : getInitialValuesFromSchema(validationSchema);
  const messages = getBasicMessages('chapter', data ? 'update' : 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      const input: CreateChapterInput = {
        ...values,
        squadId,
        email: `${chapterPrefix}${values.email}${CHAPTER_SUFFIX}`,
      };

      if (data) {
        await chaptersMutations.update({
          variables: { data: { ...input, id: data.id } },
        });
      } else {
        await chaptersMutations.create({ variables: { data: input } });
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

  modalProps.title = data ? 'Update chapter' : 'Add new chapter';
  modalProps.okText = data ? 'Update chapter' : 'Add chapter';

  return {
    modal: modalProps,
    form: {
      initialValues,
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
        <Form.Item name="name" label="Name" required>
          <Input name="name" placeholder="Enter chapter name..." />
        </Form.Item>
        <Form.Item name="email" label="E-mail" required>
          <Input
            name="email"
            placeholder="Enter e-mail prefix..."
            addonBefore={chapterPrefix}
            addonAfter={CHAPTER_SUFFIX}
          />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea name="description" placeholder="Enter description..." />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
