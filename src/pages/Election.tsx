import React, { Fragment } from 'react';
import { useParams, Switch, Route, useRouteMatch } from 'react-router-dom';

export default function Election() {
  const { id } = useParams<Record<string, string | undefined>>();
  const { url } = useRouteMatch();
  
  return (
    <Fragment>
      <h1>Election</h1>
      <code>ID {id}</code>
      <br />
      <Switch>
        {/* Positions*/}
        <Route path={`${url}/${id}/positions/:positionid`}>positionid</Route>
        <Route path={`${url}/${id}/positions`}>position</Route>
        <Route path={`${url}/${id}/platforms/:platformsid`}>platformsid</Route>
        <Route path={`${url}/${id}/platforms`}>platforms</Route>
        <Route path={`${url}/${id}/vote`}>vote</Route>
      </Switch>
    </Fragment>
  );
}
