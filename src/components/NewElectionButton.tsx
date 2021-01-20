import { useContext, useState } from 'react';
import { Button, Panel } from 'rsuite';
import { Credentials } from '../utils/Authentication';

/**
 * Here is an example of a useContext hook to consume a provider.
 */
function NewElectionButton() {
  // When the app first starts, it is unauthenticated.
  const ctx = useContext(Credentials);
  const [loading, setLoading] = useState<boolean>(false);

  const createElection = async () => {
    setLoading(true);
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
        Create New Election
      </Button>
    </div>
  );
}

export default NewElectionButton;
