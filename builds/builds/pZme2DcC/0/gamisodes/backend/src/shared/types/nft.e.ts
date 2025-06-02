export enum WalletTypeEnum {
  /** A custodial wallet created by the niftory API. */
  Custodial = 'CUSTODIAL',
  /** An external wallet linked by the user. */
  External = 'EXTERNAL',
}

export enum NftCollectionEnum {
  GADGETS = 'gadgets',
  // "VIP" its changed name for "Commemorative Card"
  VIP = 'vip',
  MISSIONS = 'missions',
  BRAIN_TRAIN = 'braintrain',
  GAMISODES = 'gamisodes',
}

export enum NftSourceEnum {
  BLOCKCHAIN = 'BlockChain',
  NIFTORY = 'Niftory',
}

export enum NftRarityEnum {
  COMMON = 'common',
  ULTRA_COMMON = 'ultra-common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
  SUPER_LEGENDARY = 'super-legendary',
}

export enum BrainTrainTraitsLabelEnum {
  COSTUME_TYPE = 'Costume Type',
  BACKGROUND_COLOR = 'Background Color',
  BACKGROUND_PATTERN = 'Background Pattern',
  OUTFIT = 'Outfit',
  COMS = 'Coms',
  EYES = 'Eyes',
  HEAD_PIECE = 'Head Piece',
  MOUTH = 'Mouth',
  TYPE = 'Type',
}

export enum MissionsLocationEnum {
  DUBLIN = 'dublin',
  NEWYORK = 'new york',
  PARIS = 'paris',
  SANDIEGO = 'san diego',
  SINGAPORE = 'singapore',
  SYDNEY = 'sydney',
  TRANSYLVANIA = 'transylvania',
}
