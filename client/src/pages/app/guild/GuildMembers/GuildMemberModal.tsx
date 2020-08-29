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
import { CreateGuildMemberInput, TeamRole } from '@/typings/graphql';
import { createValidationSchema } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';

import { useGuildContext } from '../GuildContext';

type FormValues = Omit<CreateGuildMemberInput, 'guildId'>;

type FormConfig = FormikConfig<FormValues>;

export type GuildMemberModalData = WithId<FormValues> | null;

type GuildMemberModalProps = DataModalProps<GuildMemberModalData>;

const useGuildMemberModal = (props: GuildMemberModalProps) => {
  const { data, ...modalProps } = props;

  const { guildId } = useGuildContext();
  const guildMembersIds = useGuildMembersIds({ guildId });
  const { createGuildMember, updateGuildMember } = useGuildMemberMutations();

  const validationSchema = createValidationSchema<FormValues>({
    userId: yup.string().required(),
    role: yup.mixed<TeamRole>().required().default(TeamRole.Member),
  });

  const initialValues = props.data ?? validationSchema.initialValues;

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
      initialValues,
      validationSchema,
      onSubmit: handleSubmit,
    },
    guildMembersIds,
    data,
  };
};

export const GuildMemberModal = createDataModal<GuildMemberModalProps>(props => {
  const { form, modal, guildMembersIds, data } = useGuildMemberModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        {!data && (
          <Form.Item name="userId" label="User" required>
            <FormikUserSelect
              name="userId"
              placeholder="Choose user to add..."
              showSearch
              virtual
              idsToOmit={guildMembersIds.userIds}
            />
          </Form.Item>
        )}
        <Form.Item name="role" label="Role" required>
          <FormikTeamRoleSelect name="role" />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
