import { ENftCollection, ENftRarity } from "src/typings/INfts"
import { createWithEqualityFn } from "zustand/traditional"

export type SuccessOpeningWrapperState = {
  selectedNFTId?: string
  selectedNFTTitle?: string
  selectedNFTRarity?: ENftRarity
  selectedNFTCollection?: ENftCollection
}

const initValues: SuccessOpeningWrapperState = {
  selectedNFTId: undefined,
  selectedNFTTitle: undefined,
  selectedNFTRarity: undefined,
  selectedNFTCollection: undefined,
}

type SuccessOpeningWrapperAccessorState = {
  clearState: () => void
  assignNFT: (nft: SuccessOpeningWrapperState) => void
}

type CombinedState = SuccessOpeningWrapperState & SuccessOpeningWrapperAccessorState

export const useSuccessOpeningWrapper = createWithEqualityFn<CombinedState>(
  (set) => ({
    ...initValues,
    clearState: () => set(initValues),
    assignNFT: (nft) => set(nft),
  }),
  Object.is
)

export const getAssignSuccessOpening = (state: CombinedState) =>
  [
    {
      selectedNFTId: state.selectedNFTId,
      selectedNFTTitle: state.selectedNFTTitle,
      selectedNFTRarity: state.selectedNFTRarity,
      selectedNFTCollection: state.selectedNFTCollection,
    },
    state.assignNFT,
  ] as const
export const getClearState = (state: CombinedState) => state.clearState
