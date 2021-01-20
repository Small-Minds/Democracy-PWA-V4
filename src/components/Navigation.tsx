import { Button, Container, Content, Footer, Header } from 'rsuite';
import React, { useContext, useState } from 'react';
import { Credentials, CredentialInterface } from '../utils/Authentication';

/**
 * Here is an example of a useContext hook to consume a provider.
 */
function LoggedIn() {
  // When the app first starts, it is unauthenticated.
  const ctx = useContext(Credentials);

  return (
    <div>
      {ctx ? (
        <div>
          <h4>Authentication Data</h4>
          <p>{`Logged in: ${ctx.credentials.authenticated ? 'Yes' : 'No'}`}</p>
          <p>{`Access Token: ${ctx.credentials.token || 'not set.'}`}</p>
          <p>{`Refresh Token: ${
            ctx.credentials.refreshToken || 'not set.'
          }`}</p>
        </div>
      ) : null}
    </div>
  );
}

export default LoggedIn;
