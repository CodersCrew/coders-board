import React from 'react';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { Form, Input } from 'formik-antd';
import * as yup from 'yup';

import { Modal, ModalProps } from '@/components/molecules';
import { useChaptersMutations, useSquad } from '@/graphql/squads';
import { CFC } from '@/typings/components';
import { YupSchema } from '@/typings/forms';
import { CreateChapterInput } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useSquadContext } from '../SquadContext';

type FormValues = Omit<CreateChapterInput, 'squadId'>;

type FormConfig = FormikConfig<FormValues>;

export type SquadChapterModalProps = ModalProps & {
  onCancel: () => void;
  data: (FormValues & { id: string }) | null;
};

export type SquadChapterModalComponentProps = SquadChapterModalProps & {
  chapterPrefix: string;
};

const CHAPTER_SUFFIX = '-chapter@coderscrew.pl';

const SquadChapterModalComponent: CFC<SquadChapterModalComponentProps> = ({ data, chapterPrefix, ...props }) => {
  const formik = useFormikContext<FormValues>();

  const title = data ? 'Update chapter' : 'Add new chapter';
  const okText = data ? 'Update chapter' : 'Add chapter';

  const buttonProps = { loading: formik.isSubmitting };

  return (
    <Modal
      title={title}
      okText={okText}
      okButtonProps={buttonProps}
      onOk={formik.submitForm}
      cancelButtonProps={buttonProps}
      {...props}
    >
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
    </Modal>
  );
};

export const SquadChapterModal: CFC<SquadChapterModalProps> = props => {
  const { squadId } = useSquadContext();
  const squad = useSquad({ squadId });
  const chaptersMutations = useChaptersMutations();

  if (!squad.data) return null;

  const chapterPrefix = `${squad.data.name.toLowerCase().replace(/\s/g, '-')}-`;
  const emailRegex = new RegExp(`${chapterPrefix}(.*)${CHAPTER_SUFFIX}`);

  const validationSchema: YupSchema<FormValues> = yup.object({
    name: yup.string().required().default(''),
    description: yup.string().optional().default(''),
    email: yup.string().required().lowercase().default(''),
  });

  const initialValues = props.data
    ? { ...props.data, email: props.data.email.match(emailRegex)?.[1] ?? '' }
    : getInitialValuesFromSchema(validationSchema);
  const messages = getBasicMessages('chapter', props.data ? 'update' : 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      const data: CreateChapterInput = {
        ...values,
        squadId,
        email: `${chapterPrefix}${values.email}${CHAPTER_SUFFIX}`,
      };

      if (props.data) {
        await chaptersMutations.update({
          variables: { data: { ...data, id: props.data.id } },
        });
      } else {
        await chaptersMutations.create({ variables: { data } });
      }

      props.onCancel();
      messages.success();
    } catch (ex) {
      console.log(ex);
      messages.failure();
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <SquadChapterModalComponent {...props} chapterPrefix={chapterPrefix} />
    </Formik>
  );
};
