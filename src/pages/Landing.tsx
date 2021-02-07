import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Col, Container, Content, FlexboxGrid, Panel } from 'rsuite';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

function Landing() {
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

export default Landing;
