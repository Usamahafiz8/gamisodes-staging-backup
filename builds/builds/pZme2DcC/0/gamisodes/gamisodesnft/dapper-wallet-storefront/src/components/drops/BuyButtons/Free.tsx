import { useMyWalletsQuery, WalletState } from "generated/graphql"
import { memo } from "react"
import { Loading } from "src/icon/Loading"
import { EAuthStatus, getAuthStatus, getCurrentUser, useAuth } from "src/store/users"
import { shallow } from "zustand/shallow"
import { IBuyButton, NftBuyButton, UnauthorizedStatus } from "."

const checkoutStatusMessages = ["", "Starting checkout...", "Purchase complete! Redirecting..."]

function FreeButton({ nftAvailableToBuy }: IBuyButton) {
  const [user] = useAuth(getCurrentUser, shallow)
  const { data: walletData } = useMyWalletsQuery(
    { walletId: user?.custodialWallet?.niftoryWalletId },
    {
      enabled: !!user?.custodialWallet?.niftoryWalletId,
      networkMode: "offlineFirst",
      refetchInterval(walletData, query) {
        const wallet = walletData?.walletById
        if (wallet?.state === WalletState.CreationFailed) return false
        else if (wallet?.state !== WalletState.Ready) {
          return 1000 * 60 * 1 // refetch each 1 minute
        }
        return false
      },
    }
  )

  const status = useAuth(getAuthStatus)

  const wallet = user?.custodialWallet?.niftoryWalletId && walletData?.walletById
  //If user authed via Google
  if (status === EAuthStatus.AUTHENTICATE) {
    if (wallet?.state === WalletState.Ready) {
      return (
        <NftBuyButton
          checkoutStatusMessages={checkoutStatusMessages}
          nftAvailableToBuy={nftAvailableToBuy}
        />
      )
    }
    else if (wallet?.state === WalletState.CreationFailed) {
      return (
        <>
          <p className="font-dosis text-lg mb-3">
            Creation of your wallet has failed. Please contact to administrator.
          </p>
        </>
      )
    }
    //If user authed via Google but didn't connect his wallet OR his wallet isn't configured to allow purchases
    else {
      return (
        <>
          <p className="font-dosis text-lg mb-3">
            To proceed with CHECKOUT, please wait till your custodial wallet is created. It's may
            take 5 minutes.
          </p>
        </>
      )
    }
  }
  //If user unauthed via Google
  else if (status === EAuthStatus.UNAUTHENTICATED) return <UnauthorizedStatus />

  return <Loading />
}

export default memo(FreeButton)
