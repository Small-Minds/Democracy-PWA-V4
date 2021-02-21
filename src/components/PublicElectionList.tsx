import React, { useEffect, useContext, useState, FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'rsuite';
import {
  getPublicElectionList,
  Election,
} from '../utils/api/ElectionManagement';
import { User } from '../utils/api/User';
import { Credentials } from '../utils/Authentication';
import ElectionListElement from './ElectionListElement';

interface PELProps {
  filterDomain?: boolean;
}

const PublicElectionList: FC<PELProps> = ({ filterDomain = false }) => {
  const ctx = useContext(Credentials);
  const user = useContext(User);
  const [electionList, setElectionList] = useState<Array<Election>>([]);

  const userDomain = useMemo(() => {
    if (!user || !user.user || !user.user.email) return '';
    const domain = user.user.email.split('@');
    if (domain.length === 2) return domain[1];
    return '';
  }, [user]);

  useEffect(() => {
    // Return if the list has already been populated.
    if (electionList.length > 0) return;
    // If logged in, attempt to get the list of elections.
    getPublicElectionList().then((res) => {
      const elections: Election[] = res.data;

      setElectionList(
        filterDomain
          ? elections.filter((e) => e.election_email_domain === userDomain)
          : elections
      );
    });
  }, [ctx]);

  if (!user || !user.user || !user.user.email) return null;
  return (
    <div>
      <List>
        {electionList.map((election, index) => (
          <ElectionListElement key={index} index={index} election={election} />
        ))}
      </List>
    </div>
  );
};

export default PublicElectionList;
