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
} from 'rsuite';

const msg_required = 'This field is required.';
const model = Schema.Model({
  name: Schema.Types.StringType()
    .isRequired(msg_required)
    .minLength(1, msg_required),
  username: Schema.Types.StringType()
    .isRequired(msg_required)
    .minLength(1, msg_required),
  email_address: Schema.Types.StringType()
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

  const [formData, setFormData] = useState<any>({
    name: '',
    username: '',
    email_address: '',
    password1: '',
    password2: '',
  });
  const [formErrors, setFormErrors] = useState<any>({});

  const submitFormData = async () => {
    setLoading(true);
    // First, check the form for errors.
    if (!form.check()) {
      setLoading(false);
      return;
    }

    // Then, submit.
    console.log(formData);
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
            <FormControl name="name" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Username</ControlLabel>
            <FormControl name="username" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email_address" type="email" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl name="password1" type="password" />
          </FormGroup>
          <FormGroup>
            <FormControl name="password2" type="password" />
            <HelpBlock>Please enter your password twice.</HelpBlock>
          </FormGroup>
          <FormGroup>
            <ButtonToolbar>
              <Button
                appearance="primary"
                loading={loading}
                onClick={submitFormData}
              >
                Submit
              </Button>
            </ButtonToolbar>
          </FormGroup>
        </Form>
      </Panel>
      <br />
    </div>
  );
}

export default SignupForm;
