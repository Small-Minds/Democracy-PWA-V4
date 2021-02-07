import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
import { Col, Container, Content, FlexboxGrid, Panel } from 'rsuite';

import ElectionInfo from '../components/ElectionInfo';
import ElectionList from '../components/ElectionList';
import LanguagePicker from '../components/LanguagePicker';
import LoggedIn from '../components/LoggedIn';
import LoginForm from '../components/LoginForm';
import LogoutButton from '../components/LogoutButton';
import NewElectionButton from '../components/NewElectionButton';
import PublicElectionList from '../components/PublicElectionList';
import SignupForm from '../components/SignupForm';

function Base() {
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
              <LoggedIn />

              <LogoutButton />
              <br />
              <br />

              <Switch>
                {/**
                
                  <Route path='/login' component={LoginForm}/>
               
                  <Route path='/signup' component={SignupForm}/>
                  */}
                <Route path="/election/:id" children={<ElectionInfo />} />
              </Switch>
              <Panel
                header={<h2>{t('mainPage.electionToolSectionTitle')}</h2>}
                bordered
              >
                <NewElectionButton />
              </Panel>
              <br />
              <Panel header={<h2>Your Elections</h2>} bordered>
                <ElectionList />
              </Panel>
              <br />
              <Panel header={<h2>All Elections</h2>} bordered>
                <PublicElectionList />
              </Panel>
            </Content>
          </Container>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </React.Fragment>
  );
}

export default Base;
