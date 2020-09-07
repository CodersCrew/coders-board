import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';

import { Button } from '@/components/atoms';
import { Page } from '@/components/molecules';
import { useSuccesses } from '@/graphql/successes';
import { useAuthorizedUser } from '@/graphql/users';
import { useDataModal } from '@/services/modals';

import { Success } from './Success';
import { SuccessModal, SuccessModalData } from './SuccessModal';

const Successes = () => {
  const { data } = useSuccesses();
  const { isAdmin } = useAuthorizedUser();
  const successModal = useDataModal<SuccessModalData>();

  const extra = isAdmin
    ? [
        <Button key="create" type="primary" icon={<PlusOutlined />} onClick={() => successModal.open(null)}>
          Add new success
        </Button>,
      ]
    : undefined;

  return (
    <Page>
      <Page.Header title="Successes" subTitle="Timeline of our successes - big and small ones" extra={extra} />
      <Page.Content>
        <Timeline>
          {data.map(success => (
            <Success key={success.id} success={success} openEditModal={successModal.open} />
          ))}
        </Timeline>
      </Page.Content>
      <SuccessModal {...successModal} />
    </Page>
  );
};

export default Successes;
