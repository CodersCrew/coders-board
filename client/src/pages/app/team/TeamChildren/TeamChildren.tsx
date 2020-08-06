// import React from 'react';
// import { Link, useParams } from 'react-router-dom';
// import styled from '@emotion/styled';

// import { Paragraph, Title } from '@/components/atoms';
// import { Card, CardMeta } from '@/components/molecules';

// import { useTeamChildrenQuery } from './TeamChildren.apollo';

// const Grid = styled.div({
//   display: 'grid',
//   gridGap: 24,
//   gridTemplateColumns: 'repeat(4, 1fr)',
//   margin: 32,
// });

const TeamChildren = () => {
  // const { id } = useParams();
  // const { data } = useTeamChildrenQuery({ variables: { id } });

  // if (!data) return null;

  // return (
  //   <Grid>
  //     {data.team.children.map(item => (
  //       <Link key={item.id} to={`/app/teams/${item.id}/members`}>
  //         <Card hoverable cover={<img alt={item.name} src={item.image} />} p={16}>
  //           <CardMeta
  //             title={<Title level={4}>{item.name}</Title>}
  //             description={<Paragraph ellipsis={{ rows: 4 }}>{item.description}</Paragraph>}
  //           />
  //         </Card>
  //       </Link>
  //     ))}
  //   </Grid>
  // );
  return null;
};

export default TeamChildren;
