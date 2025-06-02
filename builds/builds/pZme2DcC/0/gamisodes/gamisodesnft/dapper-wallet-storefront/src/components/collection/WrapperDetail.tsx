import { useRouter } from "next/router"
import { FC, memo, useCallback, useMemo, useState } from "react"
import { useGetNftGroupQuery, useTransferNftGroupToMe } from "src/services/nftGroups/hooks"
import { IPostSingleNFTResponse } from "src/services/nftGroups/request"
import { EGroupTypes } from "src/typings/EGroupTypes"
import { ENftCollection, WalletType } from "src/typings/INfts"
import Gallery from "src/ui/Content/Gallery/Gallery"
import { LoginSkeleton } from "src/ui/Skeleton"
import { createSuccessRedirectToBoughtenNFT } from "src/utils/createSuccessRedirectToBoughtenNFT"
import RenderEditionsList from "./EditionsList"
import RenderEditionStat from "./EditionStat"
import GoGoBack from "./GoGoBack"
import { IDetailsProps, ISelectedEditionToOpenFromWrapper } from "./interface"

import { useSetWrapperToRemove } from "src/hooks/collection/wrapper/useSetWrapperToRemove"
import VideoModalWrapper from "./wrapper/VideoModalWrapper"
import WrapperGatewayButton from "./wrapper/WrapperGatewayButton"

const WrapperDetail: FC<IDetailsProps> = ({ nft, nftEditions }) => {
  const { data: groupData } = useGetNftGroupQuery({
    groupId: nft?.traits?.groupId,
  })

  const router = useRouter()
  const selectedCollection: ENftCollection = router.query[
    "collection"
  ]?.toString() as ENftCollection

  const [selectedEdition, setSelectedEdition] = useState<ISelectedEditionToOpenFromWrapper>(() =>
    nftEditions?.counter === 1
      ? { editionNumber: nftEditions?.editions[0]?.editionNumber, id: nftEditions?.editions[0]?.id }
      : { editionNumber: null, id: "" }
  )
  const {
    mutate: transferNftGroupToMe,
    isLoading: transferIsLoading,
    isSuccess: transferIsSuccess,
    data: responseTransferNftGroupToMe,
  } = useTransferNftGroupToMe({ groupId: nft?.traits?.groupId, niftoryId: selectedEdition?.id })

  const successRedirectLink = useMemo(() => {
    const isWrapperKeepPackage =
      typeof responseTransferNftGroupToMe?.packaging !== "boolean" ? true : false

    let successOptions = {
      nftCollectionSourceType: undefined,
      packageID: undefined,
      packageTitle: undefined,
    }
    if (isWrapperKeepPackage) {
      const packaging = responseTransferNftGroupToMe?.packaging as IPostSingleNFTResponse
      successOptions = {
        nftCollectionSourceType: EGroupTypes.packaging,
        packageID: packaging?.id,
        packageTitle: packaging?.title,
      }
    }

    if (transferIsSuccess)
      return createSuccessRedirectToBoughtenNFT({
        collectionName: selectedCollection,
        nftID: responseTransferNftGroupToMe?.niftoryId,
        title: responseTransferNftGroupToMe?.title,
        rarity: responseTransferNftGroupToMe?.rarity,
        edition: responseTransferNftGroupToMe?.serialNumber,
        walletTypeSource: WalletType.Custodial,
        ...successOptions,
      })
    return ""
  }, [transferIsSuccess])

  const openWrapper = useCallback(() => {
    if (selectedEdition?.editionNumber !== null) {
      transferNftGroupToMe()
    }
  }, [selectedEdition])

  const renderEditionsListCallBack = useCallback((_, edition) => setSelectedEdition(edition), [])

  useSetWrapperToRemove({
    transferIsSuccess,
    successRedirectLink,
    selectedNftId: selectedEdition?.id,
    selectedNftRarity: nft?.rarity,
    selectedNftTitle: nft?.title,
  })

  if (!!groupData?.id)
    return (
      <section className="h-auto sm:h-full py-4 lg:py-24">
        <div className="flex flex-col gap-y-4 sm:h-full h-auto">
          <div className="space-x-12 w-full ">
            <GoGoBack />
          </div>
          <div className="flex h-auto sm:h-full flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-16">
            <div className="flex justify-center sm:min-w-[384px] lg:max-w-sm space-x-6 lg:space-x-8 p-8 rounded bg-white text-black font-dosis">
              <div className="space-y-3 md:space-y-6 font-normal text-xl">
                <div className="space-y-3">
                  <h3 className="text-5xl font-bold">{nft?.title}</h3>
                </div>
                <p>{nft?.description}</p>
                <div className="pt-6">
                  <div className="flex w-fit font-dosis font-normal text-xl text-center bg-header text-white py-1 px-6">
                    <RenderEditionStat counter={nftEditions?.counter} nft={nft} />
                  </div>
                  <div className="flex flex-wrap gap-3 py-3">
                    {nftEditions?.counter > 1 && !transferIsSuccess && (
                      <RenderEditionsList
                        nftEditions={nftEditions}
                        transferIsLoading={transferIsLoading}
                        checkedNftEditionValue={selectedEdition.editionNumber}
                        onClick={renderEditionsListCallBack}
                        activeColor="bg-lime-500"
                      />
                    )}
                  </div>
                  <WrapperGatewayButton
                    successRedirectLink={successRedirectLink}
                    transferIsLoading={transferIsLoading}
                    transferIsSuccess={transferIsSuccess}
                    unPackagingDate={groupData?.unpackagingDate}
                    nftEditionsCounter={nftEditions?.counter}
                    openWrapper={openWrapper}
                    selectedEditionNumber={selectedEdition?.editionNumber}
                  />
                </div>
              </div>
            </div>
            <div className={"flex content-center"}>
              <Gallery nft={nft} />
            </div>
            {transferIsSuccess && (
              <VideoModalWrapper
                videoFileArrays={responseTransferNftGroupToMe?.files}
                successRedirectLink={successRedirectLink}
              />
            )}
          </div>
        </div>
      </section>
    )

  return (
    <div className="fixed top-0 left-0 w-full h-full z-30">
      <LoginSkeleton width="100vw" />
    </div>
  )
}

export default memo(WrapperDetail)
