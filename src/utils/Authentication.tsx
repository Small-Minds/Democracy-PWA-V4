import { createContext } from 'react';

export const add = (a: number, b: number): number => {
  return a + b;
};

export type CredentialData = {
  authenticated: boolean | undefined;
  token: string;
  tokenExpiry: Date | undefined;
  refreshToken: string;
  refreshTokenExpiry: Date | undefined;
};

export const blankCredentialData: CredentialData = {
  authenticated: undefined,
  token: '',
  tokenExpiry: undefined,
  refreshToken: '',
  refreshTokenExpiry: undefined,
};

export interface CredentialInterface {
  credentials: CredentialData;
  setCredentials: (x: CredentialData) => void;
}

// Context Object
export const Credentials = createContext<CredentialInterface | null>(null);
