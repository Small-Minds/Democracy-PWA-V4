import { useContext } from 'react';
import { Container, Panel } from 'rsuite';
import { Credentials } from '../utils/Authentication';

/**
 * Here is an example of a useContext hook to consume a provider.
 */
function LoggedIn() {
  // When the app first starts, it is unauthenticated.
  const ctx = useContext(Credentials);

  return (
    <div>
      {ctx ? (
        <div>
          <Panel header={<h4>Authentication Data</h4>} bordered>
            <Container style={{ wordWrap: 'break-word' }}>
              <p>{`Logged in: ${
                ctx.credentials.authenticated ? 'Yes' : 'No'
              }`}</p>
              <br />
              <h5>Access Token</h5>
              <p>{`${ctx.credentials.token || 'Not set.'}`}</p>
              <br />
              <h5>Refresh Token</h5>
              <p>{`${ctx.credentials.refreshToken || 'Not set.'}`}</p>
            </Container>
          </Panel>
          <br />
        </div>
      ) : null}
    </div>
  );
}

export default LoggedIn;
