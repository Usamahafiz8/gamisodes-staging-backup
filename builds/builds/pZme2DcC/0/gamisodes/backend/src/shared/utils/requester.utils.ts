import { AxiosInstance } from 'axios';
import { DocumentNode } from 'graphql';

export interface IClientOptions {
  url: string;
  accessToken: string;
  secretToken: string;
}

export const requester =
  ({ url, accessToken, secretToken }: IClientOptions, axios: AxiosInstance) =>
  async <R, V>(doc: DocumentNode, vars?: V, options?: any): Promise<R> => {
    const data = (
      await axios
        .post<R>(
          url,
          JSON.stringify({
            query: doc.loc?.source.body,
            variables: vars,
          }),
          {
            headers: {
              'X-Niftory-API-Key': accessToken,
              'X-Niftory-Client-Secret': secretToken,
              'Content-Type': 'application/json',
              ...options,
            },
          },
        )
        .catch((err) => {
          throw err.response?.data;
        })
    )?.['data'];
    if (data?.['errors']) throw data?.['errors'];
    return data?.['data'];
  };
