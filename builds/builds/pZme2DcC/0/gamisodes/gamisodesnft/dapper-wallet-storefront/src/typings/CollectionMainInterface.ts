import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query"
import { NftsByWalletQuery } from "generated/graphql"
import { ICounter } from "src/store/nfts"
import {
  IGadgetNft,
  IGenesisNft,
  IMissionsNft,
  IBrainTrainNft,
  INft,
  ENftCollection,
} from "./INfts"

export interface IAllCollection {
  collections: {
    gadgets?: IGadgetNft[]
    genesis?: IGenesisNft[]
    missions?: IMissionsNft[]
    braintrain?: IBrainTrainNft[]
    gamisodes?: INft[]
    moments?: INft[]
  }
  counter: Partial<{
    [key in ENftCollection]: {
      [key: string]: ICounter
    }
  }>
}
export interface INiftoryCollection {
  collection: InfiniteData<NftsByWalletQuery>
  isSuccess: boolean
}
export interface ICollectionMainInterface {
  // Dapper: INiftoryCollection
  // NiftoryCustodial: INiftoryCollection
  // Magic?: INiftoryCollection
  [key: string]: INiftoryCollection | InfiniteData<any> | undefined
}
