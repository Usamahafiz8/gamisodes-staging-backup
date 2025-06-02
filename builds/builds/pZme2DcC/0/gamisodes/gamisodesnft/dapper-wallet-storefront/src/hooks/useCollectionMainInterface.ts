import { NftBlockchainState, NftsByWalletQuery } from "generated/graphql"
import { useEffect, useMemo } from "react"
import { Convertor } from "src/lib/Nfts/convertor"
import { ICollection } from "src/lib/flowConnector/types"
import { INftStore, useNftsStore } from "src/store/nfts"
import {
  IAllCollection,
  ICollectionMainInterface,
  INiftoryCollection,
} from "src/typings/CollectionMainInterface"
import { ENftCollection, INft, WalletType } from "src/typings/INfts"
import { enumToDefaultObject } from "src/utils/enumToDefaultObject"
import { shallow } from "zustand/shallow"

const setNftState = (state: INftStore) => state.setNfts

const DefaultConverter = (
  nfts: NftsByWalletQuery[],
  walletType: WalletType = WalletType.Custodial
) => {
  return (
    (nfts ?? [])
      //Union NFTs from all pages
      .reduce((accum, item) => {
        return [...accum, ...item.nftsByWallet.items]
      }, [])
      .map((nft) => Convertor.Niftory(nft, walletType))
  )
}

const ConvertStrategy = {
  Blockchain: (nfts: NftsByWalletQuery[]) => {
    return (nfts ?? []).map((nft: any) => Convertor.Blockchain(nft, WalletType.External))
  },
  Dapper: (nfts: NftsByWalletQuery[]) => {
    return (
      (nfts ?? [])
        //Union NFTs from all pages
        .reduce((accum, item) => {
          return [...accum, ...item.nftsByWallet.items]
        }, [])
        .filter((nft) =>
          [NftBlockchainState.Transferred, NftBlockchainState.Transferring].includes(
            nft.blockchainState
          )
        )
        .map((nft) => Convertor.Niftory(nft, WalletType.External))
    )
  },
  NiftoryCustodial: DefaultConverter,
  Magic: (nfts: NftsByWalletQuery[]) => {
    return DefaultConverter(nfts, WalletType.External)
  },
}

function ConvertArrayToSuccess(allWallets: ICollectionMainInterface) {
  return Object.values(allWallets).map((item: INiftoryCollection) => item?.isSuccess ?? false)
}

export function useCollectionMainInterface(allWallets: ICollectionMainInterface) {
  //Zustand setState
  const setNfts = useNftsStore(setNftState, shallow)

  const mems = useMemo(() => {
    const allSuccess = ConvertArrayToSuccess(allWallets)
    const allCollection = Object.values(allWallets).map(
      (item: any) => item?.collection ?? item?.items
    )
    return { allSuccess, allCollection, deps: JSON.stringify([...allCollection, ...allSuccess]) }
  }, [allWallets])

  const allCollectionsNew: IAllCollection = useMemo(() => {
    //Get data from Niftory

    //Convert each NFT to main type
    const nfts = Object.entries(allWallets).reduce((accum, [key, value]) => {
      const _value = value as INiftoryCollection
      const strategy = ConvertStrategy[key]
      const nfts = _value?.collection?.pages ?? (_value as unknown as ICollection)?.items ?? []
      return [...accum, ...strategy(nfts)]
    }, [])

    //Union NFTs to one array
    const allConvertedNfts = [...nfts]
    //Default object for next reducer
    const defaultSortedCollectionValue = enumToDefaultObject<
      Partial<{ [key in ENftCollection]: any }>
    >(ENftCollection, [] as INft[])
    //Sort NFTs by collection

    const sortedCollections = allConvertedNfts.reduce(
      (accum, nft) => ({ ...accum, [nft.collection]: [...(accum[nft.collection] ?? []), nft] }),
      defaultSortedCollectionValue
    )
    //Create counter for similar NFTs
    const defaultCounterKeys = Object.values(ENftCollection).reduce(
      (accum, item: string) => ({ ...accum, [item]: {} }),
      {}
    )
    const counter = defaultCounterKeys
    //Create object with collections of NFTs. Each similar NFT has been union
    const collections = defaultSortedCollectionValue

    //Fill the object by filtering NFTs by collection key and similar title key
    Object.keys(sortedCollections).forEach((collection) => {
      collections[collection] = sortedCollections[collection]
        .filter((nft) => {
          const val = JSON.stringify({
            title: nft?.title,
            rarity: nft?.rarity,
          })
          if (collection === ENftCollection.BRAIN_TRAIN && nft.editionSize === 1) {
            counter[collection][val] = {
              counter: 1,
              editions: [{ editionNumber: nft.edition, id: nft.id }],
              nfts: [nft],
            }
            return true
          }

          if (val in counter[collection]) {
            //count sum of similar NFT editions
            counter[collection][val].counter += 1
            //Combine ID`s of NFTs in one array to display on NFT personal page
            counter[collection][val].editions.push({ editionNumber: nft.edition, id: nft.id })
            counter[collection][val].nfts.push(nft)
            return false
          }

          counter[collection][val] = {
            counter: 1,
            editions: [{ editionNumber: nft.edition, id: nft.id }],
            nfts: [nft],
          }
          return true
        })
        //sort each collection NFTs by alphabet
        .sort((a, b) => {
          if (collection === ENftCollection.GADGETS)
            return a.title + a.level > b.title + b.level ? 1 : -1
          else return a.title > b.title ? 1 : -1
        })
    })

    return { collections, counter }
  }, [mems?.deps])

  //Send data to Zustand state
  useEffect(() => {
    if (mems.allCollection.some((isSuccess) => isSuccess)) {
      const { collections, counter } = allCollectionsNew
      setNfts({
        allCollections: collections,
        counter,
      })
    }
  }, [mems?.deps])
}
