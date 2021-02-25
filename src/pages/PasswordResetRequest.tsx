import React, { Fragment, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Button, FlexboxGrid, Icon, IconButton } from 'rsuite';
import {
  ButtonToolbar,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Notification,
  Schema,
} from 'rsuite';
import { requestPasswordReset } from '../utils/api/User';

const PasswordResetRequest: FC = () => {
  const [t] = useTranslation();
  const history = useHistory();

  // This variable is required for rsuite forms.
  let form: any = undefined;

  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, any>>({});
  const [miscErrors, setMiscErrors] = useState<string>('');

  const [formData, setFormData] = useState<Record<string, any>>({
    email: '',
  });

  //form model set up
  const msg_required = t('signInForm.msgRequired');
  const model = Schema.Model({
    email: Schema.Types.StringType()
      .isEmail(t('signInForm.invalidEmailFormatMsg'))
      .isRequired(msg_required)
      .minLength(1, msg_required),
  });

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
    requestPasswordReset(formData)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setDisabled(true);
        // Perform updates to local state:
        Notification['success']({
          title: t('setTimelineModal.updateNotification.successTitle'),
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
    <FlexboxGrid align="middle" justify="center" style={{ height: '50vh' }}>
      <FlexboxGrid.Item>
        <div style={{ textAlign: 'center' }}>
          <br />
          <h2>{t('v2.passwordResetRequest.title')}</h2>
          <br />
          <Form
            onChange={(newData) => setFormData(newData)}
            onCheck={(newErrors) => setFormErrors(newErrors)}
            formValue={formData}
            formError={formErrors}
            model={model}
            ref={(ref: any) => (form = ref)}
          >
            <FormGroup>
              <ControlLabel>
                {t('v2.passwordResetRequest.form.email')}
              </ControlLabel>
              <FormControl name="email" disabled={disabled} />
            </FormGroup>
            <FormGroup>
              <ButtonToolbar>
                <Button
                  size="lg"
                  appearance="primary"
                  loading={loading}
                  disabled={disabled}
                  onClick={submitFormData}
                >
                  {t('v2.passwordResetRequest.form.submit')}
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
        </div>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default PasswordResetRequest;
