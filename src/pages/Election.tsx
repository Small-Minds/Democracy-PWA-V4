import React, { Fragment, FC } from 'react';
import {
  RouteComponentProps,
  useParams,
  Switch,
  Route,
  useHistory,
  Link,
} from 'react-router-dom';
import { Button } from 'rsuite';

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

  // Return to the previous page if no ID is provided.
  if (!id || id === undefined) {
    history.goBack();
    return null;
  }

  console.log(match.url);
  return (
    <Fragment>
      <h1>Election</h1>
      <code>ID {id}</code>
      <br />
      <Button appearance="primary" onClick={() => history.push(`${match.url}/vote`)}>
        Vote 
      </Button>
      <Button appearance="subtle" onClick={() => history.push(match.url)}>
        Election Info 
      </Button>
      <Button appearance="subtle" onClick={() => history.push(`${match.url}/positions`)}>
        Open Positions
      </Button>
      <Button appearance="subtle" onClick={() => history.push(`${match.url}/platforms`)}>
        Candidate Platforms
      </Button>
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
  );
};

export default Election;
