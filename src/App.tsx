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
import React, { useEffect, useState } from 'react';
import { Credentials, CredentialData } from './utils/Authentication';
import LoggedIn from './components/LoggedIn';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import { getAccessToken, getRefreshToken, isAuthenticated } from './utils/API';
import NewElectionButton from './components/NewElectionButton';

function App() {
  // When the app first starts, it is unauthenticated.
  const [credentials, setCredentials] = useState<CredentialData>({
    authenticated: undefined,
    token: '',
    tokenExpiry: undefined,
    refreshToken: '',
    refreshTokenExpiry: undefined,
  });
  const [working, setWorking] = useState<boolean>(false);

  useEffect(() => {
    console.log('Checking for pre-existing credentials...');
    if (!working && credentials.authenticated === undefined) {
      setWorking(true);
      isAuthenticated().then((b) => {
        if (b) {
          const access = getAccessToken();
          const refresh = getRefreshToken();
          const newCreds: CredentialData = {
            authenticated: true,
            token: access.token,
            tokenExpiry: access.expiry,
            refreshToken: refresh.refreshToken,
            refreshTokenExpiry: refresh.refreshTokenExpiry,
          };
          setCredentials(newCreds);
          setWorking(false);
        }
      });
    }
  }, [credentials, working]);

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
                <Panel header={<h2>Election Tools</h2>} bordered>
                  <NewElectionButton />
                </Panel>
              </Content>
            </Container>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Credentials.Provider>
      <br />
    </div>
  );
}

export default App;
