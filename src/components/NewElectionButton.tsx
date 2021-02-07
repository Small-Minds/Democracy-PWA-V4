import { useContext, useState } from 'react';
import { Button, Notification, Panel } from 'rsuite';
import { api } from '../utils/API';
import { Credentials } from '../utils/Authentication';
import { create } from '../utils/api/ElectionManagement';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
/**
 * Here is an example of a useContext hook to consume a provider.
 */
function NewElectionButton() {
  // When the app first starts, it is unauthenticated.
  const ctx = useContext(Credentials);
  const [loading, setLoading] = useState<boolean>(false);
  // Set up localization hook
  const [t] = useTranslation();
  const history = useHistory();
  const createElection = async () => {
    setLoading(true);
    if (!ctx) return;
    create({}, ctx.credentials.token)
      .then((election) => {
        /** Notification['success']({
          title: t("createElectionBtn.successMsgTitle"),
          description: `${t("createElectionBtn.successMsg")} ${election.id}`,
        });*/
        let path = `/election/${election.id}`;
        history.push(path);
      })
      .catch((x) => {
        console.log(x.response.data);
        Notification['error']({
          title: t('createElectionBtn.failMsgTitle'),
          description: t('createElectionBtn.failMsg'),
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
