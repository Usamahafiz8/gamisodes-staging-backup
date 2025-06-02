import { InfiniteData } from "@tanstack/react-query";
import { NftsByWalletQuery } from "generated/graphql";

export function filterCustodialCollectionUniqueItems(custodialCollection: InfiniteData<NftsByWalletQuery>) {
  let newOneLineArray = []
  custodialCollection?.pages?.forEach((page) => {
    newOneLineArray = [...newOneLineArray, ...page.nftsByWallet.items]
  })
  let uniqueObjectsArray = newOneLineArray.filter((obj, index, self) =>
    index === self.findIndex((t) => (
      t.id === obj.id
    ))
  );
  const newCustodialCollection = {
    pages: [{ nftsByWallet: { items: uniqueObjectsArray } }],
    pageParams: custodialCollection?.pageParams
  }
  return { newCustodialCollection, custodialCollectionTotalCounter: uniqueObjectsArray.length }
}
