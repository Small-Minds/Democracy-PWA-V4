import React, { FC, Fragment, useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { Container, FlexboxGrid, Icon, IconButton, Panel } from 'rsuite';
import { api } from '../utils/API';

type SparseElectionDetails = {
  title: string;
  subtitle: string;
};

const PublicElectionWelcome: FC = () => {
  const [t] = useTranslation();
  const history = useHistory();
  const { id } = useParams<Record<string, string | undefined>>();
  const [
    sparseElectionDetails,
    setSparseElectionDetails,
  ] = useState<SparseElectionDetails>();

  useEffect(() => {
    api
      .get(`/elections/participate/public-details/${id}/`)
      .then((res) => {
        setSparseElectionDetails(res.data);
      })
      .catch((res) => {
        console.error(res);
      });
  }, [id]);

  return (
    <Container>
      <FlexboxGrid align="middle" justify="center">
        <FlexboxGrid.Item colspan={24}>
          <div style={{ textAlign: 'center' }}>
            <Fade cascade triggerOnce duration={300} damping={0.2} delay={100}>
              <br />
              <p>{t('v2.labels.invitedToViewElection')}</p>
              <br />
              <Panel bordered>
                <br />
                <h2>{sparseElectionDetails && sparseElectionDetails.title}</h2>
                <p>{sparseElectionDetails && sparseElectionDetails.subtitle}</p>
                <br />
              </Panel>
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
    </Container>
  );
};

export default PublicElectionWelcome;