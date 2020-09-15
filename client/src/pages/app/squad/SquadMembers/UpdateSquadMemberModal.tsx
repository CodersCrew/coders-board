import React from 'react';
import { FormikConfig } from 'formik';
import { Form } from 'formik-antd';
import * as yup from 'yup';

import { FormikModal } from '@/components/molecules';
import { FormikTeamRoleSelect } from '@/components/selects';
import { useSquadMemberMutations } from '@/graphql/squads';
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

export type UpdateSquadMemberModalData = WithId<FormValues>;

type UpdateSquadMemberModalProps = DataModalProps<UpdateSquadMemberModalData>;

const useUpdateSquadMemberModal = (props: UpdateSquadMemberModalProps) => {
  const { data, ...modalProps } = props;

  const { squadId } = useSquadContext();
  const { updateSquadMember } = useSquadMemberMutations();

  const handleSubmit: FormConfig['onSubmit'] = (values, helpers) => {
    runMutation({
      mutation: updateSquadMember({ role: values.role, id: data.id, squadId }),
      success: () => props.onCancel(),
      finally: () => helpers.setSubmitting(false),
      messages: getGenericMessages('squad member', 'update'),
    });
  };

  return {
    modal: {
      ...modalProps,
      title: 'Update squad member',
      okText: 'Update member',
    },
    form: {
      initialValues: getInitialValues(data),
      validationSchema,
      onSubmit: handleSubmit,
    },
  };
};

export const UpdateSquadMemberModal = createDataModal<UpdateSquadMemberModalProps>(props => {
  const { form, modal } = useUpdateSquadMemberModal(props);

  return (
    <FormikModal form={form} modal={modal}>
      <Form layout="vertical" colon>
        <Form.Item {...fields.role}>
          <FormikTeamRoleSelect name={fields.role.name} />
        </Form.Item>
      </Form>
    </FormikModal>
  );
});
