import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import { GetConfigService } from 'src/config/config.service';

export interface IMagicCheckOptions {
  type: string;
  value: string;
}

export interface IMagicResponse {
  data: {
    email: string;
    phone_number: string;
    subject: string;
    wallets: {
      network: string;
      public_address: string;
      wallet_type: string;
    }[];
  };
  error_code: string;
  message: string;
  status: string;
}

const confService = new GetConfigService(new ConfigService());

/**
 * Validation of the order signature by Rarible
 */
export const magicVerifySub = async (
  axios: AxiosInstance,
  options: IMagicCheckOptions,
): Promise<IMagicResponse> => {
  const res = (
    await axios.get(
      `${confService.safeGet('MAGIC_HOST')}/v2/admin/auth/user/get`,
      {
        headers: {
          'X-Magic-Secret-Key': confService.safeGet('MAGIC_API_SECRET_KEY'),
          'Content-Type': 'application/json',
        },
        data: options,
      },
    )
  )?.data;

  return res;
};
