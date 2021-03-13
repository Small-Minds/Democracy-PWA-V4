import React, { FC, Fragment } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FlexboxGrid, Icon, IconButton } from 'rsuite';

const PublicElectionWelcome: FC = () => {
  const [t] = useTranslation();
  const history = useHistory();

  return (
    <FlexboxGrid align="middle" justify="center" style={{ height: '50vh' }}>
      <FlexboxGrid.Item></FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <div style={{ textAlign: 'center' }}>
          <Fade cascade triggerOnce duration={300} damping={0.2} delay={100}>
            <h1>{t('general.app.name')}</h1>
            <br />
            <p>{t('v2.labels.invitedToViewElection')}</p>
            <br />
            <br />
            <p>{t('v2.labels.loginToContinue')}</p>
            <br />
            <IconButton
              appearance="primary"
              size="lg"
              icon={<Icon icon="arrow-right-line" />}
              onClick={() => {
                history.push('/');
              }}
            >
              {t('general.returnToLogin')}
            </IconButton>
            <br />
          </Fade>
        </div>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default PublicElectionWelcome;
