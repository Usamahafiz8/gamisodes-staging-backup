import { IFile } from "src/services/nftGroups/types"
import { EGroupTypes } from "src/typings/EGroupTypes"
import { INft } from "src/typings/INfts"

export interface IDetailsProps {
  nft: INft
  nftEditions: { counter: number; editions: { editionNumber: number; id: string }[] }
}

export interface IPackageProps extends IDetailsProps {
  packageNft: INft
  packageEditions: { counter: number; editions: { editionNumber: number; id: string }[] }
}

export interface INFTTypeStrategy {
  nftCollectionSourceType: EGroupTypes
  nft: INft
  counterKey: (nft: INft) => { counter: number; editions: { editionNumber: number; id: string }[] }
  packageNft?: INft
}

export interface IVideoModalWrapper {
  videoFileArrays: IFile[]
  successRedirectLink?: string
}

export interface ISelectedEditionToOpenFromWrapper {
  editionNumber: number
  id: string
}
