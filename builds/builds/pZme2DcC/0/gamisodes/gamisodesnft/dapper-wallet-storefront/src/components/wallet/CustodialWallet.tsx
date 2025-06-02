import { WalletByIdQuery, WalletState } from "generated/graphql"
import { memo, useMemo } from "react"
import { useGetFromCustodialWallet } from "src/hooks/nftDB/useGetFromNiftory"
import { getCurrentUser, useAuth } from "src/store/users"
import { filterCustodialCollectionUniqueItems } from "src/utils/custodialCollectionUniqueItems"
import { shallow } from "zustand/shallow"

function CustodialWallet({ walletData }: { walletData: WalletByIdQuery }) {
  const [user] = useAuth(getCurrentUser, shallow)
  const {
    data: custodialCollection,
    isSuccess: isSuccessCustodial,
    isFetching,
  } = useGetFromCustodialWallet()

  const { custodialCollectionTotalCounter: counter } = filterCustodialCollectionUniqueItems(custodialCollection)

  return (
    <div className="border border-[#9500CA] p-6 flex content-between flex-wrap gap-4 max-w-screen-sm mb-4 mx-3 lg:mx-0 lg:w-[640px]">
      <div className="font-dosis font-bold">
        Gamisodes Wallet
        {isSuccessCustodial && (
          <span className="font-normal">
            {isFetching ? ": Loading..." : `: ${counter} Items total`}
          </span>
        )}
      </div>
      {!walletData?.walletById?.address && (
        <div className="min-w-full flex justify-between flex-col gap-1 lg:px-0 vpb-0 lg:flex-row lg:gap-4">
          <p>Account Number: </p>
          <p>
            <i>{user?.custodialWallet?.niftoryWalletId}</i>
          </p>
        </div>
      )}
      {walletData?.walletById?.state === WalletState.CreationFailed && (
        <p>There is problem with blockchain wallet`s creation. Please connect with administrator</p>
      )}
      {walletData?.walletById?.address && (
        <div className="min-w-full flex gap-1 justify-between flex-col lg:px-0 lg:pb-0 lg:flex-row lg:gap-4">
          <p>Flow address: </p>
          <p>
            <i>{walletData?.walletById?.address}</i>
          </p>
        </div>
      )}
    </div>
  )
}

export default memo(CustodialWallet)
