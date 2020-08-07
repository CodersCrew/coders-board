import React from 'react';
import { Formik, FormikConfig, useFormikContext } from 'formik';
import { DatePicker, DatePickerProps, Form, Input } from 'formik-antd';
import { pick } from 'lodash';
import moment from 'moment';
import * as yup from 'yup';

import { Box } from '@/components/atoms';
import { Modal, ModalProps } from '@/components/molecules';
import { FormikChapterSelect, FormikPositionSelect } from '@/components/selects';
import { FormikUserSelect } from '@/components/selects/UserSelect';
import { useSquadMembersIds, useSquadPositions } from '@/graphql/squads';
import { CFC } from '@/typings/components';
import { YupSchema } from '@/typings/forms';
import { CreateSquadPositionInput } from '@/typings/graphql';
import { getInitialValuesFromSchema } from '@/utils/forms';
import { getBasicMessages } from '@/utils/getBasicMessages';

type FormValues = Omit<CreateSquadPositionInput, 'squadId'>;

type FormConfig = FormikConfig<FormValues>;

export type SquadPositionModalProps = ModalProps & {
  onCancel: () => void;
  data: (FormValues & { id: string }) | null;
  squadId: string;
};

const SquadPositionModalComponent: CFC<SquadPositionModalProps> = ({ data, squadId, ...props }) => {
  const formik = useFormikContext<FormValues>();
  const squadMembersIds = useSquadMembersIds({ squadId });

  const title = data?.id ? 'Edit position' : 'Add position';
  const okText = data?.id ? 'Update position' : 'Add position';

  const isUpdateModal = Boolean(data);
  const buttonProps = { loading: formik.isSubmitting };

  const pickerProps: Partial<DatePickerProps> = {
    picker: 'month',
    style: { width: '100%' },
  };

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
        <Form.Item name="memberId" label="Squad member" required>
          <FormikUserSelect
            name="memberId"
            placeholder="Select team member..."
            ids={squadMembersIds.membersUserIds}
            idMapper={squadMembersIds.userIdToMemberIdMap}
            disabled={isUpdateModal}
            showSearch
          />
        </Form.Item>
        <Form.Item name="positionId" label="Position" required>
          <FormikPositionSelect name="positionId" placeholder="Select position..." disabled={isUpdateModal} />
        </Form.Item>
        <Box display="flex">
          <Box width={1 / 2}>
            <Form.Item name="from" label="Start date" required>
              <DatePicker
                name="from"
                allowClear={false}
                placeholder="Choose start date..."
                {...pickerProps}
                disabledDate={current => {
                  if (current.isAfter(moment())) return true;
                  return formik.values.to ? current.isAfter(formik.values.to) : false;
                }}
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
                  if (current.isAfter(moment())) return true;
                  return formik.values.from ? current.isBefore(moment(formik.values.from).add(1, 'month')) : false;
                }}
              />
            </Form.Item>
          </Box>
        </Box>
        <Form.Item name="notes" label="Notes about position">
          <Input.TextArea name="notes" placeholder="Enter notes..." />
        </Form.Item>
        <Form.Item name="chapterId" label="Chapter">
          <FormikChapterSelect
            squadId={squadId}
            name="chapterId"
            placeholder="Select chapter for the role..."
            allowClear
            disabled={isUpdateModal}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const SquadPositionModal: CFC<SquadPositionModalProps> = props => {
  const squadPositions = useSquadPositions();

  const validationSchema: YupSchema<FormValues> = yup.object({
    from: yup.date().required().default(null),
    to: yup.string().optional().nullable(),
    notes: yup.string().optional().nullable(),
    memberId: yup.string().required(),
    positionId: yup.string().required(),
    chapterId: yup.string().optional(),
  });

  const initialValues = props.data ?? getInitialValuesFromSchema(validationSchema);
  const messages = getBasicMessages('squad position', props.data ? 'update' : 'create');

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    messages.loading();

    try {
      if (props.data?.id) {
        await squadPositions.update({
          variables: { data: { ...pick(values, ['from', 'to', 'notes']), id: props.data.id, squadId: props.squadId } },
        });
      } else {
        await squadPositions.create({ variables: { data: { ...values, squadId: props.squadId } } });
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
      <SquadPositionModalComponent {...props} />
    </Formik>
  );
};
