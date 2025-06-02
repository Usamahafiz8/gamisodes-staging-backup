import { WALLET_TYPE_SOURCE } from "consts/const"
import { useIsomorphicLayoutEffect } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"
import AppLayout from "src/components/AppLayout"
import CollectionWrapper from "src/components/collection/CollectionWrapper"
import NFTTypeStrategy from "src/components/collection/NFTTypeStrategy"
import { MetaTags } from "src/components/general/MetaTags"
import CustodialWalletGuard from "src/guard/CustodialWallet"
import WalletGuard from "src/guard/WalletGuard"
import useSafeBackToCollection from "src/hooks/useSafeBackToCollection"
import { INftStore, useNftsStore } from "src/store/nfts"
import { EGroupTypes } from "src/typings/EGroupTypes"
import { INft, WalletType } from "src/typings/INfts"
import { LoginSkeleton } from "src/ui/Skeleton"
import { shallow } from "zustand/shallow"

const getCollections = ({ allCollections, counter, isLoading }: INftStore) => ({
  allCollections,
  counter,
  isLoading,
})

function useNftCollectionParams() {
  const router = useRouter()
  const nftTitle: string = router.query["title"]?.toString()
  const nftRarity: string = router.query["rarity"]?.toString()
  const selectedCollection: string = router.query["collection"]?.toString()

  const nftId: string = router.query["nftId"]?.toString()
  const packageTitle: string = router.query["package-title"]?.toString()
  const packageID: string = router.query["package-id"]?.toString()
  const nftCollectionSourceType: EGroupTypes = router.query["type"]?.toString() as EGroupTypes

  return {
    nftId,
    nftTitle,
    selectedCollection,
    nftCollectionSourceType,
    packageTitle,
    packageID,
    nftRarity,
  }
}

const NFTDetailPage = () => {
  const { allCollections, counter, isLoading } = useNftsStore(getCollections, shallow)

  const {
    nftCollectionSourceType,
    nftId,
    nftTitle,
    selectedCollection,
    packageTitle,
    packageID,
    nftRarity,
  } = useNftCollectionParams()

  const nft: INft = useMemo(() => {
    const foundNFTById = allCollections[selectedCollection]?.find(({ id }) => {
      const isIDsEqual = id === nftId
      return isIDsEqual
    })
    if (foundNFTById) return foundNFTById
    return allCollections[selectedCollection]?.find(({ id, title, rarity }) => {
      const isNftMatched = title === nftTitle && rarity === nftRarity
      return isNftMatched
    })
  }, [allCollections, selectedCollection, nftId, nftTitle, isLoading])

  const packageNft: INft = useMemo(() => {
    if (packageTitle && packageID) {
      return allCollections[selectedCollection]?.find(
        ({ id, title, rarity }) =>
          id === packageID || (title === packageTitle && rarity === nftRarity)
      )
    }
  }, [allCollections, selectedCollection, packageTitle, packageID])

  const counterKey = useCallback(
    (nft: INft) => {
      const key = JSON.stringify({
        title: nft?.title,
        rarity: nft?.rarity,
      })
      return counter[selectedCollection]?.[key]
    },
    [nft, selectedCollection, counter, allCollections]
  )

  const handleBack = useSafeBackToCollection()

  useIsomorphicLayoutEffect(() => {
    if (!isLoading && !nft) {
      handleBack()
    }
  }, [nft?.id, isLoading])

  if (isLoading || !nft) {
    return <LoginSkeleton />
  }

  const title = `${nft?.title ?? "Your's idea with"} | Gamisodes`

  return (
    <>
      <MetaTags title={title} description={nft?.description ?? ""}>
        <meta property="og:image" content={nft?.imageUrl?.thumbnailUrl ?? ""} key="image" />
      </MetaTags>
      <AppLayout>
        <CollectionWrapper paddingBottom={false}>
          <NFTTypeStrategy
            nftCollectionSourceType={nftCollectionSourceType}
            nft={nft}
            counterKey={counterKey}
            packageNft={packageNft}
          />
        </CollectionWrapper>
      </AppLayout>
    </>
  )
}

function PromoNFTPage() {
  const search = useSearchParams()
  const walletTypeSource = search.get(WALLET_TYPE_SOURCE) as WalletType | null
  if (walletTypeSource === WalletType.Custodial) {
    return (
      <CustodialWalletGuard isActive>
        <NFTDetailPage />
      </CustodialWalletGuard>
    )
  } else if (walletTypeSource === WalletType.External) {
    return (
      <WalletGuard isActive>
        <NFTDetailPage />
      </WalletGuard>
    )
  }
  return <NFTDetailPage />
}

PromoNFTPage.requiredCustodialWallet = true
PromoNFTPage.requireAuth = true

export default PromoNFTPage
