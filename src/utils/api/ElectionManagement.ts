import { AxiosResponse } from 'axios';
import { api } from '../API';

const electionURL = `/elections/manage/election/`;

export type EmptyElection = {
  id: string;
  created: Date;
  title: string;
  description: string;
};

export type Position = {
  id: string;
  candidate: Array<string>;
  title: string;
  description: string;
  election: string;
};

export type Election = {
  created: string;
  description: string;
  election_email_domain: string;
  enable_multiple_submissions: boolean;
  id: string;
  manager: string;
  positions: Array<Position>;
  submission_end_time: string;
  submission_start_time: string;
  title: string;
  voting_end_time: string;
  voting_start_time: string;
};

export async function create(
  formData: any,
  accessToken: string
): Promise<EmptyElection> {
  return api
    .post(electionURL, formData, {
      headers: { Authorization: `JWT ${accessToken}` },
    })
    .then((res) => {
      const election: EmptyElection = res.data;
      return election;
    });
}

export async function getElectionList(
  accessToken: string
): Promise<AxiosResponse> {
  return api.get(electionURL, {
    headers: { Authorization: `JWT ${accessToken}` },
  });
}

export async function getElection(
  accessToken: string,
  electionId: string
): Promise<AxiosResponse> {
  let config = {
    headers: { Authorization: `JWT ${accessToken}` },
    params: {
      id: electionId,
    },
  };
  return api.get(electionURL + electionId, config);
}
