import { Fragment, useContext, useState } from 'react';
import { Button, Modal, Notification, Panel } from 'rsuite';
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
  // Modal state:
  const [open, setOpen] = useState<boolean>(false);
  // Set up localization hook
  const [t] = useTranslation();
  const history = useHistory();

  const createElection = async () => {
    setLoading(true);
    if (!ctx) return;
    create({}, ctx.credentials.token)
      .then((election) => {
        let path = `/election/${election.id}`;
        history.push(path);
      })
      .catch((x) => {
        console.log(x.response.data);
        console.error(x);
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
    <Fragment>
      <Button
        appearance="primary"
        size="lg"
        disabled={!ctx?.credentials.authenticated}
        loading={loading}
        onClick={() => setOpen(true)}
      >
        {t('createElectionBtn.btnLabel')}
      </Button>
      <Modal size="xs" show={open} onHide={() => setOpen(false)}>
        <Modal.Title>Create a New Election</Modal.Title>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button appearance="subtle" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={createElection}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default NewElectionButton;
