import React from 'react';
import { FormikConfig } from 'formik';
import { Form } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { FormikPositionSelect, FormikTeamRoleSelect, FormikUserSelect } from '@/components/selects';
import { useSquadMemberMutations, useSquadMembersIds } from '@/graphql/squads';
import { runMutation } from '@/services/graphql';
import { createSimpleModal, SimpleModalProps } from '@/services/modals';
import { PositionScope, TeamRole } from '@/typings/graphql';
import { createFormFields } from '@/utils/forms';
import { getGenericMessages } from '@/utils/getGenericMessages';

import { useSquadContext } from '../SquadContext';

const { getInitialValues, validationSchema, fields } = createFormFields({
  userId: yup.string().label('User').required(),
  role: yup.mixed<TeamRole>().label('Role').required().default(TeamRole.Member),
  positionId: yup.string().label('Position').required(),
});

type FormValues = ReturnType<typeof getInitialValues>;

type FormConfig = FormikConfig<FormValues>;

type CreateSquadMemberModalProps = SimpleModalProps;

const useCreateSquadMemberModal = (modalProps: CreateSquadMemberModalProps) => {
  const { squadId } = useSquadContext();
  const { createSquadMember } = useSquadMemberMutations();

  const handleSubmit: FormConfig['onSubmit'] = (values, helpers) => {
    runMutation({
      mutation: createSquadMember({ ...values, squadId }),
      success: () => modalProps.onCancel(),
      finally: () => helpers.setSubmitting(false),
      messages: getGenericMessages('squad member', 'create'),
    });
  };

  return {
    modal: {
      ...modalProps,
      title: 'Add new squad member',
      okText: 'Add member',
    },
    form: {
      initialValues: getInitialValues(),
      validationSchema,
      onSubmit: handleSubmit,
    },
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
        autoFocus
        idsToOmit={squadMembersIds.membersUserIds}
      />
    </Form.Item>
  );
};

export const CreateSquadMemberModal = createSimpleModal<CreateSquadMemberModalProps>(props => {
  const { form, modal } = useCreateSquadMemberModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <MemberPicker />
        <Form.Item {...fields.role}>
          <FormikTeamRoleSelect name={fields.role.name} />
        </Form.Item>
        <Form.Item {...fields.positionId}>
          <FormikPositionSelect name={fields.positionId.name} scopes={[PositionScope.Squad]} />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
