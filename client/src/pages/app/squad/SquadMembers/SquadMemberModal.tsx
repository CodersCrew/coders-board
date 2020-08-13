import React from 'react';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { Form } from 'formik-antd';
import * as yup from 'yup';

import { Modal, ModalProps } from '@/components/molecules';
import { FormikTeamRoleSelect, FormikUserSelect } from '@/components/selects';
import { useSquadMembers, useSquadMembersIds } from '@/graphql/squads';
import { CFC } from '@/typings/components';
import { YupSchema } from '@/typings/forms';
import { CreateSquadMemberInput, TeamRole } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useSquadContext } from '../SquadContext';

type FormValues = Omit<CreateSquadMemberInput, 'squadId'>;

type FormConfig = FormikConfig<FormValues>;

export type SquadMemberModalProps = ModalProps & {
  onCancel: () => void;
  data: (FormValues & { id: string }) | null;
};

const SquadMemberModalComponent: CFC<SquadMemberModalProps> = ({ data, ...props }) => {
  const { squadId } = useSquadContext();
  const formik = useFormikContext<FormValues>();
  const squadMembersIds = useSquadMembersIds({ squadId });

  const title = data ? 'Update squad member' : 'Add new squad member';
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
              idsToOmit={squadMembersIds.membersUserIds}
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

export const SquadMemberModal: CFC<SquadMemberModalProps> = props => {
  const { squadId } = useSquadContext();
  const squadMembers = useSquadMembers();

  const validationSchema: YupSchema<FormValues> = yup.object({
    userId: yup.string().required(),
    role: yup.mixed<TeamRole>().required().default(TeamRole.Member),
  });

  const initialValues = props.data ?? getInitialValuesFromSchema(validationSchema);
  const messages = getBasicMessages('squad member', props.data ? 'update' : 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      if (props.data) {
        await squadMembers.update({
          variables: { data: { role: values.role, id: props.data.id, squadId } },
        });
      } else {
        await squadMembers.create({ variables: { data: { ...values, squadId } } });
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
      <SquadMemberModalComponent {...props} />
    </Formik>
  );
};
