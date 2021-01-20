import { useContext, useEffect, useState } from 'react';
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
  Schema,
  Notification,
  ErrorMessage,
} from 'rsuite';
import { signup, signupFormData } from '../utils/api/Signup';

const msg_required = 'This field is required.';
const model = Schema.Model({
  name: Schema.Types.StringType()
    .isRequired(msg_required)
    .minLength(1, msg_required),
  username: Schema.Types.StringType()
    .isRequired(msg_required)
    .minLength(1, msg_required),
  email: Schema.Types.StringType()
    .isEmail('Please use a valid email address.')
    .isRequired(msg_required)
    .minLength(1, msg_required),
  password1: Schema.Types.StringType()
    .isRequired(msg_required)
    .minLength(1, msg_required),
  password2: Schema.Types.StringType()
    .isRequired(msg_required)
    .minLength(1, msg_required),
});

function SignupForm() {
  // This variable is required for rsuite forms.
  let form: any = undefined;

  // When the app first starts, it is unauthenticated.
  const ctx = useContext(Credentials);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [formData, setFormData] = useState<Record<string, any>>({
    name: '',
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, any>>({});
  const [miscErrors, setMiscErrors] = useState<string>('');

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
    signup(formData)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setDisabled(true);
        Notification['success']({
          title: 'Check your Inbox',
          description:
            'Verify your account by opening the email ' +
            "we've sent you and clicking the link. " +
            'Thanks for signing up!',
        });
      })
      .catch((err) => {
        // If errors occur, set them to display on the form.
        setFormErrors(err.response.data);
        const errKeys = Object.keys(err.response.data);
        const nonFieldErrors: boolean =
          errKeys.indexOf('non_field_errors') > -1;
        if (nonFieldErrors) {
          setMiscErrors(err.response.data['non_field_errors']);
        }
        console.log(err.response);
        setLoading(false);
      });
  };

  return (
    <div>
      <Panel header={<h2>Sign Up</h2>} bordered>
        <Form
          onChange={(newData) => setFormData(newData)}
          onCheck={(newErrors) => setFormErrors(newErrors)}
          formValue={formData}
          formError={formErrors}
          model={model}
          ref={(ref: any) => (form = ref)}
        >
          <FormGroup>
            <ControlLabel>First &amp; Last Name</ControlLabel>
            <FormControl name="name" disabled={disabled} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Username</ControlLabel>
            <FormControl name="username" disabled={disabled} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email" type="email" disabled={disabled} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl name="password1" type="password" disabled={disabled} />
          </FormGroup>
          <FormGroup>
            <FormControl name="password2" type="password" disabled={disabled} />
            <HelpBlock>Please enter your password twice.</HelpBlock>
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

export default SignupForm;
