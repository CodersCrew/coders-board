import React from 'react';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { Form } from 'formik-antd';
import * as yup from 'yup';

import { Modal, ModalProps } from '@/components/molecules';
import { FormikTeamRoleSelect, FormikUserSelect } from '@/components/selects';
import { CFC } from '@/typings/components';
import { YupSchema } from '@/typings/forms';
import { CreateGuildMemberInput, GraphQLOperations, TeamRole } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useCreateGuildMemberMutation, useUpdateGuildMemberMutation } from './GuildMemberModal.apollo';

type FormValues = Omit<CreateGuildMemberInput, 'guildId'>;

type FormConfig = FormikConfig<FormValues>;

export type GuildMemberModalProps = ModalProps & {
  onCancel: () => void;
  guildId: string;
  currentMembersIds: string[];
  data: (FormValues & { id: string }) | null;
};

type GuildMemberModalComponentProps = Omit<GuildMemberModalProps, 'guildId'>;

const GuildMemberModalComponent: CFC<GuildMemberModalComponentProps> = ({ currentMembersIds, ...props }) => {
  const { isSubmitting, submitForm } = useFormikContext<FormValues>();

  const title = props.data ? 'Update team member' : 'Add new team member';
  const okText = props.data ? 'Update member' : 'Add member';

  const buttonProps = { loading: isSubmitting };

  return (
    <Modal
      title={title}
      okText={okText}
      okButtonProps={buttonProps}
      onOk={submitForm}
      cancelButtonProps={buttonProps}
      {...props}
    >
      <Form layout="vertical" colon>
        {!props.data && (
          <Form.Item name="userId" label="User" required>
            <FormikUserSelect
              name="userId"
              placeholder="Choose user to add..."
              showSearch
              virtual
              idsToOmit={currentMembersIds}
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

export const GuildMemberModal: CFC<GuildMemberModalProps> = ({ guildId, ...props }) => {
  const [createGuildMember] = useCreateGuildMemberMutation({ refetchQueries: [GraphQLOperations.Query.guildMembers] });
  const [updateGuildMember] = useUpdateGuildMemberMutation({ refetchQueries: [GraphQLOperations.Query.guildMembers] });

  const validationSchema: YupSchema<FormValues> = yup.object({
    userId: yup.string().required(),
    role: yup.mixed<TeamRole>().required().default(TeamRole.Member),
  });

  const initialValues = props.data ?? getInitialValuesFromSchema(validationSchema);
  const messages = getBasicMessages('team member', props.data ? 'update' : 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      if (props.data) {
        await updateGuildMember({ variables: { data: { role: values.role, id: props.data.id } } });
      } else {
        await createGuildMember({ variables: { data: { ...values, guildId } } });
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
