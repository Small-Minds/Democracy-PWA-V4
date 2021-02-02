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
import {
  Credentials,
  CredentialData,
  blankCredentialData,
} from './utils/Authentication';
import LoggedIn from './components/LoggedIn';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import LanguagePicker from './components/LanguagePicker';
import Election from './pages/Election'
import { getAccessToken, getRefreshToken, isAuthenticated } from './utils/API';
import NewElectionButton from './components/NewElectionButton';
import './App.css';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
function App() {
  // When the app first starts, it is unauthenticated.
  const [credentials, setCredentials] = useState<CredentialData>(
    blankCredentialData
  );
  const [working, setWorking] = useState<boolean>(false);
  //Set Up Localization Hook
  const [t] = useTranslation();

  // Load JWTs and validate.
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

  // Set Page Title
  useEffect(() => {
    document.title = t('mainPage.appName');
  }, [t]);

  return (
    <div>
      <Credentials.Provider value={{ credentials, setCredentials }}>
        <Router>
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
                <Panel header={<h2>{t('mainPage.appName')}</h2>}></Panel>
                <LanguagePicker />
                <LoggedIn />
                <SignupForm />
                <LoginForm />
                <Panel
                  header={<h2>{t('mainPage.electionToolSectionTitle')}</h2>}
                  bordered
                >
                  <NewElectionButton />
                </Panel>
                <Switch>
                  {/*Election Page*/}
                  <Route path='/election/:id' component={ Election }/>
                </Switch>
              </Content>
            </Container>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        </Router>
      </Credentials.Provider>
      <br />
    </div>
  );
}

export default App;
