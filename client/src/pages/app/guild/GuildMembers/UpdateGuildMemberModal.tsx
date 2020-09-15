import React from 'react';
import { FormikConfig } from 'formik';
import { Form } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { FormikTeamRoleSelect } from '@/components/selects';
import { useGuildMemberMutations } from '@/graphql/guilds';
import { runMutation } from '@/services/graphql';
import { createDataModal, DataModalProps } from '@/services/modals';
import { WithId } from '@/typings/enhancers';
import { TeamRole } from '@/typings/graphql';
import { createFormFields } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';

import { useGuildContext } from '../GuildContext';

const { getInitialValues, validationSchema, fields } = createFormFields({
  userId: yup.string().label('User').required(),
  role: yup.mixed<TeamRole>().label('Role').required().default(TeamRole.Member),
});

type FormValues = ReturnType<typeof getInitialValues>;

type FormConfig = FormikConfig<FormValues>;

export type UpdateGuildMemberModalData = WithId<FormValues>;

type UpdateGuildMemberModalProps = DataModalProps<UpdateGuildMemberModalData>;

const useUpdateGuildMemberModal = ({ data, ...modalProps }: UpdateGuildMemberModalProps) => {
  const { guildId } = useGuildContext();
  const { updateGuildMember } = useGuildMemberMutations();

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    runMutation({
      mutation: updateGuildMember({ role: values.role, id: data.id, guildId }),
      success: () => modalProps.onCancel(),
      finally: () => helpers.setSubmitting(false),
      messages: getGenericMessages('guild member', 'update'),
    });
  };

  return {
    modal: {
      ...modalProps,
      title: 'Update guild member',
      okText: 'Update member',
    },
    form: {
      initialValues: getInitialValues(data),
      validationSchema,
      onSubmit: handleSubmit,
    },
  };
};

export const UpdateGuildMemberModal = createDataModal<UpdateGuildMemberModalProps>(props => {
  const { form, modal } = useUpdateGuildMemberModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <Form.Item {...fields.role}>
          <FormikTeamRoleSelect name={fields.role.name} />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
