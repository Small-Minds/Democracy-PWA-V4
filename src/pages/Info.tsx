import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Col, Container, Content, FlexboxGrid, Panel } from 'rsuite';

import ElectionInfo from '../components/ElectionInfo';
import ElectionList from '../components/ElectionList';
import LanguagePicker from '../components/LanguagePicker';
import LoggedIn from '../components/LoggedIn';
import LoginForm from '../components/LoginForm';
import NewElectionButton from '../components/NewElectionButton';
import PublicElectionList from '../components/PublicElectionList';
import SignupForm from '../components/SignupForm';

function Info() {
  const [t] = useTranslation();
  const history = useHistory();

  // If a user lands on this page, set history to '/'.
  useEffect(() => {
    history.replace('/');
  }, []);

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item
        componentClass={Col}
        colspan={24}
        sm={20}
        xs={23}
        style={{ maxWidth: '800px' }}
      >
        <Container>
          <Content>
            <br />
            <h1>{t('mainPage.appName')}</h1>
            <br />
            <p>{t('mainPage.slogan')}</p>
            <br />
            <LoginForm />
            <SignupForm />
          </Content>
        </Container>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}

export default Info;
