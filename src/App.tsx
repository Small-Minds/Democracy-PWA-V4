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
import Base from './pages/Landing';
import './App.css';
import Info from './pages/Info';
import Navigation from './components/Navigation';
import EmptyPage from './pages/EmptyPage';

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
    console.log('Checking for pre-existing credentials...');
    if (credentials.authenticated === undefined) {
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
            {credentials && credentials.authenticated ? (
              <Fragment>
                {/* Protected Pages */}
                <Switch>
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
