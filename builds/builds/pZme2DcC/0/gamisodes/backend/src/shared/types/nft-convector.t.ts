import { NftQuery, NftsByWalletQuery } from 'src/niftory-api/graphql';
import {
  BrainTrainTraitsLabelEnum,
  MissionsLocationEnum,
  NftCollectionEnum,
  NftRarityEnum,
  NftSourceEnum,
  WalletTypeEnum,
} from './nft.e';

export type NifloryNftItem =
  | ArrayElement<NftsByWalletQuery['nftsByWallet']['items']>
  | NftQuery['nft'];

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export interface INft {
  id: string;
  title: string;
  description: string;
  source: NftSourceEnum;
  imageUrl: {
    contentType: string;
    thumbnailUrl: string;
    mediaURL: string;
  };
  level: number;
  collection: NftCollectionEnum;
  platform?: string;
  series?: number;
  rarity?: NftRarityEnum;
  editionSize?: number;
  edition?: number;
  isOpenEdition?: boolean;
  price?: number;
  isBlocked?: boolean;
  maxNftForUser?: number;
  traits?: { [key: string]: string };
  walletType: WalletTypeEnum;
}

export interface IBrainTrainNft extends INft {
  traits: Record<BrainTrainTraitsLabelEnum, string>;
}

export interface IMissionsNft extends INft {
  traits: { [key in MissionsLocationEnum]: string };
}
