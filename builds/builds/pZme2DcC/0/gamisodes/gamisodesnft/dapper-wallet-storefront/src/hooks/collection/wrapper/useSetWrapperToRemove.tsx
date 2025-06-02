import { useRouter } from "next/router"
import { useIsomorphicEffect } from "rooks"
import { getAssignSuccessOpening, useSuccessOpeningWrapper } from "src/components/collection/wrapper/NFTSuccessOpeningWrapper/useSuccessOpeningWrapper.store"
import { ENftCollection, ENftRarity } from "src/typings/INfts"
import { shallow } from "zustand/shallow"


type NFTSuccessRedirect = {
  transferIsSuccess: boolean
  successRedirectLink: string
  selectedNftId: string
  selectedNftTitle: string
  selectedNftRarity: ENftRarity
}

export function useSetWrapperToRemove({
  transferIsSuccess,
  successRedirectLink,
  selectedNftId,
  selectedNftRarity,
  selectedNftTitle,
}: NFTSuccessRedirect) {
  const router = useRouter()
  const selectedCollection: ENftCollection = router.query[
    "collection"
  ]?.toString() as ENftCollection

  const [_, setOpeningWrapperState] = useSuccessOpeningWrapper(getAssignSuccessOpening, shallow)

  useIsomorphicEffect(() => {
    if (transferIsSuccess && successRedirectLink.length > 0) {
      setOpeningWrapperState({
        selectedNFTRarity: selectedNftRarity,
        selectedNFTTitle: selectedNftTitle,
        selectedNFTId: selectedNftId,
        selectedNFTCollection: selectedCollection,
      })
    }
  }, [transferIsSuccess, successRedirectLink])
}