import { ENftCollection, ENftRarity, INft } from "src/typings/INfts"
import { createWithEqualityFn } from "zustand/traditional"

export interface ICounter {
  counter: number
  editions: {
    editionNumber: number
    id: string
  }[]
  nfts: INft[]
}
interface CollectionProps {
  isLoading?: boolean
  allCollections: { [key: string]: INft[] }
  counter: {
    [key in ENftCollection]?: {
      [key: string]: ICounter
    }
  }
}

interface IRemoveNFT {
  id: string
  title: string
  rarity: ENftRarity
  collection: ENftCollection
}

export interface INftStore extends CollectionProps {
  setNfts: (arg: CollectionProps) => void
  setNewNft: (arg: INft) => void
  setRemoveNft: (arg: IRemoveNFT) => void
  setLoading: (arg: boolean) => void
}

export const useNftsStore = createWithEqualityFn<INftStore>(
  (set, get) => ({
    allCollections: {},
    counter: {},
    isLoading: false,
    setNfts: ({ allCollections, counter }) =>
      set(() => ({
        allCollections,
        counter,
      })),
    setNewNft: (nft: INft) => {
      const { allCollections, counter } = get()
      const val = JSON.stringify({ title: nft.title, rarity: nft.rarity })

      // if has NFT
      if (
        allCollections[nft.collection].some(
          ({ title, rarity }) => title === nft.title && rarity === nft.rarity
        )
      ) {
        const newCounter = structuredClone(counter)
        newCounter[nft.collection][val].counter += 1
        newCounter[nft.collection][val].editions.push({ editionNumber: nft.edition, id: nft.id })
        newCounter[nft.collection][val].nfts.push(nft)
        set(() => ({
          allCollections,
          counter: newCounter,
        }))
      } else {
        const newAllCollection = structuredClone(allCollections)
        newAllCollection[nft.collection].push(nft)
        const newCounter = structuredClone(counter)
        newCounter[nft.collection][val] = {
          counter: 1,
          editions: [{ editionNumber: nft.edition, id: nft.id }],
          nfts: [nft],
        }
        set(() => ({
          allCollections: newAllCollection,
          counter: newCounter,
        }))
      }
    },
    setRemoveNft: (data: IRemoveNFT) => {
      const { allCollections, counter } = get()
      const val = JSON.stringify({ title: data.title, rarity: data.rarity })
      const idxInCounter = counter![data?.collection]![val]?.editions?.findIndex(
        ({ id }) => id === data?.id
      )
      const idxInCounterNfts = counter![data?.collection]![val]?.nfts?.findIndex(
        ({ id }) => id === data?.id
      )
      const idxInAllCollections = allCollections![data?.collection]?.findIndex(
        ({ title, rarity }) => title === data?.title && rarity === data?.rarity
      )
      if (idxInAllCollections >= 0 && idxInCounter >= 0) {
        if (counter![data?.collection]![val]?.counter > 1) {
          const newCounter = structuredClone(counter)
          newCounter[data?.collection][val].counter -= 1
          newCounter![data?.collection]![val]?.editions?.splice(idxInCounter, 1)
          newCounter![data?.collection]![val]?.nfts?.splice(idxInCounterNfts, 1)
          set(() => ({
            allCollections,
            counter: newCounter,
          }))
        } else {
          const newAllCollection = structuredClone(allCollections)
          newAllCollection[data.collection].splice(idxInAllCollections, 1)
          const newCounter = structuredClone(counter)
          delete newCounter![data.collection]![val]
          set(() => ({
            allCollections: newAllCollection,
            counter: newCounter,
          }))
        }
      }
    },
    setLoading: (isLoading) => set({ isLoading }),
  }),
  Object.is
)
