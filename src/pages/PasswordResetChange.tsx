import React, { Fragment, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Button, FlexboxGrid, Icon, IconButton } from 'rsuite';

const PasswordResetChange: FC = () => {
  const [t] = useTranslation();
  const history = useHistory();

  return (
    <FlexboxGrid align="middle" justify="center" style={{ height: '50vh' }}>
      <FlexboxGrid.Item>
        <div style={{ textAlign: 'center' }}>
          <br />
          <IconButton
            appearance="primary"
            size="lg"
            icon={<Icon icon="arrow-right-line" />}
          >
            {t('general.returnToLogin')}
          </IconButton>
          <br />
        </div>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default PasswordResetChange;
