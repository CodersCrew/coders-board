import React from 'react';
import { FormikConfig } from 'formik';
import { Form } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { FormikTeamRoleSelect, FormikUserSelect } from '@/components/selects';
import { useSquadMembers, useSquadMembersIds } from '@/graphql/squads';
import { createDataModal, DataModalProps } from '@/services/modals';
import { WithId } from '@/typings/enhancers';
import { CreateSquadMemberInput, TeamRole } from '@/typings/graphql';
import { createValidationSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useSquadContext } from '../SquadContext';

type FormValues = Omit<CreateSquadMemberInput, 'squadId'>;

type FormConfig = FormikConfig<FormValues>;

export type SquadMemberModalData = WithId<FormValues> | null;

type SquadMemberModalProps = DataModalProps<SquadMemberModalData>;

const useSquadMemberModal = (props: SquadMemberModalProps) => {
  const { data, ...modalProps } = props;

  const { squadId } = useSquadContext();
  const squadMembers = useSquadMembers();
  const squadMembersIds = useSquadMembersIds({ squadId });

  const validationSchema = createValidationSchema<FormValues>({
    userId: yup.string().required(),
    role: yup.mixed<TeamRole>().required().default(TeamRole.Member),
  });

  const initialValues = data ?? validationSchema.initialValues;
  const messages = getBasicMessages('squad member', data ? 'update' : 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      if (data) {
        await squadMembers.update({
          variables: { data: { role: values.role, id: data.id, squadId } },
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

  modalProps.title = data ? 'Update squad member' : 'Add new squad member';
  modalProps.okText = data ? 'Update member' : 'Add member';

  return {
    modal: modalProps,
    form: {
      initialValues,
      validationSchema,
      onSubmit: handleSubmit,
    },
    squadMembersIds,
    data,
  };
};

export const SquadMemberModal = createDataModal<SquadMemberModalProps>(props => {
  const { form, modal, squadMembersIds, data } = useSquadMemberModal(props);

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
              idsToOmit={squadMembersIds.membersUserIds}
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
