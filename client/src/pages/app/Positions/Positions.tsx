import React from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Avatar, Tooltip } from 'antd';

import { AddPositionModal } from './AddPositionModal';
import { usePositionsQuery } from './Positions.apollo';
import { Box, Button } from '@/components/atoms';
import { Card, CardMeta, PageHeader } from '@/components/molecules';
import { useIsAdmin } from '@/hooks/useAuth';
import { useModalState } from '@/hooks/useModalState';

const CardsGrid = styled.div({
  display: 'grid',
  gridGap: 24,
  gridTemplateColumns: 'repeat(4, 1fr)',
});

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',

  '.ant-card-body': {
    flex: 1,
  },
});

const Positions = () => {
  const { isAdmin } = useIsAdmin();
  const { data } = usePositionsQuery();
  const addPositionModal = useModalState();

  return (
    <>
      <PageHeader
        title="Positions"
        subTitle="Find out all positions available across CodersCrew"
        extra={[
          <Button key="create" type="primary" icon={<PlusOutlined />} onClick={addPositionModal.open}>
            Create position
          </Button>,
        ]}
      />
      <Box m={24}>
        <CardsGrid>
          {data?.positions.map(position => {
            const image = position.image || position.team?.image || undefined;
            const tooltipTitle = position.team ? `Related to "${position.team.name}" team` : 'Unrelated';
            const actions = isAdmin ? [<EditOutlined key="edit" />, <DeleteOutlined key="delete" />] : undefined;

            const avatar = (
              <Tooltip title={tooltipTitle}>
                <Avatar src={image} icon={<UserOutlined />} />
              </Tooltip>
            );

            return (
              <StyledCard key={position.id} p={16} actions={actions}>
                <CardMeta avatar={avatar} title={position.name} description={position.description} />
              </StyledCard>
            );
          })}
        </CardsGrid>
      </Box>
      {addPositionModal.isMounted && (
        <AddPositionModal visible={addPositionModal.isVisible} onCancel={addPositionModal.close} />
      )}
    </>
  );
};

export default Positions;
