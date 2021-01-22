import { Button, Container, Content, Footer, Header } from 'rsuite';
import React, { useContext, useState } from 'react';
import { Credentials, CredentialInterface } from '../utils/Authentication';
import { useTranslation } from 'react-i18next';

/**
 * Here is an example of a useContext hook to consume a provider.
 */
function LoggedIn() {
  // When the app first starts, it is unauthenticated.
  const ctx = useContext(Credentials);
  const [t] = useTranslation();
  return (
    <div>
      {ctx ? (
        <div>
          <h4>{t("loggedInInfo.sectionTitle")}</h4>
          <p>{`${t("loggedInInfo.loggedInFieldLabel")}: ${ctx.credentials.authenticated ? t("loggedInInfo.loggedIn") : t("loggedInInfo.notLoggedIn")}`}</p>
          <p>{`${t("loggedInInfo.accessTokenFieldLabel")}: ${ctx.credentials.token || t("loggedInInfo.noToken")}`}</p>
          <p>{`${t("loggedInInfo.refreshTokenFieldLabel")}: ${ctx.credentials.refreshToken || t("loggedInInfo.noToken")}`}</p>
        </div>
      ) : null}
    </div>
  );
}

export default LoggedIn;
