import { useRouter } from "next/router"
import { FC, memo } from "react"
import useRemoveWrapperFromStoreAfterTransfer from "src/hooks/collection/wrapper/useRemoveWrapperFromStoreAfterTransfer"
import GoGoBack from "./GoGoBack"
import { IPackageProps } from "./interface"
import NFTDetailWrapper from "./wrapper/NFTDetailWrapper"

const NFTWithPackageDetail: FC<IPackageProps> = ({
  nft,
  nftEditions,
  packageNft,
  packageEditions,
}) => {
  const router = useRouter()
  const newNftEdition: string = router.query["edition"]?.toString()
  useRemoveWrapperFromStoreAfterTransfer()

  return (
    <section className="h-auto sm:h-full py-4 lg:py-24">
      <div className="flex flex-col gap-y-4 sm:h-full h-auto">
        <div className="space-x-12 w-full ">
          <GoGoBack />
        </div>
        <NFTDetailWrapper nft={nft} nftEditions={nftEditions} newNftEdition={newNftEdition} />
        <NFTDetailWrapper
          nft={packageNft}
          nftEditions={packageEditions}
          newNftEdition={newNftEdition}
          secondUseOnPage
        />
      </div>
    </section>
  )
}

export default memo(NFTWithPackageDetail)
