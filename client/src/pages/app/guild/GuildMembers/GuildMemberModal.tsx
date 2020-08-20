import React from 'react';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { Form } from 'formik-antd';
import * as yup from 'yup';

import { Modal, ModalProps } from '@/components/molecules';
import { FormikTeamRoleSelect, FormikUserSelect } from '@/components/selects';
import { useGuildMembersIds } from '@/graphql/guilds';
import { useGuildMembersMutations } from '@/graphql/guilds/guildMember/useGuildMembersMutations';
import { CFC } from '@/typings/components';
import { YupSchema } from '@/typings/forms';
import { CreateGuildMemberInput, TeamRole } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useGuildContext } from '../GuildContext';

type FormValues = Omit<CreateGuildMemberInput, 'guildId'>;

type FormConfig = FormikConfig<FormValues>;

export type GuildMemberModalProps = ModalProps & {
  onCancel: () => void;
  data: (FormValues & { id: string }) | null;
};

const GuildMemberModalComponent: CFC<GuildMemberModalProps> = ({ data, ...props }) => {
  const formik = useFormikContext<FormValues>();
  const { guildId } = useGuildContext();
  const guildMambersIds = useGuildMembersIds({ guildId });

  const title = data ? 'Update guild member' : 'Add new guild member';
  const okText = data ? 'Update member' : 'Add member';

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
        {!data && (
          <Form.Item name="userId" label="User" required>
            <FormikUserSelect
              name="userId"
              placeholder="Choose user to add..."
              showSearch
              virtual
              idsToOmit={guildMambersIds.userIds}
            />
          </Form.Item>
        )}
        <Form.Item name="role" label="Role" required>
          <FormikTeamRoleSelect name="role" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const GuildMemberModal: CFC<GuildMemberModalProps> = props => {
  const guildMembersMutations = useGuildMembersMutations();
  const { guildId } = useGuildContext();

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

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <GuildMemberModalComponent {...props} />
    </Formik>
  );
};
