import { useEffect } from "react"
import { getAssignSuccessOpening, getClearState, useSuccessOpeningWrapper } from "src/components/collection/wrapper/NFTSuccessOpeningWrapper/useSuccessOpeningWrapper.store"
import { INftStore, useNftsStore } from "src/store/nfts"
import { shallow } from "zustand/shallow"

const setRemoveNftState = (state: INftStore) => state.setRemoveNft

function useRemoveWrapperFromStoreAfterTransfer() {
  const setRemoveNft = useNftsStore(setRemoveNftState, shallow)
  const [openingWrapperState] = useSuccessOpeningWrapper(getAssignSuccessOpening, shallow)
  const clearState = useSuccessOpeningWrapper(getClearState, shallow)

  useEffect(() => {
    if (openingWrapperState?.selectedNFTId && openingWrapperState?.selectedNFTTitle && openingWrapperState?.selectedNFTCollection) {
      setRemoveNft({
        id: openingWrapperState?.selectedNFTId,
        title: openingWrapperState?.selectedNFTTitle,
        collection: openingWrapperState?.selectedNFTCollection,
        rarity: openingWrapperState?.selectedNFTRarity,
      })
      clearState()
    }
  }, [openingWrapperState?.selectedNFTId, openingWrapperState?.selectedNFTTitle, openingWrapperState?.selectedNFTCollection, openingWrapperState?.selectedNFTRarity])
}
export default useRemoveWrapperFromStoreAfterTransfer
