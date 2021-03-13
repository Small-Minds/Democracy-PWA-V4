import React, { Fragment, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

function Landing() {
  const [t] = useTranslation();
  const history = useHistory();

  // If a user lands on this page, set history to '/'.
  useEffect(() => {
    // console.log('Adding current location to history...');
    history.push(history.location);
    history.replace('/');
  }, []);

  return (
    <Fragment>
      <Fade cascade triggerOnce duration={300} damping={0.3} delay={100}>
        <h1>{t('general.app.name')}</h1>
        <br />
        <p>{t('mainPage.slogan')}</p>
        <br />
        <LoginForm />
        <SignupForm />
      </Fade>
    </Fragment>
  );
}

export default Landing;
