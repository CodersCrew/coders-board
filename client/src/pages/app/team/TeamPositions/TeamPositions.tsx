// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { List } from 'antd';
// import { groupBy } from 'lodash';

// import { Box, Spin, Title } from '@/components/atoms';
// import { Card } from '@/components/molecules';
// import { useModalState } from '@/hooks/useModalState';
// import { useQueryParam } from '@/hooks/useQueryParam';

// import { EmptyPositions } from './EmptyPositions';
// import { FiltersCard } from './FiltersCard';
// import { TeamPosition } from './TeamPosition';
// import { TeamPositionModal } from './TeamPositionModal';
// import { useTeamPositionsQuery } from './TeamPositions.apollo';
// import { PositionItem, TeamPositionModalState } from './TeamPositions.types';
// import { membersToPositionItems } from './TeamPositions.utils';

// const searchThroughtObjectArray = <T extends Record<string, string | undefined | null>>(
//   arr: T[],
//   search: string,
//   keys: Array<keyof T>,
// ) => {
//   if (!search || !arr.length) return arr;

//   const searchText = search.toLocaleLowerCase();
//   const objectKeys = Object.keys(arr[0]).filter(key => keys.includes(key));

//   return arr.filter(obj => objectKeys.some(key => obj[key]?.toLowerCase().includes(searchText))) as T[];
// };

const TeamPositions = () => {
  // const { id: teamId } = useParams();
  // const { data, loading } = useTeamPositionsQuery({ variables: { teamId } });
  // const teamPositionModal = useModalState<TeamPositionModalState>();
  // const [search, setSearch] = useQueryParam('search', false);

  // const members = data?.teamMembers || [];
  // const positionItems = membersToPositionItems(members);
  // const filteredPositionItems = searchThroughtObjectArray(positionItems, search, ['userName', 'positionName']);

  // const { current = [], past = [] } = groupBy(filteredPositionItems, position => (position.to ? 'past' : 'current'));

  // const currentMembersIds = members.map(({ user }) => user.id);
  // const userIdToMemberIdMap = members.reduce((obj, { id, user }) => ({ ...obj, [user.id]: id }), {});

  // const renderList = (title: string, dataSource: PositionItem[]) => (
  //   <Card px={24}>
  //     <List
  //       header={<Title level={4}>{title}</Title>}
  //       loading={loading}
  //       dataSource={dataSource}
  //       rowKey="id"
  //       renderItem={position => (
  //         <TeamPosition {...position} openModal={teamPositionModal.open} closeModal={teamPositionModal.close} />
  //       )}
  //     />
  //   </Card>
  // );

  // return (
  //   <Spin spinning={loading} tip="Loading member actions">
  //     <FiltersCard search={search} onSearch={setSearch} openModal={teamPositionModal.open} />
  //     {!loading && (
  //       <Box maxWidth="100%" overflow="auto" p={24} pt={0}>
  //         {filteredPositionItems.length === 0 && (
  //           <EmptyPositions membersCount={members.length} openModal={teamPositionModal.open} />
  //         )}
  //         {current.length > 0 && renderList('Current positions', current)}
  //         {current.length > 0 && past.length > 0 && <Box height={24} />}
  //         {past.length > 0 && renderList('Past positions', past)}
  //       </Box>
  //     )}
  //     {teamPositionModal.isMounted && (
  //       <TeamPositionModal
  //         visible={teamPositionModal.isVisible}
  //         onCancel={teamPositionModal.close}
  //         data={teamPositionModal.data}
  //         currentMembersIds={currentMembersIds}
  //         userIdToMemberIdMap={userIdToMemberIdMap}
  //       />
  //     )}
  //   </Spin>
  // );
  return null;
};

export default TeamPositions;
