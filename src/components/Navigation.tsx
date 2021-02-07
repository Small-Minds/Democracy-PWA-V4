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
} from 'rsuite';
import { Credentials } from '../utils/Authentication';
import LanguagePicker from './LanguagePicker';

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
              Home
            </Nav.Item>
            <Nav.Item eventKey="/vote" icon={<Icon icon="check2" />}>
              Vote
            </Nav.Item>
            <Nav.Item eventKey="/setup" icon={<Icon icon="gears2" />}>
              Setup
            </Nav.Item>
          </Nav>
        )}
        <Nav pullRight>
          <LanguagePicker />
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
}

export default Navigation;
