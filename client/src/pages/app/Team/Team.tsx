import React from 'react';
import { useParams } from 'react-router-dom';

const Team = () => {
  const { id } = useParams();
  console.log(id);

  return <div>Team page</div>;
};

export default Team;
