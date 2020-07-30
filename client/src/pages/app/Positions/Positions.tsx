import React, { ComponentProps } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { Box, Button } from '@/components/atoms';
import { PageHeader } from '@/components/molecules';
import { useModalState } from '@/hooks/useModalState';
import { down } from '@/utils/styling';

import { Position } from './Position';
import { PositionModal } from './PositionModal';
import { usePositionsQuery } from './Positions.apollo';

type PositionModalState = ComponentProps<typeof PositionModal>['data'];

const CardsGrid = styled.div({
  display: 'grid',
  gridGap: 24,
  gridTemplateColumns: 'repeat(4, 1fr)',

  [down('xl')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },

  [down('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [down('sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
});

const Positions = () => {
  const { data } = usePositionsQuery();
  const positionModal = useModalState<PositionModalState>();

  return (
    <>
      <PageHeader
        title="Positions"
        subTitle="Find out all positions available across CodersCrew"
        extra={[
          <Button key="create" type="primary" icon={<PlusOutlined />} onClick={() => positionModal.open()}>
            Create position
          </Button>,
        ]}
      />
      <Box m={24}>
        <CardsGrid>
          {data?.positions.map(position => (
            <Position key={position.id} openEditModal={positionModal.open} {...position} />
          ))}
        </CardsGrid>
      </Box>
      {positionModal.isMounted && <PositionModal {...positionModal.props} />}
    </>
  );
};

export default Positions;
