import { AuthProviderEnum } from './oauth-provider.e';

export interface ISessionPayload {
  sessionToken: string;
  userId: string;
  email: string;
  provider: AuthProviderEnum;
  providerAccountId: string;
}
