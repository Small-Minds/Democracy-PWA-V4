import { Fragment, useContext, useState } from 'react';
import { Button, Modal, Notification, Panel } from 'rsuite';
import { Credentials } from '../utils/Authentication';
import { create } from '../utils/api/ElectionManagement';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

/**
 * Reminder to self:
 * Max editing this file. Do not edit until his PR is merged.
 */

function NewElectionButton() {
  // When the app first starts, it is unauthenticated.
  const ctx = useContext(Credentials);
  const [loading, setLoading] = useState<boolean>(false);
  // Modal open/closed state:
  const [open, setOpen] = useState<boolean>(false);
  // Set up localization hook
  const [t] = useTranslation();
  const history = useHistory();

  /**
   * Creates a new election and navigates to that page.
   * @param title New title for the election.
   * @param description New description for the election.
   */
  const createElection = async (title: string, description: string) => {
    // If  not authenticated, quit early.
    if (!ctx || !ctx.credentials.authenticated) return;
    // Otherwise, start loading animations.
    setLoading(true);

    // Use a fake date until the form is implemented.
    const d = new Date();

    // Process form input (todo)

    // Call the creation endpoint.
    create({
      title: title,
      description: description,
      election_email_domain: 'uottawa.ca',
      enable_multiple_submissions: false,
      submission_end_time: d,
      submission_start_time: d,
      voting_end_time: d,
      voting_start_time: d,
    })
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
        <Modal.Body>(Form to set title and subtitle.)</Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!ctx?.credentials.authenticated}
            loading={loading}
            appearance="subtle"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={!ctx?.credentials.authenticated}
            loading={loading}
            appearance="primary"
            onClick={() => {
              setLoading(true);
              createElection(
                'New Election',
                'Come and vote for the new president of nothing.'
              );
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default NewElectionButton;
