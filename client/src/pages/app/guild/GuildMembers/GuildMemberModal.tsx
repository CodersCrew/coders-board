import React from 'react';
import { FormikConfig } from 'formik';
import { Form } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { FormikTeamRoleSelect, FormikUserSelect } from '@/components/selects';
import { useGuildMemberMutations, useGuildMembersIds } from '@/graphql/guilds';
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

export type GuildMemberModalData = WithId<FormValues> | null;

type GuildMemberModalProps = DataModalProps<GuildMemberModalData>;

const useGuildMemberModal = (props: GuildMemberModalProps) => {
  const { data, ...modalProps } = props;

  const { guildId } = useGuildContext();
  const { createGuildMember, updateGuildMember } = useGuildMemberMutations();

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    const mutation = props.data
      ? updateGuildMember({ role: values.role, id: props.data.id, guildId })
      : createGuildMember({ ...values, guildId });

    runMutation({
      mutation,
      success: () => props.onCancel(),
      finally: () => helpers.setSubmitting(false),
      messages: getGenericMessages('guild member', props.data ? 'update' : 'create'),
    });
  };
  return {
    modal: {
      ...modalProps,
      title: data ? 'Update guild member' : 'Add new guild member',
      okText: data ? 'Update member' : 'Add member',
    },
    form: {
      initialValues: getInitialValues(props.data),
      validationSchema,
      onSubmit: handleSubmit,
    },
    isUpdateModal: Boolean(data),
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

export const GuildMemberModal = createDataModal<GuildMemberModalProps>(props => {
  const { form, modal, isUpdateModal } = useGuildMemberModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        {!isUpdateModal && <UserPicker />}
        <Form.Item {...fields.role}>
          <FormikTeamRoleSelect name={fields.role.name} />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
