import cn from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { useCollectionFilter } from "src/hooks/useCollectionFilter"
import { Loading } from "src/icon/Loading"
import { useCollectionStore } from "src/store/collection"
import { INftStore, useNftsStore } from "src/store/nfts"
import { INft } from "src/typings/INfts"
import { collectionNftLinkCreator } from "src/utils/createSuccessRedirectToBoughtenNFT"
import { shallow } from "zustand/shallow"
import { CollectionFilter } from "../filter/CollectionFilter"
import { HorizontalFilter } from "../filter/HorizontalFilter"
import { NFTCard } from "./NFTCard"

const selector = ({ allCollections, counter, isLoading }: INftStore) => ({
  allCollections,
  counter,
  isLoading,
})
// const setSearch = (state) => state.setSearchInput
const getSelectedCollection = ({ selectedCollection, setCollection }) => ({
  selectedCollection,
  setCollection,
})

export const CollectionGrid = () => {
  const router = useRouter()
  const { allCollections, counter, isLoading } = useNftsStore(selector, shallow)
  const collection: string = router.query["collection"]?.toString()
  const { selectedCollection, setCollection } = useCollectionStore(getSelectedCollection)
  // const setSearchInput = useFilterSearchStore(setSearch, shallow)
  const [showFilter, setShowFilter] = useState(true)
  const { nfts, filter, setFilter } = useCollectionFilter(selectedCollection)

  useEffect(() => {
    setCollection(collection)
  }, [collection])

  const counterKey = useCallback(
    (nft: INft) => {
      const key = JSON.stringify({
        title: nft?.title,
        rarity: nft?.rarity,
      })

      return counter[selectedCollection][key]
    },
    [selectedCollection, counter]
  )

  if (isLoading) {
    return (
      <section className="flex flex-col items-center gap-2">
        <Loading />
        <div className="col-span-full text-2xl">Your collection is loading.</div>
        <div className="col-span-full text-2xl">
          Large collections could take up to a few minutes.
        </div>
      </section>
    )
  }

  if (allCollections?.[selectedCollection])
    return (
      <section className="grid grid-cols-12 gap-8 w-full max-w-[1280px]">
        <div className="col-span-12">
          <HorizontalFilter
            setShowFilter={setShowFilter}
            showFilter={showFilter}
            selectedCollection={selectedCollection}
          />
        </div>
        {showFilter && (
          <div className="lg:col-span-3 col-span-12">
            <CollectionFilter filter={filter} setFilter={setFilter} />
          </div>
        )}
        <div
          className={cn({ "lg:col-span-9 col-span-12": showFilter, "col-span-12": !showFilter })}
        >
          <div
            className={cn(
              "lg:min-w-[725px] grid gap-2 justify-items-center lg:gap-8 grid-cols-1 sm:grid-cols-2",
              `${showFilter ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-4 lg:grid-cols-5"}`
            )}
          >
            {!!nfts?.length ? (
              nfts.map((nft) => {
                const clickUrl = collectionNftLinkCreator({
                  collectionName: selectedCollection,
                  nftID: nft.id,
                  rarity: nft.rarity,
                  title: nft.title,
                  traits: nft.traits,
                })

                return (
                  <NFTCard key={nft.id} nft={nft} clickUrl={clickUrl} counter={counterKey(nft)} />
                )
              })
            ) : (
              <div className="col-span-full text-2xl">
                There are no collectibles to show from the "
                <span className="capitalize">{selectedCollection}</span>" Collection
              </div>
            )}
          </div>
        </div>
      </section>
    )

  return (
    <section className="flex flex-col gap-4">
      <section className="flex flex-col items-center gap-4">
        <h3 className="text-center text-xl">Your collection is empty. Start Collecting!</h3>
        <Link
          href={
            process.env.NODE_ENV === "development"
              ? `/drops/${process.env.NEXT_PUBLIC_DROP_ID}`
              : `https://gamisodes.com/pages/collections`
          }
        >
          <button className="uppercase w-fit font-dosis font-bold text-base p-2 px-5 text-white transition-colors bg-header hover:bg-purple">
            Go to Drops
          </button>
        </Link>
      </section>
    </section>
  )
}
