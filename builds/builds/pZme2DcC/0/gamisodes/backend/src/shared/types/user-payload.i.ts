import { AuthProviderEnum } from './oauth-provider.e';
import { AuthTypeEnum } from './oauth-type.e';

export interface IUserPayload {
  email: string;
  id?: string;
  image?: string;
  name?: string;
  provider: AuthProviderEnum;
  providerAccountId?: string;
  accessToken?: string;
  refreshToken?: string;
  type: AuthTypeEnum;
}
