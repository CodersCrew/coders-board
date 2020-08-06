import React from 'react';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { DatePicker, DatePickerProps, Form, Input } from 'formik-antd';
import moment from 'moment';
import * as yup from 'yup';

import { Box } from '@/components/atoms';
import { Modal, ModalProps } from '@/components/molecules';
import { FormikPositionSelect } from '@/components/selects/PositionSelect';
import { FormikUserSelect } from '@/components/selects/UserSelect';
import { CFC } from '@/typings/components';
import { YupSchema } from '@/typings/forms';
// import { CreateMemberPositionInput, GraphQLOperations } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

// import { useCreateTeamPositionMutation, useUpdateTeamPositionMutation } from './TeamPositionModal.apollo';

type FormValues = any;

type FormConfig = FormikConfig<FormValues>;

type TeamPositionModalProps = ModalProps & {
  onCancel: () => void;
  data: (FormValues & { id: string }) | null;
  currentMembersIds: string[];
  userIdToMemberIdMap: Record<string, string>;
};

const TeamPositionModalComponent: CFC<TeamPositionModalProps> = ({
  data,
  currentMembersIds,
  userIdToMemberIdMap,
  ...props
}) => {
  const { isSubmitting, submitForm, values } = useFormikContext<FormValues>();
  const title = data?.id ? 'Edit position' : 'Add position';
  const okText = data?.id ? 'Update position' : 'Add position';

  const buttonProps = { loading: isSubmitting };

  const pickerProps: Partial<DatePickerProps> = {
    picker: 'month',
    style: { width: '100%' },
  };

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
        <Form.Item name="teamMemberId" label="Team member" required>
          <FormikUserSelect
            name="teamMemberId"
            placeholder="Select team member..."
            ids={currentMembersIds}
            idMapper={userIdToMemberIdMap}
            showSearch
          />
        </Form.Item>
        <Form.Item name="positionId" label="Position" required>
          <FormikPositionSelect name="positionId" placeholder="Select position..." showSearch />
        </Form.Item>
        <Box display="flex">
          <Box width={1 / 2}>
            <Form.Item name="from" label="Start date" required>
              <DatePicker
                name="from"
                placeholder="Choose start date..."
                {...pickerProps}
                disabledDate={current => (values.to ? current.isAfter(values.to) : false)}
              />
            </Form.Item>
          </Box>
          <Box width={40} />
          <Box width={1 / 2}>
            <Form.Item name="to" label="End date">
              <DatePicker
                name="to"
                placeholder="Choose end date..."
                {...pickerProps}
                disabledDate={current => {
                  return values.from ? current.isBefore(moment(values.from).add(1, 'month')) : false;
                }}
              />
            </Form.Item>
          </Box>
        </Box>
        <Form.Item name="notes" label="Notes about position">
          <Input.TextArea name="notes" placeholder="Enter notes..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const TeamPositionModal: CFC<TeamPositionModalProps> = props => {
  // const refetch = {
  // refetchQueries: [GraphQLOperations.Query.teamMembers, GraphQLOperations.Query.teamPositions],
  // };
  // const [createPosition] = useCreateTeamPositionMutation(refetch);
  // const [updatePosition] = useUpdateTeamPositionMutation(refetch);

  const validationSchema: YupSchema<FormValues> = yup.object({
    from: yup.date().required().default(null),
    positionId: yup.string().required(),
    teamMemberId: yup.string().required(),
    notes: yup.string().optional().nullable(),
    to: yup.string().optional().nullable(),
  });

  const initialValues = props.data ?? getInitialValuesFromSchema(validationSchema);
  const messages = getBasicMessages('team position', props.data ? 'update' : 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      // if (props.data?.id) {
      //   await updatePosition({ variables: { data: { ...values, id: props.data.id } } });
      // } else {
      //   await createPosition({ variables: { data: values } });
      // }

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
      <TeamPositionModalComponent {...props} />
    </Formik>
  );
};
