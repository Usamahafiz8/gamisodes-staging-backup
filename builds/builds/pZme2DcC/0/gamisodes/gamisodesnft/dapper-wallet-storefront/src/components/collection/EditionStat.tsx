import React, { FC, memo, useMemo } from 'react'
import { INft } from 'src/typings/INfts'

interface IRenderEditionStat {
  counter: number,
  nft: INft
}

const RenderEditionStat: FC<IRenderEditionStat> = ({ counter, nft }) => {
  const nftEdition = useMemo(() => {
    if (counter <= 1) {
      if (typeof nft?.edition === "undefined") return "Edition: ~"
      else if (nft?.edition === 0) return "Transfer Initiated"
      else return `Edition: ${nft.edition}`
    }
    return "~"
  }, [nft?.edition, counter])

  if (counter > 1) {
    return (
      <>
        {nft?.isOpenEdition
          ? `${counter} Editions / Open`
          : `${counter} Editions / ${nft?.editionSize}`}
      </>
    )
  } else
    return (
      <>
        {nft?.isOpenEdition
          ? `${nftEdition} / Open`
          : `${nftEdition} / ${nft?.editionSize}`}
      </>
    )
}

export default memo(RenderEditionStat)
