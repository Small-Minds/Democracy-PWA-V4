import React, { useEffect, useContext, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, FlexboxGrid, List } from 'rsuite';
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
      <FlexboxGrid align="middle" justify="space-around">
        <FlexboxGrid.Item componentClass={Col} colspan={24} sm={16}>
          <h3>{election.title}</h3>
          <p>
            <b>@{election.election_email_domain}</b>
            &nbsp;&middot;&nbsp;
            <span>{election.description}</span>
          </p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          componentClass={Col}
          colspan={24}
          sm={8}
          style={{ padding: 5 }}
        >
          <Button block>
            <Link to={`/election/${election.id}`}>View Election</Link>
          </Button>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </List.Item>
  );
};

export default ElectionListElement;
