import React, { useEffect, useContext, useState, FC, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, FlexboxGrid, Icon, List, Loader } from 'rsuite';
import PlaceholderParagraph from 'rsuite/lib/Placeholder/PlaceholderParagraph';
import {
  CandidateWithUserDetails,
  ElectionDetails,
  getPositionDetails,
  Position,
} from '../utils/api/ElectionManagement';
import { Candidate } from '../utils/api/PositionApplication';
import { User } from '../utils/api/User';
import { Credentials } from '../utils/Authentication';

interface PLProps {
  election: ElectionDetails;
}

interface PositionDisplayProps {
  position: Position;
}

const PlatformDisplay: FC<PositionDisplayProps> = ({ position }) => {
  const [candidates, setCandidates] = useState<CandidateWithUserDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPositionDetails(position.id).then((details) => {
      setCandidates(details.candidates);
      setLoading(false);
    });
  }, [position]);

  return (
    <Fragment>
      <br />
      <h3>{position.title}</h3>
      <p>
        <i>{position.description}</i>
      </p>
      <br />
      <h4>{candidates.length !== 0 ? 'Candidates' : 'No Candidates'}</h4>
      <List style={{ marginTop: 10, marginBottom: 20 }}>
        {loading && (
          <List.Item>
            <PlaceholderParagraph rows={2}>
              <Loader inverse center backdrop content="loading..." vertical />
            </PlaceholderParagraph>
          </List.Item>
        )}
        {candidates.map((candidate, index) => (
          <List.Item key={index}>
            <h5>{candidate.user.name}</h5>
            <p>
              <i>{candidate.platform}</i>
            </p>
          </List.Item>
        ))}
      </List>
    </Fragment>
  );
};

const PlatformList: FC<PLProps> = ({ election }) => {
  const ctx = useContext(Credentials);
  const user = useContext(User);
  const history = useHistory();

  // Ensure all prerequisites are met.
  if (!user || !ctx || !election) return null;

  const showDelete = user.user.id === election.manager;

  return (
    <div>
      {election.positions.length !== 0 ? (
        <Fragment>
          {election.positions.map((position, index) => (
            <PlatformDisplay key={index} position={position} />
          ))}
        </Fragment>
      ) : (
        <FlexboxGrid>
          <p>No positions posted yet. Check back soon for updates.</p>
        </FlexboxGrid>
      )}
    </div>
  );
};

export default PlatformList;
