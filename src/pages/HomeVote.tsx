import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Container, Content, FlexboxGrid, Panel } from 'rsuite';

import ElectionList from '../components/ElectionList';
import PublicElectionList from '../components/PublicElectionList';

function HomeVote() {
  const [t, i18n] = useTranslation();

  return (
    <Fragment>
      <h1>{t('voteHomePage.title')}</h1>
      <p>{t('voteHomePage.subtitle')}</p>
      <br />
      <PublicElectionList filterDomain />
    </Fragment>
  );
}

export default HomeVote;
