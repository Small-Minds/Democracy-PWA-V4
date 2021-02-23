import { max } from 'moment';
import React, { useState, useEffect, FC, Fragment, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProgressLine from 'rsuite/lib/Progress/ProgressLine';
import Loading from '../pages/Loading';
import {
  ElectionDetails,
  ElectionResult,
  getElectionResult,
  PositionResult,
} from '../utils/api/ElectionManagement';

const Position: FC<{ position: PositionResult }> = ({ position }) => {
  let maxVotes = 0;
  const sortedResults = useMemo(
    () =>
      position.candidates
        .map((value) => {
          value.voteCount = value.votes.length;
          if (value.voteCount > maxVotes) maxVotes = value.voteCount;
          return value;
        })
        .sort((a, b) => {
          return (b.voteCount || 0) - (a.voteCount || 0);
        }),
    [position]
  );

  if (!position) return null;
  return (
    <Fragment>
      <br />
      <h2>{position.title}</h2>
      <p>{position.description}</p>
      <br />
      {sortedResults.map((res, index) => {
        const percent: number = ((res.voteCount || 0) / maxVotes) * 100;
        const winner: boolean = (res.voteCount || 0) === maxVotes;
        return (
          <div key={index}>
            <p>
              {res.user.name} - {res.voteCount || 0}
            </p>
            <ProgressLine
              percent={percent}
              showInfo={false}
              status={winner ? 'success' : undefined}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

export default function ElectionResults() {
  let { id } = useParams<any>();
  const [isLoading, setLoading] = useState(true);
  const [electionResult, setElection] = useState<ElectionResult>();

  useEffect(() => {
    getElectionResult(id).then((res) => {
      setElection(res);
      setLoading(false);
    });
  }, [id]);

  //waiting for the response from getEletctionList
  if (isLoading) {
    return <Loading />;
  }

  if (!electionResult) {
    return <p>No results.</p>;
  }

  return (
    <div>
      {electionResult.positions.map(
        (position: PositionResult, index: number) => (
          <Position position={position} key={index} />
        )
      )}
      <br />
      <code>
        <pre>{JSON.stringify(electionResult, null, 2)}</pre>
      </code>
    </div>
  );
}
