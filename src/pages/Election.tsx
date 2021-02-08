import React, { Fragment, FC, useState, useEffect } from 'react';
import {
  RouteComponentProps,
  useParams,
  Switch,
  Route,
  useHistory,
  Link,
} from 'react-router-dom';
import { Button, FlexboxGrid } from 'rsuite';
import {
  getElection,
  Election as ElectionType,
} from '../utils/api/ElectionManagement';
import Loading from './Loading';

interface ElectionSubpage {
  id: string | undefined;
}

const Positions: FC<ElectionSubpage> = ({ id }) => {
  if (!id) return null;
  return (
    <Fragment>
      <h3>Positions for {id}</h3>
    </Fragment>
  );
};

const Platforms: FC<ElectionSubpage> = ({ id }) => {
  if (!id) return null;
  return (
    <Fragment>
      <h3>Platforms for {id}</h3>
    </Fragment>
  );
};

const Election: FC<RouteComponentProps> = ({ match }) => {
  const { id } = useParams<Record<string, string | undefined>>();
  const history = useHistory();

  const [isLoading, setLoading] = useState(true);
  const [election, setElection] = useState<ElectionType>();

  useEffect(() => {
    if (!id) return;
    getElection(id).then((res) => {
      console.log(res);
      setElection(res);
      setLoading(false);
    });
  }, [id]);

  // Return to the previous page if no ID is provided.
  if (!id || id === undefined) {
    history.goBack();
    return null;
  }

  return (
    <Fragment>
      {election ? (
        <Fragment>
          <h1>{election.title}</h1>
          <p>
            <b>@{election.election_email_domain}</b>
            &nbsp;&middot;&nbsp;
            <span>{election.description}</span>
          </p>
          <br />
          <Fragment>
            <Button
              appearance="primary"
              onClick={() => history.push(`${match.url}/vote`)}
            >
              Vote
            </Button>
            <Button appearance="subtle" onClick={() => history.push(match.url)}>
              Election Info
            </Button>
            <Button
              appearance="subtle"
              onClick={() => history.push(`${match.url}/positions`)}
            >
              Open Positions
            </Button>
            <Button
              appearance="subtle"
              onClick={() => history.push(`${match.url}/platforms`)}
            >
              Candidate Platforms
            </Button>
          </Fragment>
          <br />
          <br />
          <Switch>
            {/* Positions*/}
            <Route path={`${match.url}/positions`}>
              <Positions id={id} />
            </Route>
            <Route path={`${match.url}/platforms`}>
              <Platforms id={id} />
            </Route>
          </Switch>
        </Fragment>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default Election;
