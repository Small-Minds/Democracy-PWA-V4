import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Col, Container, Content, FlexboxGrid, Panel } from 'rsuite';

function EmptyPage() {
  const [t] = useTranslation();
  const history = useHistory();

  return (
    <React.Fragment>
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
              <h1>{t('emptyPage.title')}</h1>
              <br />
              <br />
              <p><code>/{history.location.pathname}</code></p>
              <p>{t('emptyPage.body')}</p>
              <br />
            </Content>
          </Container>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </React.Fragment>
  );
}

export default EmptyPage;
