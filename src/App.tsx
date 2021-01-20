import {
  Button,
  Container,
  Content,
  FlexboxGrid,
  Footer,
  Header,
  Panel,
} from 'rsuite';
import React, { useState } from 'react';
import { Credentials, CredentialData } from './utils/Authentication';
import LoggedIn from './components/LoggedIn';
import SignupForm from './components/SignupForm';

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
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={15}>
            <Container>
              <Content>
                <Panel header={<h2>Democracy Prototype 3</h2>}></Panel>
                <LoggedIn />
                <SignupForm />
              </Content>
            </Container>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Credentials.Provider>
    </div>
  );
}

export default App;
