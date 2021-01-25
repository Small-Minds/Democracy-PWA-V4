import { useContext, useState } from 'react';
import { Button, Notification, Panel } from 'rsuite';
import { api } from '../utils/API';
import { Credentials } from '../utils/Authentication';
import { create } from '../utils/api/ElectionManagement';
import { useTranslation } from 'react-i18next';
/**
 * Here is an example of a useContext hook to consume a provider.
 */
function NewElectionButton() {
  // When the app first starts, it is unauthenticated.
  const ctx = useContext(Credentials);
  const [loading, setLoading] = useState<boolean>(false);
  // Set up localization hook
  const [t] = useTranslation();
  const createElection = async () => {
    setLoading(true);
    if (!ctx) return;
    create({}, ctx.credentials.token)
      .then((election) => {
        Notification['success']({
          title: 'Success',
          description: `Created new Election with ID ${election.id}`,
        });
      })
      .catch((x) => {
        console.log(x.response.data);
        Notification['error']({
          title: 'Error',
          description: 'Failed to start a new Election.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Button
        appearance="primary"
        size="lg"
        disabled={!ctx?.credentials.authenticated}
        loading={loading}
        onClick={createElection}
      >
        {t('createElectionBtn.btnLabel')}
      </Button>
    </div>
  );
}

export default NewElectionButton;
