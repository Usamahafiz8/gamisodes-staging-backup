import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import { GetConfigService } from 'src/config/config.service';

export interface IRarribleOptions {
  signer: string;
  message: string;
  signature: string;
  publicKey?: string;
}

const confService = new GetConfigService(new ConfigService());

/**
 * Validation of the order signature by Rarible
 */
export const rarribleVerifySign = async (
  axios: AxiosInstance,
  options: IRarribleOptions,
): Promise<boolean> => {
  const res = (
    await axios.post(
      `${confService.safeGet('RARIBLE_HOST')}/signature/validate`,
      options,
      { headers: { 'x-api-key': confService.safeGet('RARIBLE_API_KEY') } },
    )
  )?.data;

  return res;
};
