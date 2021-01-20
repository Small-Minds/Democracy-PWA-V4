import { useContext } from 'react';
import { Credentials } from '../utils/Authentication';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  ButtonToolbar,
  Button,
  Panel,
} from 'rsuite';

/**
 * Here is an example of a useContext hook to consume a provider.
 */
function SignupForm() {
  // When the app first starts, it is unauthenticated.
  const ctx = useContext(Credentials);

  return (
    <div>
      <Panel header={<h2>Sign Up</h2>} bordered>
        <Form>
          <FormGroup>
            <ControlLabel>First &amp; Last Name</ControlLabel>
            <FormControl name="name" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Username</ControlLabel>
            <FormControl name="username" />
            <HelpBlock tooltip>You will use this username to log in.</HelpBlock>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email_address" type="email" />
            <HelpBlock tooltip>
              The primary email address for your account. You can add more
              later.
            </HelpBlock>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl name="password1" type="password" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Verify Password</ControlLabel>
            <FormControl name="password2" type="password" />
          </FormGroup>
          <FormGroup>
            <ButtonToolbar>
              <Button appearance="primary">Submit</Button>
              <Button appearance="default">Cancel</Button>
            </ButtonToolbar>
          </FormGroup>
        </Form>
      </Panel>
      <br />
    </div>
  );
}

export default SignupForm;
