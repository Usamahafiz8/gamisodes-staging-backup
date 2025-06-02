import { ConfigService } from '@nestjs/config';
import { GetConfigService } from 'src/config/config.service';
import {
  IBrainTrainNft,
  IMissionsNft,
  MissionsLocationEnum,
  NftCollectionEnum,
  NftRarityEnum,
  NftSourceEnum,
  NifloryNftItem,
  WalletTypeEnum,
} from '../types';
import { config } from 'dotenv';

config();
const configService = new GetConfigService(new ConfigService());
const DEFAULT_NFT_PRICE = configService.safeGet('DEFAULT_NFT_PRICE');

function convertNumber(data: string | number, defaultValue = 0): number {
  return Number(data) || defaultValue;
}

const brainTrainCollection = (collection) => {
  if (collection === 'brain train tickets')
    return NftCollectionEnum.BRAIN_TRAIN;
  if (collection === NftCollectionEnum.MISSIONS)
    return NftCollectionEnum.MISSIONS;
  else return NftCollectionEnum.GAMISODES;
};

const brainTrainSelector = (nft: NifloryNftItem, key: string) => {
  return (
    nft?.model?.attributes?.[key] ||
    nft?.model?.metadata?.[key] ||
    nft?.model?.[key] ||
    nft?.[key] ||
    undefined
  );
};

const missionName = (title) => {
  if (title.toLowerCase().includes('dublin'))
    return MissionsLocationEnum.DUBLIN;
  else if (title.toLowerCase().includes('new york'))
    return MissionsLocationEnum.NEWYORK;
  else if (title.toLowerCase().includes('paris'))
    return MissionsLocationEnum.PARIS;
  else if (title.toLowerCase().includes('san diego'))
    return MissionsLocationEnum.SANDIEGO;
  else if (title.toLowerCase().includes('singapore'))
    return MissionsLocationEnum.SINGAPORE;
  else if (title.toLowerCase().includes('sydney'))
    return MissionsLocationEnum.SYDNEY;
  else if (title.toLowerCase().includes('transylvania'))
    return MissionsLocationEnum.TRANSYLVANIA;
  else return '';
};

export const NiftoryConvertor = (
  nft: NifloryNftItem,
  walletType: WalletTypeEnum,
): IBrainTrainNft | IMissionsNft => {
  const isMissions =
    brainTrainCollection(
      brainTrainSelector(nft, 'collection')?.toLowerCase(),
    ) === NftCollectionEnum.MISSIONS;
  const traitsPath =
    'traits' in nft.model.metadata
      ? nft.model.metadata.traits
      : nft.model.metadata;
  const baseTreats = {
    ...(brainTrainSelector(nft, 'costumeType') && {
      'Costume Type': brainTrainSelector(nft, 'costumeType').toLowerCase(),
    }),
    type: brainTrainSelector(nft, 'type')?.toLowerCase(),
    Location:
      isMissions && missionName(brainTrainSelector(nft, 'title')).toLowerCase(),
  };
  let traits;
  if ('traits' in nft.model.metadata) {
    traits = traitsPath.reduce((accum, trait) => {
      return {
        ...accum,
        [trait.trait_type]: trait.value.toLowerCase(),
      };
    }, baseTreats);
  } else {
    const modelMetadata = Object.entries(nft.model.metadata).reduce(
      (accum, [key, value]: [string, string]) => {
        accum[key] = value?.toString().toLowerCase() ?? '';
        return accum;
      },
      {},
    );
    traits = {
      ...modelMetadata,
      ...baseTreats,
    };
  }
  if (!('rarity' in traits)) {
    traits.rarity = NftRarityEnum.COMMON;
  }
  const isOpenEdition =
    brainTrainSelector(nft, 'editionSize')?.toLowerCase() === 'open';
  const files = Array.isArray(nft?.model?.content?.files)
    ? nft?.model?.content?.files[0]
    : undefined;
  if (!files) {
    console.log('test files inside convertor: ', nft);
  }
  return {
    id: nft.id,
    title: brainTrainSelector(nft, 'title'),
    description: brainTrainSelector(nft, 'description'),
    source: NftSourceEnum.NIFTORY,
    imageUrl: {
      contentType: files?.contentType ?? '',
      thumbnailUrl: nft.model.content.poster.url,
      mediaURL: files?.url ?? '',
    },
    level: brainTrainSelector(nft, 'level'),
    collection: brainTrainCollection(
      brainTrainSelector(nft, 'collection')?.toLowerCase(),
    ),
    platform: brainTrainSelector(nft, 'platform')?.toLowerCase(),
    series: convertNumber(brainTrainSelector(nft, 'series')),
    rarity:
      brainTrainSelector(nft, 'rarity')?.toLowerCase() || NftRarityEnum.COMMON,
    editionSize: convertNumber(brainTrainSelector(nft, 'quantity')),
    edition: convertNumber(brainTrainSelector(nft, 'serialNumber')),
    price: convertNumber(brainTrainSelector(nft, 'price'), DEFAULT_NFT_PRICE),
    isBlocked: brainTrainSelector(nft, 'isBlocked'),
    maxNftForUser: convertNumber(
      brainTrainSelector(nft, 'maxNftForUser') ||
        brainTrainSelector(nft, 'quantity'),
    ),
    isOpenEdition,
    traits,
    walletType,
  };
};
