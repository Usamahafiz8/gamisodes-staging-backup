import { useToast } from "@chakra-ui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useGetNFTData } from "src/hooks/useGetNFTData"
import { INftStore, useNftsStore } from "src/store/nfts"
import { msgByErrorCode } from "src/typings/NftModelDetail"
import { shallow } from "zustand/shallow"
import { IGetServerGroupByIdRequest, IPostOpenGroupNftRequest, IPostSingleNFTResponse, NftGroupsRequest } from "./request"

const setNewNftState = (state: INftStore) => state.setNewNft

export const NftGroupsKeys = {
  all: ["nftGroups"] as const,
  listOfGroup: () => [...NftGroupsKeys.all, "lists"] as const,
  specificGroup: (niftoryId: string) => [...NftGroupsKeys.all, "lists", niftoryId] as const,
}
type BaseError = AxiosError<{
  statusCode: number
  error: string
  message: string
}>

type ISuccessResponseGetNftGroupsQuery = Awaited<
  ReturnType<typeof NftGroupsRequest.getServerGroups>
>
type IErrorsResponseGetNftGroupsQuery = BaseError
export function useGetNftGroupsQuery() {
  return useQuery<ISuccessResponseGetNftGroupsQuery, IErrorsResponseGetNftGroupsQuery>(
    NftGroupsKeys.listOfGroup(),
    () => NftGroupsRequest.getServerGroups()
  )
}

type ISuccessResponseGetNftGroupQuery = Awaited<
  ReturnType<typeof NftGroupsRequest.getServerGroupById>
>

type IErrorsResponseGetNftGroupQuery = BaseError

export function useGetNftGroupQuery({ groupId }: IGetServerGroupByIdRequest) {
  return useQuery<ISuccessResponseGetNftGroupQuery, IErrorsResponseGetNftGroupQuery>(
    NftGroupsKeys.specificGroup(groupId),
    () => NftGroupsRequest.getServerGroupById({ groupId }),
    { enabled: !!groupId }
  )
}

type ISuccessResponseTransferNftGroupToMe = Awaited<
  ReturnType<typeof NftGroupsRequest.postOpenGroupNft>
>
export function useTransferNftGroupToMe({ groupId, niftoryId }: IPostOpenGroupNftRequest) {
  const getNftData = useGetNFTData()
  const setNewNfts = useNftsStore(setNewNftState, shallow)
  const toast = useToast()
  return useMutation<ISuccessResponseTransferNftGroupToMe, BaseError>(
    NftGroupsKeys.specificGroup(groupId),
    () => NftGroupsRequest.postOpenGroupNft({ groupId, niftoryId }),
    {
      async onSuccess(data) {
        const nftData = await getNftData(data.niftoryId)
        setNewNfts(nftData)
        const isWrapperKeepPackage =
          typeof data?.packaging !== "boolean" ? true : false
        if (isWrapperKeepPackage) {
          const nftPackageData = await getNftData((data?.packaging as IPostSingleNFTResponse)?.niftoryId)
          setNewNfts(nftPackageData)
        }
      },
      onError(error) {
        const responseFromServer = error?.response?.data?.message ?? undefined

        toast({
          title: "Something went wrong!",
          description: msgByErrorCode[responseFromServer],
          status: "error",
          duration: 4000,
          isClosable: true,
        })
      },
    }
  )
}
