import {
  Button,
  Col,
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
import LoginForm from './components/LoginForm';

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
          <FlexboxGrid.Item
            componentClass={Col}
            colspan={24}
            lg={10}
            md={15}
            sm={20}
            xs={23}
          >
            <Container>
              <Content>
                <Panel header={<h2>Democracy</h2>}></Panel>
                <LoggedIn />
                <SignupForm />
                <LoginForm />
              </Content>
            </Container>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Credentials.Provider>
    </div>
  );
}

export default App;
