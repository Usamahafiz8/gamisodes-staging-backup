import { ENftCollection } from "src/typings/INfts"
import { createWithEqualityFn } from "zustand/traditional"

const defaultCollection = ENftCollection.GENESIS

interface ISelectedCollection {
  selectedCollection: ENftCollection
  setCollection: (arg: ENftCollection) => void
}
export const useCollectionStore = createWithEqualityFn<ISelectedCollection>(
  (set) => ({
    selectedCollection: defaultCollection,
    setCollection: (selectedCollection) => set(() => ({ selectedCollection })),
  }),
  Object.is
)
