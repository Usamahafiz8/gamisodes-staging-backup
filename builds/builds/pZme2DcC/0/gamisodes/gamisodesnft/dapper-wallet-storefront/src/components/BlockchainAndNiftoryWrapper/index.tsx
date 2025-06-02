import { PropsWithChildren, useEffect } from "react"
import {
  useGetFromCustodialWallet,
  useGetFromMagicByNiftory,
  useGetFromNiftory,
} from "src/hooks/nftDB/useGetFromNiftory"
import { useCollectionMainInterface } from "src/hooks/useCollectionMainInterface"
import { useWalletContext } from "src/hooks/useWalletContext"
import { INftStore, useNftsStore } from "src/store/nfts"
import { getCurrentUser, useAuth } from "src/store/users"
import { filterCustodialCollectionUniqueItems } from "src/utils/custodialCollectionUniqueItems"
import { shallow } from "zustand/shallow"

const setNftState = (state: INftStore) => state.setLoading
const BlockchainCollections = {} as any

export const BlockchainAndNiftoryWrapper = ({ children }: PropsWithChildren) => {
  const { currentUser } = useWalletContext()
  const [user] = useAuth(getCurrentUser, shallow)

  const { isFetchingNextPage, data: niftoryCollections, isLoading, isSuccess } = useGetFromNiftory()

  const {
    isFetchingNextPage: isFetchingNextPageMagic,
    data: niftoryMagicCollections,
    isLoading: isLoadingMagic,
    isSuccess: isSuccessMagic,
  } = useGetFromMagicByNiftory()

  // const { data: BlockchainCollections } = useGetFromBlockchain()
  const {
    isFetchingNextPage: isFetchingNextPageCustodial,
    data: custodialCollection,
    isLoading: isLoadingCustodial,
    isSuccess: isSuccessCustodial,
  } = useGetFromCustodialWallet()
  const { newCustodialCollection } = filterCustodialCollectionUniqueItems(custodialCollection)

  const props = Object.assign(
    {
      Blockchain: BlockchainCollections,
      Dapper: {
        collection: niftoryCollections,
        isSuccess: isSuccess,
      },
      NiftoryCustodial: {
        collection: newCustodialCollection,
        isSuccess: isSuccessCustodial,
      },
    },
    user?.magicWallet
      ? {
        Magic: {
          collection: niftoryMagicCollections,
          isSuccess: isSuccessMagic,
        },
      }
      : {}
  )

  useCollectionMainInterface(props)

  const setLoading = useNftsStore(setNftState)
  useEffect(() => {
    let loadingStatus = true
    if (currentUser?.addr && user?.custodialWallet?.niftoryWalletId && user?.magicWallet?.address) {
      loadingStatus =
        // blockChainIsLoading ||
        // Dapper
        isLoading ||
        isFetchingNextPage ||
        // Custodial
        isFetchingNextPageCustodial ||
        isLoadingCustodial ||
        // Magic
        isFetchingNextPageMagic ||
        isLoadingMagic
    } else if (currentUser?.addr && user?.custodialWallet?.niftoryWalletId) {
      loadingStatus =
        // blockChainIsLoading ||
        // Dapper
        isLoading ||
        isFetchingNextPage ||
        // Custodial
        isFetchingNextPageCustodial ||
        isLoadingCustodial
    } else if (currentUser?.addr && !user?.custodialWallet?.niftoryWalletId) {
      loadingStatus = isLoading || isFetchingNextPage
      // loadingStatus = blockChainIsLoading || isLoading || isFetchingNextPage
    } else if (!currentUser?.addr && user?.custodialWallet?.niftoryWalletId) {
      loadingStatus = isFetchingNextPageCustodial || isLoadingCustodial
    }
    setLoading(loadingStatus)
  }, [
    user?.email,
    user?.magicWallet,
    currentUser,
    // blockChainIsLoading,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    isFetchingNextPageCustodial,
    isLoadingCustodial,
    isSuccessCustodial,
  ])

  return <>{children}</>
}
