import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
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
  const [t, i18n] = useTranslation();

  return (
    <React.Fragment>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item
          componentClass={Col}
          colspan={24}
          lg={10}
          md={15}
          sm={20}
          xs={23}
        >
          <Container>
            <Content>
              <br />
              <h1>{t('mainPage.appName')}</h1>
              <br />
              <LanguagePicker />
              <LoginForm />
              <SignupForm />
            </Content>
          </Container>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </React.Fragment>
  );
}

export default Info;
