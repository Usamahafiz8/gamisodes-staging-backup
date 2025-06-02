import { useMutation, useQuery, UseQueryOptions, useQueryClient } from "@tanstack/react-query"
import { getCurrentUser, useAuth } from "src/store/users"
import { shallow } from "zustand/shallow"
import { BlockchainRequest } from "./request"
import { useToast } from "@chakra-ui/react"

export const blockchainKeys = {
  all: ["blockchain"] as const,
  lists: (wallet: string) => [...blockchainKeys.all, "list", wallet] as const,
  niftoryList: (wallet: string) => [...blockchainKeys.all, "niftory", wallet] as const,
}

interface BlockchainGetListQueryVariables {
  wallet: string
}
type ISuccessResponseGetListReady = Awaited<ReturnType<typeof BlockchainRequest.getList>>
type IErrorsResponseGetList = unknown

export function useGetBlockchainNFT(
  variables: BlockchainGetListQueryVariables,
  options?: UseQueryOptions<ISuccessResponseGetListReady, IErrorsResponseGetList>
) {
  return useQuery<ISuccessResponseGetListReady, IErrorsResponseGetList>(
    blockchainKeys.lists(variables.wallet),
    () => BlockchainRequest.getList(variables.wallet),
    options
  )
}

interface MagicWalletBlockchainGetListQueryVariables {
  magicWalletAddress: string
}
type ISuccessResponseMagicWallet = Awaited<
  ReturnType<typeof BlockchainRequest.getMagicWalletNFTSFromBlockchain>
>
type IErrorsResponseMagicWallet = unknown

export function useGetMagicWalletNFTSFromBlockchain(
  variables: MagicWalletBlockchainGetListQueryVariables,
  options?: UseQueryOptions<ISuccessResponseMagicWallet, IErrorsResponseMagicWallet>
) {
  return useQuery<ISuccessResponseGetListReady, IErrorsResponseGetList>(
    blockchainKeys.lists(variables.magicWalletAddress),
    () => BlockchainRequest.getMagicWalletNFTSFromBlockchain(variables.magicWalletAddress),
    options
  )
}

interface BlockchainGetNiftoryListQueryVariables {
  dapperWallet: string
}
type ISuccessResponseGetNiftoryListReady = Awaited<
  ReturnType<typeof BlockchainRequest.getNiftoryNFTSFromDapper>
>
type IErrorsResponseGetNiftoryList = unknown

export function useGetNiftoryBlockchainNFT(
  variables: BlockchainGetNiftoryListQueryVariables,
  options?: UseQueryOptions<ISuccessResponseGetNiftoryListReady, IErrorsResponseGetNiftoryList>
) {
  return useQuery<ISuccessResponseGetNiftoryListReady, IErrorsResponseGetNiftoryList>(
    blockchainKeys.niftoryList(variables.dapperWallet),
    () => BlockchainRequest.getNiftoryNFTSFromDapper(variables.dapperWallet),
    options
  )
}

interface BlockchainTransferFromDapperToCustodialVariables {
  custodialWalletAddress: string
  nftsToMint: number
}
type ISuccessResponseTransferFromDapperToCustodial = Awaited<
  ReturnType<typeof BlockchainRequest.transferNFTFromDapperToCustodial>
>
interface IErrorsResponseTransferDapperToCustodial {
  errors: string[]
  success: boolean
}

export function useTransferFromDapperToCustodial() {
  const [user] = useAuth(getCurrentUser, shallow)
  const toast = useToast()
  const queryClient = useQueryClient()

  return useMutation<
    ISuccessResponseTransferFromDapperToCustodial,
    IErrorsResponseTransferDapperToCustodial,
    BlockchainTransferFromDapperToCustodialVariables
  >(
    blockchainKeys.niftoryList(user?.wallet?.address),
    ({ custodialWalletAddress, nftsToMint = 0 }) =>
      BlockchainRequest.transferNFTFromDapperToCustodial(custodialWalletAddress, nftsToMint),
    {
      onSuccess(_, { nftsToMint }) {
        toast({
          title: "Yay",
          description: `Your ${
            nftsToMint + 1
          } item(s) successfully transferred to your Gamisodes wallet. It may take up to 24 hours for your item(s) to appear in your Collection at Gamisodes.com.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        })
        queryClient.invalidateQueries({
          queryKey: blockchainKeys.niftoryList(user?.wallet?.address),
        })
      },
      onError(error) {
        console.error("Send this to administrator: ", error)
        toast({
          title: "Something went wrong!",
          description: "Please contact with our administrator!",
          status: "error",
          duration: 4000,
          isClosable: true,
        })
      },
    }
  )
}
