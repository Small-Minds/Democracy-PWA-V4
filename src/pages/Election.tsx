import React, { Fragment } from 'react';
import { useParams, Switch, Route, useRouteMatch } from 'react-router-dom';

export default function Election() {
  const { id } = useParams<Record<string, string | undefined>>();
  const { url } = useRouteMatch();
  console.log(url);
  return (
    <Fragment>
      <h1>The election Id is {id}</h1>
      <Switch>
        {/* Positions*/}
        <Route path={`${url}/positions/:positionid`}>positionid</Route>
        <Route path={`${url}/positions`}>position</Route>
        <Route path={`${url}/platforms/:platformsid`}>platformsid</Route>
        <Route path={`${url}/platforms`}>platforms</Route>
        <Route path={`${url}/vote`}>vote</Route>
      </Switch>
    </Fragment>
  );
}
