import { CompositeSignature } from "@onflow/fcl"
import {
  CheckoutWithDapperWalletResponse,
  Nft,
  ReadyWalletMutation,
  RegisterWalletMutation,
  TransferNftToWalletMutation,
  VerifyWalletMutation,
} from "generated/graphql"
import { authApi } from "../api/baseApi"

interface ISuccessResponse<T> {
  data: T
  success: boolean
}

interface IPostVerifyWallet {
  signature: CompositeSignature[]
}

interface IPostCheckWalletOwner {
  loggedWithAddress: string
}

interface IPostSignTransactionRequest {
  transaction: string
}

interface IPostInitiateCheckoutRequest {
  nftModelId: string
}

interface IPostCompleteCheckoutRequest {
  transactionId: string
  nftDatabaseId: string
  nftModelId: string
}

export const WalletRequest = {
  async postReadyWallet() {
    return authApi
      .post<ISuccessResponse<ReadyWalletMutation>>("/server/wallet/ready")
      .then((val) => val.data)
  },
  async postRegisterWallet() {
    return authApi
      .post<ISuccessResponse<RegisterWalletMutation>>("/server/wallet/register")
      .then((val) => val.data)
  },
  async postVerifyWallet({ signature }: IPostVerifyWallet) {
    return authApi
      .post<ISuccessResponse<VerifyWalletMutation>>("/server/wallet/verify", {
        signedVerificationCode: signature,
      })
      .then((val) => val.data)
  },
  async postCheckWalletOwner({ loggedWithAddress }: IPostCheckWalletOwner) {
    return authApi
      .post("/server/wallet/checkOwner", {
        loggedWithAddress,
      })
      .then((val) => val.data)
  },

  async postSignTransaction({ transaction }: IPostSignTransactionRequest) {
    return authApi
      .post<ISuccessResponse<string>>("/server/wallet/signTransaction", {
        transaction,
      })
      .then((val) => val.data)
  },
  async postInitiateDapperCheckout({ nftModelId }: IPostInitiateCheckoutRequest) {
    return authApi
      .post<ISuccessResponse<CheckoutWithDapperWalletResponse>>(
        `/server/nft/${nftModelId}/initiateCheckout`
      )
      .then((val) => val.data)
  },
  async postInitiateFreeCheckout({ nftModelId }: IPostInitiateCheckoutRequest) {
    return authApi
      .post<ISuccessResponse<TransferNftToWalletMutation["transfer"]>>(
        `/server/nft/${nftModelId}/initiateCheckout`
      )
      .then((val) => val.data)
  },
  async postCompleteCheckout({
    nftModelId,
    nftDatabaseId,
    transactionId,
  }: IPostCompleteCheckoutRequest) {
    return authApi
      .post<ISuccessResponse<Nft>>(`/server/nft/${nftModelId}/completeCheckout`, {
        transactionId,
        nftDatabaseId,
      })
      .then((val) => val.data)
  },
}
