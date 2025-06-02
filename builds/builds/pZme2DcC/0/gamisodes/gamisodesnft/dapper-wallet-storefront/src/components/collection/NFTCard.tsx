import Link from "next/link"
import { useMemo } from "react"
import { ICounter } from "src/store/nfts"
import { INft, WalletType } from "src/typings/INfts"
import Ellipsis from "src/ui/Ellipsis"

type NFTCard = { nft: INft; clickUrl: string; counter: ICounter }

export const NFTCard = ({ clickUrl, nft, counter }: NFTCard) => {
  const {
    title,
    editionSize,
    edition,
    rarity,
    isOpenEdition,
    imageUrl: { thumbnailUrl }
  } = nft
  const isCustodialWalletType = useMemo(() => counter?.nfts.some(({ walletType }) => walletType === WalletType.Custodial), [counter]);

  const renderEdition = useMemo(() => {
    const editionSiseNubmer = counter?.counter
    if (editionSiseNubmer > 1) {
      return (
        <>{isOpenEdition ? `${counter.counter} Editions / Open` : `${counter.counter} Editions / ${editionSize}`}</>
      )
    } else
      return (
        <>
          {isOpenEdition
            ? `Edition: ${edition ?? "~"} / Open`
            : `Edition: ${edition ?? "~"} / ${editionSize}`}
        </>
      )
  }, [])

  return (
    <Link className="flex" href={clickUrl}>
      <div className="flex relative flex-col bg-white h-full text-black max-w-xs md:max-w-[210px] p-4 rounded-lg transform-gpu transition-all hover:bg-gray-200 hover:border-purple hover:shadow-sm hover:-translate-y-1">
        {isCustodialWalletType && (
          <div className="absolute flex bg-gray-200/75 z-10 w-full left-0 top-0 px-3 py-1 justify-center text-sm rounded-t-lg">
            Gamisodes Wallet
            <div className="absolute w-2 h-2 bg-header top-1/3 right-3 rounded-full animate-ping" />
          </div>
        )}
        <div className="relative group flex-[4] flex items-center">
          <img
            className="object-contain w-full "
            src={thumbnailUrl}
            alt={title}
            draggable="false"
          />
        </div>
        <div className="flex flex-col h-full justify-between flex-1">
          <div className="mt-2 text-center font-dosis font-bold text-base">
            <Ellipsis lines={3} breakWord>
              {title}
            </Ellipsis>
          </div>
          <div className="mb-2 text-center font-dosis text-base">
            <Ellipsis lines={3} breakWord className="capitalize">
              {`Rarity: ${rarity}`}
            </Ellipsis>
          </div>
          <div className="flex justify-center mt-auto">
            <div className="flex w-fit font-dosis font-normal text-base text-center bg-header text-white py-1 px-2">
              <p>{renderEdition}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
