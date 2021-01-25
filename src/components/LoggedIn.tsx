import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Panel } from 'rsuite';
import { Credentials } from '../utils/Authentication';

/**
 * Here is an example of a useContext hook to consume a provider.
 */
function LoggedIn() {
  // When the app first starts, it is unauthenticated.
  const ctx = useContext(Credentials);
  //Set up localization hook
  const [t] = useTranslation();
  return (
    <div>
      {ctx ? (
        <div>
          <Panel header={<h4>{t('loggedInInfo.sectionTitle')}</h4>} bordered>
            <Container style={{ wordWrap: 'break-word' }}>
              <p>{`${t('loggedInInfo.loggedInFieldLabel')}: ${
                ctx.credentials.authenticated
                  ? t('loggedInInfo.loggedIn')
                  : t('loggedInInfo.notLoggedIn')
              }`}</p>
              <br />
              <h5>{t('loggedInInfo.accessTokenFieldLabel')}:</h5>
              <p>{`${ctx.credentials.token || t('loggedInInfo.noToken')}`}</p>
              <br />
              <h5>{t('loggedInInfo.refreshTokenFieldLabel')}:</h5>
              <p>{`${
                ctx.credentials.refreshToken || t('loggedInInfo.noToken')
              }`}</p>
            </Container>
          </Panel>
          <br />
        </div>
      ) : null}
    </div>
  );
}

export default LoggedIn;
