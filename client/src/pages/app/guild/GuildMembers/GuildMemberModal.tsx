import React from 'react';
import { FormikConfig } from 'formik';
import { Form } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { FormikTeamRoleSelect, FormikUserSelect } from '@/components/selects';
import { useGuildMembersIds } from '@/graphql/guilds';
import { useGuildMembersMutations } from '@/graphql/guilds/guildMember/useGuildMembersMutations';
import { createDataModal, DataModalProps } from '@/services/dataModal';
import { WithId } from '@/typings/enhancers';
import { YupSchema } from '@/typings/forms';
import { CreateGuildMemberInput, TeamRole } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useGuildContext } from '../GuildContext';

type FormValues = Omit<CreateGuildMemberInput, 'guildId'>;

type FormConfig = FormikConfig<FormValues>;

export type GuildMemberModalData = WithId<FormValues> | null;

type GuildMemberModalProps = DataModalProps<GuildMemberModalData>;

const useGuildMemberModal = (props: GuildMemberModalProps) => {
  const { data, ...modalProps } = props;

  const { guildId } = useGuildContext();
  const guildMembersIds = useGuildMembersIds({ guildId });
  const guildMembersMutations = useGuildMembersMutations();

  const validationSchema: YupSchema<FormValues> = yup.object({
    userId: yup.string().required(),
    role: yup.mixed<TeamRole>().required().default(TeamRole.Member),
  });

  const initialValues = props.data ?? getInitialValuesFromSchema(validationSchema);

  const messages = getBasicMessages('guild member', props.data ? 'update' : 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      if (props.data) {
        await guildMembersMutations.update({
          variables: { data: { role: values.role, id: props.data.id, guildId } },
        });
      } else {
        await guildMembersMutations.create({ variables: { data: { ...values, guildId } } });
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

  modalProps.title = data ? 'Update guild member' : 'Add new guild member';
  modalProps.okText = data ? 'Update member' : 'Add member';

  return {
    modal: modalProps,
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
