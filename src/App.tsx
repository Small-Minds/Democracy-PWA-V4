import React, { Fragment, useEffect, useState } from 'react';
import {
  Credentials,
  CredentialData,
  blankCredentialData,
} from './utils/Authentication';
import { getAccessToken, getRefreshToken, isAuthenticated } from './utils/API';
import './App.css';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Loading from './pages/Loading';
import Base from './pages/Home';
import './App.css';
import Info from './pages/Landing';
import Navigation from './components/Navigation';
import EmptyPage from './pages/EmptyPage';
import Election from './pages/Election';
import { Col, Container, Content, FlexboxGrid, Panel } from 'rsuite';

/**
 * Parent for the entire application.
 * Contains the router and credential provider.
 */
function App() {
  // When the app first starts, it is unauthenticated.
  const [credentials, setCredentials] = useState<CredentialData>(
    blankCredentialData
  );
  // If processing credentials, be working.
  const [working, setWorking] = useState<boolean>(true);
  //Set Up Localization Hook
  const [t] = useTranslation();

  // Load JWTs and validate.
  useEffect(() => {
    if (credentials.authenticated === undefined) {
      console.log('Checking for pre-existing credentials...');
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
        } else {
          setWorking(false);
        }
      });
    }
  }, [credentials]);

  // Set Page Title
  useEffect(() => {
    document.title = t('mainPage.appName');
  }, [t]);

  return (
    <div>
      <Credentials.Provider value={{ credentials, setCredentials }}>
        {working === false ? (
          <BrowserRouter>
            <Navigation />
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item
                componentClass={Col}
                sm={22}
                xs={24}
                colspan={24}
                style={{ maxWidth: '800px' }}
              >
                <Container>
                  <br />
                  <Content>
                    {credentials && credentials.authenticated ? (
                      <Fragment>
                        {/* Protected Pages */}
                        <Switch>
                          <Route path="/election">
                            <Election />
                          </Route>
                          <Route path="/vote">
                            <EmptyPage />
                          </Route>
                          <Route path="/setup">
                            <EmptyPage />
                          </Route>
                          <Route path="/">
                            <Base />
                          </Route>
                        </Switch>
                      </Fragment>
                    ) : (
                      <Fragment>
                        {/* Public Pages */}
                        <Switch>
                          <Route path="/">
                            <Info />
                          </Route>
                        </Switch>
                      </Fragment>
                    )}
                  </Content>
                  <br />
                </Container>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </BrowserRouter>
        ) : (
          <Loading />
        )}
      </Credentials.Provider>
      <br />
    </div>
  );
}

export default App;
