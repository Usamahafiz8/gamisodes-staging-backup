import { EModelTypes } from "consts/const"
import Image from "next/image"
import { memo, PropsWithChildren, useMemo } from "react"
import { EErrorIdentity, NFTModelDetail } from "src/typings/NftModelDetail"
import MetaTags from "../general/MetaTags"
import useCheckout from "./checkout/CheckoutProvider"

const ERROR_MESSAGES = {
  [EErrorIdentity.NFT_LIMIT_REACHED]: "You reached the limit for this wallet",
  [EErrorIdentity.NO_PRICE]: "You should contact our administrator if you have this error",
}

const brain_train_links = [
  "/brain_train/Detective.webp",
  "/brain_train/Frenchman.webp",
  "/brain_train/Goat.webp",
  "/brain_train/Hotel-Waiter.webp",
  "/brain_train/Mechanic.webp",
  "/brain_train/Ninja.webp",
  "/brain_train/Pirate.webp",
  "/brain_train/Police-Officer.webp",
  "/brain_train/Scarecrow.webp",
]

export type INftModelDetail = PropsWithChildren & NFTModelDetail

const NFTModelDrop: React.FC<INftModelDetail> = function NFTModelDrop({ metadata, children }) {
  const { error } = useCheckout()

  const NFT_READY_TO_BUY =
    metadata.amount - metadata.quantityMinted > 0 ? metadata.amount - metadata.quantityMinted : 0
  const TOTAL_AVAILABLE =
    `${
      metadata?.editionSize !== "Open" && NFT_READY_TO_BUY < metadata.amount
        ? `${NFT_READY_TO_BUY} /`
        : ""
    }` +
    ` ${
      metadata?.editionSize && metadata?.editionSize === "Open"
        ? `Open Edition`
        : `${metadata?.amount} Remaining`
    }`

  const mainImage = metadata.content[0]

  const renderImage = useMemo(() => {
    switch (mainImage.contentType) {
      case "video/mp4":
        return (
          <video
            src={mainImage.contentUrl}
            loop
            muted
            playsInline
            autoPlay
            width={556}
            height={498}
            className="rounded-[32px]"
          />
        )
      case "image/png":
      default:
        if (metadata.type === EModelTypes.WRAPPER) {
          return <Image src="/product.png" alt="BrainTrain Product" width={556} height={498} />
        } else {
          return <Image alt="Product" src={mainImage.contentUrl} width={556} height={459} />
        }
    }
  }, [mainImage.contentType])
  return (
    <>
      <MetaTags.Product metadata={metadata} availableCount={NFT_READY_TO_BUY}>
        <meta property="og:image" content={metadata.content[0].contentUrl ?? ""} key="image" />
      </MetaTags.Product>
      <section className="flex flex-col justify-between min-w-screen w-full min-h-screen h-full p-7 pb-6 bg-header.opacity bg-[url('/homepage_BG.webp')] bg-cover relative -top-16 py-16">
        <div className="flex justify-center gap-5 items-center h-full flex-col lg:flex-row">
          <div className="z-10">{renderImage}</div>
          <div className="text-white font-bangers max-w-md flex flex-col justify-center">
            <div className="grid grid-cols-3 w-[232px] mb-2 gap-3">
              {metadata.type === EModelTypes.WRAPPER &&
                brain_train_links.map((val) => (
                  <Image key={val} src={val} alt="nft element" width={70} height={80} />
                ))}
            </div>
            <h1 className="uppercase leading-[61px] text-[56px] mb-2 md:mb-6"> {metadata.title}</h1>
            <p className="font-dosis text-lg mb-5">
              <strong className="mb-6 flex font-bold text-xl">{metadata.description}</strong>
              {TOTAL_AVAILABLE}
            </p>
            {metadata?.checkoutDisclaimer && (
              <>
                <p className="font-dosis text-lg mb-3">
                  <strong>Disclaimer:</strong> <i>{metadata.checkoutDisclaimer ?? ""}</i>
                </p>
              </>
            )}
            {typeof metadata?.price !== "undefined" && (
              <p className="font-dosis font-bold text-4xl mb-2">
                {metadata.price === 0 ? "Free" : `$${metadata?.price}`}
              </p>
            )}
            {error && (
              <>
                <p className="font-dosis text-lg mb-3">{ERROR_MESSAGES[error] ?? error ?? ""}</p>
              </>
            )}
            {children}
          </div>
        </div>
      </section>
    </>
  )
}

export default memo(NFTModelDrop)
