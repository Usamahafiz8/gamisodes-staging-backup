import classNames from "classnames"
import { FC, memo } from "react"
import { INft } from "src/typings/INfts"
import Gallery from "src/ui/Content/Gallery/Gallery"
import RenderEditionStat from "../EditionStat"
import RenderEditionsList from "../EditionsList"

interface INFTDetailWrapper {
  nft: INft
  nftEditions: { counter: number; editions: { editionNumber: number; id: string }[] }
  newNftEdition: string
  secondUseOnPage?: boolean
}

const NFTDetailWrapper: FC<INFTDetailWrapper> = ({
  nft,
  nftEditions,
  newNftEdition,
  secondUseOnPage = false,
}) => {
  return (
    <>
      <div
        className={classNames(
          "flex h-auto sm:h-full flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-16",
          `${!secondUseOnPage && "pb-8"}`
        )}
      >
        <div
          className={classNames(
            "flex justify-center sm:min-w-[384px] lg:max-w-sm space-x-6 lg:space-x-8 p-8 rounded bg-white text-black font-dosis",
            `${secondUseOnPage && "order-last"}`
          )}
        >
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
                {nftEditions?.counter > 1 && (
                  <RenderEditionsList
                    nftEditions={nftEditions}
                    checkedNftEditionValue={+newNftEdition}
                    activeColor="bg-amber-400"
                  />
                )}
              </div>
              <div className="pt-2 text-lg">
                <p>
                  <span className="text-xl font-bold">Collection</span> :{" "}
                  <span className="capitalize">{nft?.collection}</span>
                </p>
                <p>
                  <span className="text-xl font-bold">Rarity</span> :{" "}
                  <span className="capitalize">{nft?.rarity}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Gallery nft={nft} />
      </div>
    </>
  )
}

export default memo(NFTDetailWrapper)
