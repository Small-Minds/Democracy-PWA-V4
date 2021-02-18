import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button,
  ButtonToolbar,
  Notification,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Schema,
} from 'rsuite';
import { Position } from '../utils/api/ElectionManagement';
import {
  getPosition,
  PositionApplicationParams,
  submitPositionApplication,
} from '../utils/api/PositionApplication';
import { EmptyBallot, getEmptyBallot } from '../utils/api/Voting';
import { Credentials } from '../utils/Authentication';
import Loading from './Loading';

export default function Vote() {
  const [t] = useTranslation();
  const history = useHistory();
  let { id } = useParams<any>();
  const ctx = useContext(Credentials);
  //set up required variable for rsuite forms.
  let form: any = undefined;
  const msg_required = 'This field is required';
  const model = Schema.Model({
    personalStatement: Schema.Types.StringType()
      .isRequired(msg_required)
      .minLength(1, msg_required),
  });
  //form data setup
  const [formData, setFormData] = useState<Record<string, any>>({
    personalStatement: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, any>>({});

  const [ballot, setBallot] = useState<EmptyBallot>();

  useEffect(() => {
    //Return early if no context is provided.
    if (!ctx || !ctx.credentials.authenticated) return;
    //If logged in, attempt to get the position details
    getEmptyBallot(id).then((value: EmptyBallot) => {
      setBallot(value);
    });
  }, []);

  // While we fetch the ballot, show the spinner.
  if (!ballot)
    return (
      <Fragment>
        <Loading />
      </Fragment>
    );

  return (
    <div>
      <h2>Ballot for {ballot.title}</h2>
      <p>
        Elect a candidate for{' '}
        {ballot.positions.map((pos) => pos.title).join(', ')}.
      </p>
      <code>
        <pre>{JSON.stringify(ballot, null, 2)}</pre>
      </code>
    </div>
  );
}
