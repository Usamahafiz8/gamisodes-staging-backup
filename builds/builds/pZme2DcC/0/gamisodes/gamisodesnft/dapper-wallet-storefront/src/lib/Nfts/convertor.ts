import { convertNumber } from "consts/helpers"
import { NftQuery, NftsByWalletQuery } from "generated/graphql"
import {
  EMissionsLocation,
  ENftCollection,
  ENftRarity,
  ENftSource,
  IBrainTrainNft,
  IMissionsNft,
  INft,
  WalletType,
} from "src/typings/INfts"
import { DEFAULT_NFT_PRICE } from "../const"
import { IItem } from "../flowConnector/types"
import { ArrayElement } from "../types"

type NifloryNftItem = ArrayElement<NftsByWalletQuery["nftsByWallet"]["items"]> | NftQuery["nft"]

const collection = (traits) => {
  if (
    traits?.series?.toLowerCase() === ENftCollection.GADGETS ||
    traits?.series?.toLowerCase() === ENftCollection.MISSIONS
  )
    return traits.series
  else if (traits?.gamisodesName?.toLowerCase() === "commemorative card") return ENftCollection.GENESIS
}

const brainTrainCollection = (collection) => {
  if (collection === "brain train tickets") return ENftCollection.BRAIN_TRAIN
  else if (collection === ENftCollection.MISSIONS) return ENftCollection.MISSIONS
  else if (collection === ENftCollection.GADGETS) return ENftCollection.GADGETS
  else if (collection === ENftCollection.MOMENTS) return ENftCollection.MOMENTS
  else if (collection?.toLowerCase() === "genesis") return ENftCollection.GENESIS
  else return ENftCollection.GAMISODES
}
const brainTrainSelector = (nft: NifloryNftItem, key: string) => {
  return (
    nft?.model?.attributes?.[key] ||
    nft?.model?.metadata?.[key] ||
    nft?.model?.[key] ||
    nft?.[key] ||
    undefined
  )
}

const missionName = (title) => {
  if (title.toLowerCase().includes("dublin")) return EMissionsLocation.DUBLIN
  else if (title.toLowerCase().includes("new york")) return EMissionsLocation.NEWYORK
  else if (title.toLowerCase().includes("paris")) return EMissionsLocation.PARIS
  else if (title.toLowerCase().includes("san diego")) return EMissionsLocation.SANDIEGO
  else if (title.toLowerCase().includes("singapore")) return EMissionsLocation.SINGAPORE
  else if (title.toLowerCase().includes("sydney")) return EMissionsLocation.SYDNEY
  else if (title.toLowerCase().includes("transylvania")) return EMissionsLocation.TRANSYLVANIA
  else return ""
}

const BlockChainConvertor = (nft: IItem, walletType: WalletType): INft => {
  const traits = nft.traits.traits?.reduce((accum, trait) => {
    return {
      ...accum,
      [trait.name]: trait.name !== "mediaURL" ? trait.value.toLowerCase() : trait.value,
    }
  }, {})

  if (!("rarity" in traits)) {
    traits.rarity = ENftRarity.COMMON
  }

  return {
    id: nft.id,
    title:
      traits?.series?.toLowerCase() !== ENftCollection.GADGETS
        ? nft.display.name
        : `${nft.display.name} Level ${traits["level"]}`,
    description: nft.display.description,
    source: ENftSource.BLOCKCHAIN,
    imageUrl: {
      contentType: "image/png",
      thumbnailUrl: nft?.display?.thumbnail?.url ?? "",
      mediaURL: traits["mediaURL"],
    },
    level: traits["level"],
    collection: collection(traits).toLowerCase(),
    platform: traits["platform"],
    series: convertNumber(traits["series"]),
    rarity: traits["rarity"]?.toLowerCase() || nft?.rarity || ENftRarity.COMMON,
    editionSize: convertNumber(nft.editions.infoList[0].max),
    edition: convertNumber(nft.editions.infoList[0].number),
    isOpenEdition: false,
    price: DEFAULT_NFT_PRICE,
    isBlocked: false,
    maxNftForUser: convertNumber(nft.editions.infoList[0].max),
    traits: {
      ...traits,
      name: nft.display.name.toLowerCase(),
      Location:
        traits?.series?.toLowerCase() === ENftCollection.MISSIONS
          ? missionName(nft.display.name).toLowerCase()
          : undefined,
    },
    walletType
  }
}

const NiftoryConvertor = (nft: NifloryNftItem, walletType: WalletType): IBrainTrainNft | IMissionsNft => {
  const collection = brainTrainCollection(brainTrainSelector(nft, "collection")?.toLowerCase())
  const isMissions = collection === ENftCollection.MISSIONS
  const traitsPath = "traits" in nft.model.metadata ? nft.model.metadata.traits : nft.model.metadata
  const baseTreats = {
    ...(brainTrainSelector(nft, "costumeType") && {
      "Costume Type": brainTrainSelector(nft, "costumeType").toLowerCase(),
    }),
    type: brainTrainSelector(nft, "type")?.toLowerCase(),
    Location: isMissions && missionName(brainTrainSelector(nft, "title")).toLowerCase(),
  }
  const title = brainTrainSelector(nft, "title")
  const level = brainTrainSelector(nft, "level")
  let traits
  if ("traits" in nft.model.metadata) {
    traits = traitsPath.reduce((accum, trait) => {
      return {
        ...accum,
        [trait.trait_type]: trait.value.toLowerCase(),
      }
    }, baseTreats)
  } else {
    const modelMetadata = Object.entries(nft.model.metadata).reduce(
      (accum, [key, value]: [string, string]) => {
        accum[key] = value?.toString().toLowerCase() ?? ""
        return accum
      },
      {}
    )
    traits = {
      ...modelMetadata,
      ...baseTreats,
    }
  }
  if (!("rarity" in traits)) {
    traits.rarity = ENftRarity.COMMON
  }
  traits.name = title.toLowerCase()
  traits.type = convertNumber(brainTrainSelector(nft, "cardNumber")).toString()
  const isOpenEdition = String(brainTrainSelector(nft, "editionSize"))?.toLowerCase() === "open"
  const files = Array.isArray(nft?.model?.content?.files)
    ? nft?.model?.content?.files[0]
    : undefined
  if (!files) {
    console.log("test files inside convertor: ", nft)
  }
  return {
    id: nft.id,
    title: collection !== ENftCollection.GADGETS
      ? title
      : `${title} Level ${level}`,
    description: brainTrainSelector(nft, "description"),
    source: ENftSource.NIFTORY,
    imageUrl: {
      contentType: files?.contentType ?? "",
      thumbnailUrl: nft?.model?.content?.poster?.url ?? "",
      mediaURL: files?.url ?? "",
    },
    platform: brainTrainSelector(nft, "platform")?.toLowerCase(),
    series: convertNumber(brainTrainSelector(nft, "series")),
    rarity: brainTrainSelector(nft, "rarity")?.toLowerCase() || ENftRarity.COMMON,
    editionSize: convertNumber(brainTrainSelector(nft, "quantity")),
    edition: convertNumber(brainTrainSelector(nft, "serialNumber")),
    price: convertNumber(brainTrainSelector(nft, "price"), DEFAULT_NFT_PRICE),
    isBlocked: brainTrainSelector(nft, "isBlocked"),
    maxNftForUser: convertNumber(
      brainTrainSelector(nft, "maxNftForUser") || brainTrainSelector(nft, "quantity")
    ),
    isOpenEdition,
    traits,
    walletType,
    level,
    collection
  }
}

export const Convertor = {
  Blockchain: BlockChainConvertor,
  Niftory: NiftoryConvertor,
}
