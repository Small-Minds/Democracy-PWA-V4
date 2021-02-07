import { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Panel } from 'rsuite';
import { clearTokens } from '../utils/API';
import { Credentials } from '../utils/Authentication';

/**
 * Here is an example of a useContext hook to consume a provider.
 */
function LogoutButton() {
  // When the app first starts, it is unauthenticated.
  const ctx = useContext(Credentials);
  //Set up localization hook
  const [t] = useTranslation();

  return (
    <Fragment>
      <Button
        appearance="primary"
        size="lg"
        disabled={!ctx?.credentials.authenticated}
        onClick={() => {
          clearTokens();
          ctx?.setCredentials({
            authenticated: false,
            token: '',
            tokenExpiry: undefined,
            refreshToken: '',
            refreshTokenExpiry: undefined,
          });
        }}
      >
        {t('mainPage.logoutButton')}
      </Button>
    </Fragment>
  );
}

export default LogoutButton;
