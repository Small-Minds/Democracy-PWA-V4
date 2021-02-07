import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Panel,
  Dropdown,
  ButtonToolbar,
  Navbar,
  Icon,
  Nav,
  Avatar,
  IconButton,
  Notification,
} from 'rsuite';
import { clearTokens } from '../utils/API';
import { Credentials } from '../utils/Authentication';
import LanguagePicker from './LanguagePicker';

function AccountMenu() {
  const ctx = useContext(Credentials);
  const history = useHistory();
  const [t] = useTranslation();

  return (
    <Dropdown placement="bottomEnd" icon={<Icon icon="user" />}>
      <Dropdown.Item
        icon={<Icon icon="sign-out" />}
        onSelect={() => {
          clearTokens();
          if (!ctx) return;
          ctx.setCredentials({
            authenticated: false,
            token: '',
            tokenExpiry: undefined,
            refreshToken: '',
            refreshTokenExpiry: undefined,
          });
          history.push('/');
          Notification['success']({
            title: t('mainPage.logoutSuccessTitle'),
            description: t('mainPage.logoutSuccessDescription'),
          });
        }}
      >
        {t('mainPage.logoutButton')}
      </Dropdown.Item>
    </Dropdown>
  );
}

function Navigation() {
  const ctx = useContext(Credentials);
  const [t, i18n] = useTranslation();
  const history = useHistory();
  const location = useLocation();

  console.log(location);
  return (
    <Navbar>
      <Navbar.Body>
        {ctx && ctx?.credentials.authenticated && (
          <Nav
            appearance="subtle"
            activeKey={location.pathname}
            onSelect={(key: string) => history.push(key)}
          >
            <Nav.Item eventKey="/" icon={<Icon icon="home" />}>
              {t('mainPage.homeLink')}
            </Nav.Item>
            <Nav.Item eventKey="/vote" icon={<Icon icon="check2" />}>
              {t('mainPage.voteLink')}
            </Nav.Item>
            <Nav.Item eventKey="/setup" icon={<Icon icon="gears2" />}>
              {t('mainPage.setupLink')}
            </Nav.Item>
          </Nav>
        )}
        <Nav pullRight>
          <LanguagePicker />
          {ctx && ctx.credentials.authenticated && <AccountMenu />}
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
}

export default Navigation;
