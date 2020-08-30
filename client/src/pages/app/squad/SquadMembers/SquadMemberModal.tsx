import React from 'react';
import { FormikConfig } from 'formik';
import { Form } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { FormikTeamRoleSelect, FormikUserSelect } from '@/components/selects';
import { useSquadMemberMutations, useSquadMembersIds } from '@/graphql/squads';
import { runMutation } from '@/services/graphql';
import { createDataModal, DataModalProps } from '@/services/modals';
import { WithId } from '@/typings/enhancers';
import { TeamRole } from '@/typings/graphql';
import { createFormFields } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';

import { useSquadContext } from '../SquadContext';

const { getInitialValues, validationSchema, fields } = createFormFields({
  userId: yup.string().required(),
  role: yup.mixed<TeamRole>().required().default(TeamRole.Member),
});

type FormValues = ReturnType<typeof getInitialValues>;

type FormConfig = FormikConfig<FormValues>;

export type SquadMemberModalData = WithId<FormValues> | null;

type SquadMemberModalProps = DataModalProps<SquadMemberModalData>;

const useSquadMemberModal = (props: SquadMemberModalProps) => {
  const { data, ...modalProps } = props;

  const { squadId } = useSquadContext();
  const { createSquadMember, updateSquadMember } = useSquadMemberMutations();

  const handleSubmit: FormConfig['onSubmit'] = (values, helpers) => {
    const mutation = data
      ? updateSquadMember({ role: values.role, id: data.id, squadId })
      : createSquadMember({ ...values, squadId });

    runMutation({
      mutation,
      success: () => props.onCancel(),
      finally: () => helpers.setSubmitting(false),
      messages: getGenericMessages('squad member', data ? 'update' : 'create'),
    });
  };

  return {
    modal: {
      ...modalProps,
      title: data ? 'Update squad member' : 'Add new squad member',
      okText: data ? 'Update member' : 'Add member',
    },
    form: {
      initialValues: getInitialValues(data),
      validationSchema,
      onSubmit: handleSubmit,
    },
    isUpdateModal: Boolean(data),
  };
};

const MemberPicker = () => {
  const { squadId } = useSquadContext();
  const squadMembersIds = useSquadMembersIds({ squadId });

  return (
    <Form.Item {...fields.userId}>
      <FormikUserSelect
        name={fields.userId.name}
        placeholder="Choose user to add..."
        showSearch
        virtual
        idsToOmit={squadMembersIds.membersUserIds}
      />
    </Form.Item>
  );
};

export const SquadMemberModal = createDataModal<SquadMemberModalProps>(props => {
  const { form, modal, isUpdateModal } = useSquadMemberModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        {!isUpdateModal && <MemberPicker />}
        <Form.Item {...fields.role}>
          <FormikTeamRoleSelect name={fields.role.name} />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
