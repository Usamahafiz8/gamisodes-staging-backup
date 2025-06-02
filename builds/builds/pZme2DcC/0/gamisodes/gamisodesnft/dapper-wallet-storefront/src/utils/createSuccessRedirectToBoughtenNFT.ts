import { WALLET_TYPE_SOURCE } from "consts/const"
import { EGroupTypes } from "src/typings/EGroupTypes"
import { ENftRarity, WalletType } from "src/typings/INfts"

type ICreateSuccessRedirectToBoughtNFT = {
  collectionName: string
  nftID: string
  /**
   * @todo need to be required in a future
   */
  nftCollectionSourceType?: EGroupTypes
  title: string
  rarity: ENftRarity
  edition?: number
  walletTypeSource?: WalletType
  packageID?: string
  packageTitle?: string
  packageEdition?: number
}
export function createSuccessRedirectToBoughtenNFT({
  collectionName,
  nftCollectionSourceType,
  nftID,
  walletTypeSource,
  edition,
  title,
  rarity,
  packageID,
  packageTitle,
  packageEdition,
}: ICreateSuccessRedirectToBoughtNFT) {
  const params = new URLSearchParams()

  if (nftCollectionSourceType) params.set("type", nftCollectionSourceType)
  if (walletTypeSource) params.set(WALLET_TYPE_SOURCE, walletTypeSource)
  if (edition) params.set("edition", `${edition}`)
  if (title) params.set("title", `${title}`)
  if (rarity) params.set("rarity", `${rarity.toLowerCase()}`)
  if (packageID) params.set("package-id", `${packageID}`)
  if (packageTitle) params.set("package-title", `${packageTitle}`)
  if (packageEdition) params.set("package-edition", `${packageEdition}`)

  return `/collection/${collectionName}/${nftID}?${params}`
}

type ILinkCreatorArgs = Pick<
  ICreateSuccessRedirectToBoughtNFT,
  "collectionName" | "nftID" | "title" | "rarity"
> & {
  traits: any
}
export function collectionNftLinkCreator(args: ILinkCreatorArgs) {
  return createSuccessRedirectToBoughtenNFT({
    nftID: args?.nftID,
    rarity: args?.rarity,
    title: args?.title,
    collectionName: args?.collectionName,
    nftCollectionSourceType: args?.traits?.groupType,
  })
}
