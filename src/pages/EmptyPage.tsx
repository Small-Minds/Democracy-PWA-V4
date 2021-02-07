import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Container, Content, FlexboxGrid, Panel } from 'rsuite';

function EmptyPage() {
  const [t] = useTranslation();

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
              <p>{t('emptyPage.body')}</p>
            </Content>
          </Container>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </React.Fragment>
  );
}

export default EmptyPage;
