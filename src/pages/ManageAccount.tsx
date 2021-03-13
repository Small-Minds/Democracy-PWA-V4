import React, { Fragment, useContext, useMemo } from 'react';
import { Fade } from 'react-awesome-reveal';
import Gravatar from 'react-gravatar';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'rsuite';
import ChangeNameForm from '../components/ChangeNameForm';
import ChangePasswordForm from '../components/ChangePasswordForm';
import { User } from '../utils/api/User';

export default function ManageAccount() {
  const user = useContext(User);
  const [t] = useTranslation();

  const userImage = useMemo(() => {
    if (!user || !user.user || !user.user.email) return null;
    return <Gravatar email={user.user.email} size={60} rating="pg" />;
  }, [user]);

  return (
    <Fragment>
      <h1>{t('manageAccountPage.title')}</h1>
      <p>{t('manageAccountPage.instruction')}</p>
      <br />
      <div>
        <Avatar size="lg" style={{ marginTop: 20, marginBottom: 20 }}>
          {userImage && (
            <Fade triggerOnce duration={600} delay={100}>
              <div>{userImage}</div>
            </Fade>
          )}
        </Avatar>
      </div>
      <a
        href="https://en.gravatar.com/"
        rel="external nofollow"
        target="_blank"
      >
        {t('manageAccountPage.changeProfileBtn')}
      </a>
      <br />
      <br />
      <br />
      <h3>{t('signUpForm.nameInputLabel')}</h3>
      <br />
      <ChangeNameForm />
      <br />
      <br />
      <h3>{t('resetPassword.form.password1')}</h3>
      <br />
      <ChangePasswordForm />
      <br />
      <br />
      <br />
      <br />
    </Fragment>
  );
}
