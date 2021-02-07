import React, { useEffect, useState } from 'react';
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
import Base from './pages/Base';
import './App.css';
import Info from './pages/Info';

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
            {credentials && credentials.authenticated ? (
              <Switch>
                {/* Protected Pages */}
                <Route path="/">
                  <Base />
                </Route>
              </Switch>
            ) : (
              <Switch>
                {/* Public Pages */}
                <Route path="/">
                  <Info />
                </Route>
              </Switch>
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
