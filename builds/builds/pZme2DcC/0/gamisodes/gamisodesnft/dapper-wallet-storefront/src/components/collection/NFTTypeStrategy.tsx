import React, { FC, memo } from "react"
import { EGroupTypes } from "src/typings/EGroupTypes"
import { INFTTypeStrategy } from "./interface"
import NFTDetail from "./NFTDetail"
import NFTWithPackageDetail from "./NFTWithPackageDetail"
import WrapperDetail from "./WrapperDetail"

const NFTTypeStrategy: FC<INFTTypeStrategy> = ({
  nftCollectionSourceType,
  nft,
  counterKey,
  packageNft,
}) => {
  if (
    nftCollectionSourceType === EGroupTypes.wrapper ||
    nftCollectionSourceType === EGroupTypes.wrapperKeep.toLowerCase()
  )
    return <WrapperDetail nft={nft} nftEditions={counterKey(nft)} />
  else if (nftCollectionSourceType === EGroupTypes.packaging && packageNft)
    return (
      <NFTWithPackageDetail
        nft={nft}
        nftEditions={counterKey(nft)}
        packageEditions={counterKey(packageNft)}
        packageNft={packageNft}
      />
    )
  else return <NFTDetail nft={nft} nftEditions={counterKey(nft)} />
}

export default memo(NFTTypeStrategy)
