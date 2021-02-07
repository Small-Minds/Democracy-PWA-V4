import React, { useEffect, useContext, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'rsuite';
import { getElectionList, Election } from '../utils/api/ElectionManagement';
import { Credentials } from '../utils/Authentication';

interface ElectionListElementProps {
  index: any;
  election: Election;
}

const ElectionListElement: FC<ElectionListElementProps> = ({
  index,
  election,
}) => {
  return (
    <List.Item key={index} index={index}>
      <h3>{election.title}</h3>
      <p>{election.description}</p>
      <Link to={`/election/${election.id}`}>View Election</Link>
    </List.Item>
  );
};

export default ElectionListElement;
