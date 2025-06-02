import { useQueryClient } from "@tanstack/react-query"
import { fetchData } from "fetcher"
import { NftDocument, NftQuery, NftQueryVariables } from "generated/graphql"
import { useCallback } from "react"
import { Convertor } from "src/lib/Nfts/convertor"
import { WalletType } from "src/typings/INfts"

export const useGetNFTData = () => {
  const queryClient = useQueryClient()
  return useCallback(async (id) => {
    await queryClient.prefetchQuery(
      ["nft", { id }],
      fetchData<NftQuery, NftQueryVariables>(NftDocument, { id })
    )

    const data: NftQuery = await queryClient.getQueryData(["nft", { id }])

    return Convertor.Niftory(data.nft, WalletType.External)
  }, [])
}