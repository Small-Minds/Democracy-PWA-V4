import React, { Fragment, useMemo } from 'react';
import { useContext } from 'react';
import Gravatar from 'react-gravatar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, FlexboxGrid, Icon, IconButton } from 'rsuite';
import { User } from '../utils/api/User';

export default function ManageAccount() {
  const user = useContext(User);
  const history = useHistory();
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
      <FlexboxGrid align="middle" justify="start">
        <FlexboxGrid.Item>
          <Avatar size="lg" style={{ marginTop: 20, marginBottom: 20 }}>
            {userImage}
          </Avatar>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <IconButton
            style={{ margin: 20 }}
            icon={<Icon icon="chevron-left" />}
            href={'https://en.gravatar.com/'}
            primary
          >
            {t('manageAccountPage.changeProfileBtn')}
          </IconButton>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <br />
    </Fragment>
  );
}
