export const isWallet = (wallet: string): boolean =>
  /^0x[0-9a-f]{16}$/.test(wallet);
