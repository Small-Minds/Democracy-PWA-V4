import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PublicElectionList from '../components/PublicElectionList';

function Home() {
  const [t, i18n] = useTranslation();

  return (
    <Fragment>
      <h1>{t('general.app.name')}</h1>
      <p>{t('mainPage.subtitle')}</p>
      <br />
      <br />
      <PublicElectionList />
    </Fragment>
  );
}

export default Home;
