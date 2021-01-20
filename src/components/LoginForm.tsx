import { useContext, useEffect, useState } from 'react';
import { CredentialData, Credentials } from '../utils/Authentication';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  ButtonToolbar,
  Button,
  Panel,
  Schema,
  Notification,
  ErrorMessage,
} from 'rsuite';
import { signup, signupFormData } from '../utils/api/Signup';
import { login } from '../utils/api/Login';
import { couldStartTrivia } from 'typescript';
import { getAccessToken, getRefreshToken } from '../utils/API';

/**
 * This form can be placed anywhere below the Credentials context provider.
 */

const msg_required = 'This field is required.';
const model = Schema.Model({
  username: Schema.Types.StringType()
    .isRequired(msg_required)
    .minLength(1, msg_required),
  password: Schema.Types.StringType()
    .isRequired(msg_required)
    .minLength(1, msg_required),
});

function LoginForm() {
  // This variable is required for rsuite forms.
  let form: any = undefined;

  // When the app first starts, it is unauthenticated.
  const ctx = useContext(Credentials);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [formData, setFormData] = useState<Record<string, any>>({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, any>>({});
  const [miscErrors, setMiscErrors] = useState<string>('');

  // Disable the form if the user is logged in.
  useEffect(() => {
    if (ctx === undefined) return;
    if (ctx?.credentials.authenticated) {
      setDisabled(true);
      setMiscErrors('You are already logged in.');
    }
  }, [ctx]);

  const submitFormData = async () => {
    // Remove errors and set button to loading state.
    setLoading(true);
    setMiscErrors('');

    // First, check the form for errors.
    if (!form.check()) {
      console.log('Form has errors.');
      console.log(formErrors);
      setLoading(false);
      return;
    }

    // Then, submit the form to the backend.
    console.log(formData);
    login(formData)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setDisabled(true);
        if (!ctx) throw Error('Please refresh the page.');
        const access = getAccessToken();
        const refresh = getRefreshToken();
        const newCreds: CredentialData = {
          authenticated: true,
          token: access.token,
          tokenExpiry: access.expiry,
          refreshToken: refresh.refreshToken,
          refreshTokenExpiry: refresh.refreshTokenExpiry,
        };
        ctx.setCredentials(newCreds);
        Notification['success']({
          title: 'Logged In',
          description: 'Welcome back to Democracy by Small Minds.',
        });
      })
      .catch((err) => {
        // If errors occur, set them to display on the form.
        setFormErrors(err.response.data);
        const errKeys = Object.keys(err.response.data);
        const nonFieldErrors: boolean =
          errKeys.indexOf('non_field_errors') > -1;
        const detail: boolean = errKeys.indexOf('detail') > -1;
        if (nonFieldErrors) {
          setMiscErrors(err.response.data['non_field_errors']);
        } else if (detail) {
          setMiscErrors(err.response.data['detail']);
        }
        console.log(err.response);
        setLoading(false);
      });
  };

  return (
    <div>
      <Panel header={<h2>Log In</h2>} bordered>
        <Form
          onChange={(newData) => setFormData(newData)}
          onCheck={(newErrors) => setFormErrors(newErrors)}
          formValue={formData}
          formError={formErrors}
          model={model}
          ref={(ref: any) => (form = ref)}
        >
          <FormGroup>
            <ControlLabel>Username</ControlLabel>
            <FormControl name="username" disabled={disabled} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl name="password" type="password" disabled={disabled} />
          </FormGroup>
          <FormGroup>
            <ButtonToolbar>
              <Button
                appearance="primary"
                loading={loading}
                disabled={disabled}
                onClick={submitFormData}
              >
                Submit
              </Button>
              {miscErrors ? (
                <Button
                  appearance="subtle"
                  onClick={submitFormData}
                  disabled={disabled}
                >
                  {miscErrors}
                </Button>
              ) : null}
            </ButtonToolbar>
          </FormGroup>
        </Form>
      </Panel>
      <br />
    </div>
  );
}

export default LoginForm;
