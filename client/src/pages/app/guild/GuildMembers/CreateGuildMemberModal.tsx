import React from 'react';
import { FormikConfig } from 'formik';
import { Form } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { FormikPositionSelect, FormikTeamRoleSelect, FormikUserSelect } from '@/components/selects';
import { useGuildMemberMutations, useGuildMembersIds } from '@/graphql/guilds';
import { runMutation } from '@/services/graphql';
import { createSimpleModal, SimpleModalProps } from '@/services/modals';
import { PositionScope, TeamRole } from '@/typings/graphql';
import { createFormFields } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';

import { useGuildContext } from '../GuildContext';

const { getInitialValues, validationSchema, fields } = createFormFields({
  userId: yup.string().label('User').required(),
  role: yup.mixed<TeamRole>().label('Role').required().default(TeamRole.Member),
  positionId: yup.string().label('Position').required(),
});

type FormValues = ReturnType<typeof getInitialValues>;

type FormConfig = FormikConfig<FormValues>;

type CreateGuildMemberModalProps = SimpleModalProps;

const useCreateGuildMemberModal = (modalProps: CreateGuildMemberModalProps) => {
  const { guildId } = useGuildContext();
  const { createGuildMember } = useGuildMemberMutations();

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    runMutation({
      mutation: createGuildMember({ ...values, guildId }),
      success: () => modalProps.onCancel(),
      finally: () => helpers.setSubmitting(false),
      messages: getGenericMessages('guild member', 'create'),
    });
  };

  return {
    modal: {
      ...modalProps,
      title: 'Add new guild member',
      okText: 'Add member',
    },
    form: {
      initialValues: getInitialValues(),
      validationSchema,
      onSubmit: handleSubmit,
    },
  };
};

const UserPicker = () => {
  const { guildId } = useGuildContext();
  const guildMembersIds = useGuildMembersIds({ guildId });

  return (
    <Form.Item {...fields.userId}>
      <FormikUserSelect
        name={fields.userId.name}
        placeholder="Choose user to add..."
        showSearch
        autoFocus
        virtual
        idsToOmit={guildMembersIds.userIds}
      />
    </Form.Item>
  );
};

export const CreateGuildMemberModal = createSimpleModal<CreateGuildMemberModalProps>(props => {
  const { form, modal } = useCreateGuildMemberModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <UserPicker />
        <Form.Item {...fields.role}>
          <FormikTeamRoleSelect name={fields.role.name} />
        </Form.Item>
        <Form.Item {...fields.positionId}>
          <FormikPositionSelect name={fields.positionId.name} scopes={[PositionScope.Guild]} />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
