import React, { Fragment, FC } from 'react';
import { RouteComponentProps, useParams, Switch, Route, useRouteMatch } from 'react-router-dom';

const Election: FC<RouteComponentProps> = ({ match }) => {
  const { id } = useParams<Record<string, string | undefined>>();
  
  return (
    <Fragment>
      <h1>Election</h1>
      <code>ID {id}</code>
      <br />
      <Switch>
        {/* Positions*/}
        <Route path={`${match.url}/positions/`}>position</Route>
        <Route path={`${match.url}/platforms/`}>platforms</Route>
      </Switch>
    </Fragment>
  );
}

export default Election;