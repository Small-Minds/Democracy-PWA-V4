import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'rsuite';
import {
  getPublicElectionList,
  Election,
} from '../utils/api/ElectionManagement';
import { Credentials } from '../utils/Authentication';

export default function PublicElectionList() {
  const [electionList, setElectionList] = useState<Array<Election>>([]);

  useEffect(() => {
    // Return if the list has already been populated.
    if (electionList.length > 0) return;
    // If logged in, attempt to get the list of elections.
    getPublicElectionList().then((res) => {
      setElectionList(res.data);
    });
  }, []);

  return (
    <div>
      <List>
        {electionList.map((election, index) => (
          <List.Item key={index} index={index}>
            <Link to={`/election/${election.id}`}>{election.id}</Link>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
