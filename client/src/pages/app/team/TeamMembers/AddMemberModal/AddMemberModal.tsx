import React from 'react';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { Form } from 'formik-antd';
import * as yup from 'yup';

import { Modal, ModalProps } from '@/components/molecules';
import { FormikTeamRoleSelect } from '@/components/selects/TeamRoleSelect';
import { FormikUserSelect } from '@/components/selects/UserSelect';
import { CFC } from '@/typings/components';
import { YupSchema } from '@/typings/forms';
// import { CreateTeamMemberInput, GraphQLOperations, TeamRole } from '@/typings/graphql';
import { TeamRole } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

// import { useCreateTeamMemberMutation } from './AddMemberModal.apollo';

type FormValues = any;

type FormConfig = FormikConfig<FormValues>;

type AddMemberModalProps = ModalProps & {
  onCancel: () => void;
  teamId: string;
  currentMembersIds: string[];
};

type AddMemberModalComponentProps = Omit<AddMemberModalProps, 'teamId'>;

const AddMemberModalComponent: CFC<AddMemberModalComponentProps> = ({ currentMembersIds, ...props }) => {
  const { isSubmitting, submitForm } = useFormikContext<FormValues>();

  const buttonProps = { loading: isSubmitting };

  return (
    <Modal
      title="Add new team member"
      okText="Add member"
      okButtonProps={buttonProps}
      onOk={submitForm}
      cancelButtonProps={buttonProps}
      {...props}
    >
      <Form layout="vertical" colon>
        <Form.Item name="userId" label="User" required>
          <FormikUserSelect
            name="userId"
            placeholder="Choose user to add..."
            showSearch
            virtual
            idsToOmit={currentMembersIds}
          />
        </Form.Item>
        <Form.Item name="role" label="Role" required>
          <FormikTeamRoleSelect name="role" showSearch virtual />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const AddMemberModal: CFC<AddMemberModalProps> = props => {
  // const [createTeamMember] = useCreateTeamMemberMutation({ refetchQueries: [GraphQLOperations.Query.teamMembers] });

  const validationSchema: YupSchema<FormValues> = yup.object({
    userId: yup.string().required(),
    role: yup.mixed<TeamRole>().optional().default(TeamRole.Member),
  });

  const initialValues = getInitialValuesFromSchema(validationSchema);
  const messages = getBasicMessages('team member', 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      // await createTeamMember({ variables: { data: { ...values, teamId } } });

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
      <AddMemberModalComponent {...props} />
    </Formik>
  );
};
