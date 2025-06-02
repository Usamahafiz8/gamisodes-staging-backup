import { useRouter } from "next/router"
import { memo } from "react"
import useRemoveWrapperFromStoreAfterTransfer from "src/hooks/collection/wrapper/useRemoveWrapperFromStoreAfterTransfer"
import GoGoBack from "./GoGoBack"
import { IDetailsProps } from "./interface"
import NFTDetailWrapper from "./wrapper/NFTDetailWrapper"
export interface ITraits {
  costumeType: string
  "Background Color": string
  "Background Pattern": string
  Outfit: string
  Coms: string
  Eyes: string
  "Head Piece": string
  Mouth: string
}

interface ITraitsProps {
  traits: ITraits
}

const TraitsBlock = ({ traits }: ITraitsProps) => {
  return (
    <div className="pt-2 text-lg">
      {Object.entries(traits).map(([key, val]) => {
        if (key === "costumeType") return
        return (
          <p key={val}>
            <span className="text-xl font-bold">{key}</span> : <span>{val}</span>
          </p>
        )
      })}
      {traits["costumeType"] && (
        <p>
          <span className="text-xl font-bold">Costume Type</span> :{" "}
          <span>{traits.costumeType}</span>
        </p>
      )}
      {/* {traits["costumeType"] && (
        <p>
          <span className="text-xl font-bold">Costume Type</span> :{" "}
          <span>{traits.costumeType}</span>
        </p>
      )}
      {traits["Head Piece"] && (
        <p>
          <span className="text-xl font-bold">Head Piece</span> :{" "}
          <span>{traits["Head Piece"]}</span>
        </p>
      )}
      {traits["Eyes"] && (
        <p>
          <span className="text-xl font-bold">Eyes</span> : <span>{traits["Eyes"]}</span>
        </p>
      )}
      {traits["Mouth"] && (
        <p>
          <span className="text-xl font-bold">Mouth</span> : <span>{traits["Mouth"]}</span>
        </p>
      )}
      {traits["Coms"] && (
        <p>
          <span className="text-xl font-bold">Coms</span> : <span>{traits["Coms"]}</span>
        </p>
      )}
      {traits["Outfit"] && (
        <p>
          <span className="text-xl font-bold">Outfit</span> : <span>{traits["Outfit"]}</span>
        </p>
      )}
      {traits["Background Color"] && (
        <p>
          <span className="text-xl font-bold">Background Color</span> :{" "}
          <span>{traits["Background Color"]}</span>
        </p>
      )}
      {traits["Background Pattern"] && (
        <p>
          <span className="text-xl font-bold">Background Pattern</span> :{" "}
          <span>{traits["Background Pattern"]}</span>
        </p>
      )} */}
    </div>
  )
}

const NFTDetail = (props: IDetailsProps) => {
  const { nft, nftEditions } = props
  const router = useRouter()
  const newNftEdition: string = router.query["edition"]?.toString()

  useRemoveWrapperFromStoreAfterTransfer()

  // const traits: ITraits | undefined = useMemo(() => {
  //   const setAttributes = nftModel?.set?.attributes ?? {}
  //   if (setAttributes?.type === ESetAttribute.TICKET)
  //     return (
  //       product.attributes?.traits?.reduce((acc, { trait_type, value }) => {
  //         return { ...acc, [trait_type]: value }
  //       }, {} as ITraits) ?? undefined
  //     )
  //   return undefined
  // }, [nft?.id])

  return (
    <section className="h-auto sm:h-full py-4 lg:py-24">
      <div className="flex flex-col gap-y-4 sm:h-full h-auto">
        <div className="space-x-12 w-full ">
          <GoGoBack />
        </div>
        <NFTDetailWrapper nft={nft} nftEditions={nftEditions} newNftEdition={newNftEdition} />
      </div>
    </section>
  )
}

export default memo(NFTDetail)
