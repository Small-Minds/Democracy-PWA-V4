import { Button, Container, Content, Footer, Header } from 'rsuite';
import React, { useState } from 'react';
import {
  Credentials,
  CredentialInterface,
  CredentialData,
} from './utils/Authentication';
import LoggedIn from './components/LoggedIn';

function App() {
  // When the app first starts, it is unauthenticated.
  const [credentials, setCredentials] = useState<CredentialData>({
    authenticated: false,
    token: '',
    tokenExpiry: undefined,
    refreshToken: '',
    refreshTokenExpiry: undefined,
  });

  return (
    <div>
      <Credentials.Provider value={{ credentials, setCredentials }}>
        <Container>
          <Content>
            <h2>Democracy Prototype</h2>
            <LoggedIn />
          </Content>
        </Container>
      </Credentials.Provider>
    </div>
  );
}

export default App;
