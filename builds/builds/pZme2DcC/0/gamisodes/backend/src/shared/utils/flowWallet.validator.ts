import { Matches, ValidationOptions } from 'class-validator';

export const IsFlowWallet = (opt?: ValidationOptions) =>
  Matches(/^0x[0-9a-f]{16}$/, opt);
