import { useMyWalletsQuery, WalletState } from "generated/graphql"
import Link from "next/link"
import { memo } from "react"
import { useWalletContext } from "src/hooks/useWalletContext"
import { Loading } from "src/icon/Loading"
import { EAuthStatus, getAuthStatus, useAuth } from "src/store/users"
import Button from "src/ui/Button"
import { IBuyButton, NftBuyButton, UnauthorizedStatus } from "."

const checkoutStatusMessages = [
  "",
  "Starting checkout...",
  "Waiting for transaction approval...",
  "Waiting for transaction completion...",
  "Completing checkout...",
  "Purchase complete! Redirecting...",
]

function BuyButton({ nftAvailableToBuy }: IBuyButton) {
  const { currentUser } = useWalletContext()
  const { data: walletData } = useMyWalletsQuery(
    { address: currentUser?.addr },
    { enabled: !!currentUser?.addr, networkMode: "offlineFirst" }
  )
  const status = useAuth(getAuthStatus)

  const wallet = currentUser?.addr && walletData?.walletByAddress

  //If user authed via Google
  if (status === EAuthStatus.AUTHENTICATE) {
    //If user authed via Google and Blockchain
    if (currentUser?.addr && wallet?.state === WalletState.Ready) {
      return (
        <NftBuyButton
          checkoutStatusMessages={checkoutStatusMessages}
          nftAvailableToBuy={nftAvailableToBuy}
        />
      )
    }
    //If user authed via Google but didn't connect his wallet OR his wallet isn't configured to allow purchases
    else if (currentUser?.addr === null || (wallet && wallet?.state !== WalletState.Ready)) {
      return (
        <>
          <p className="font-dosis text-lg mb-3">
            To proceed with CHECKOUT, please connect your Dapper digital collectibles wallet. If
            you’ve already connected your wallet, please refresh this page.
          </p>
          <Link href={"/account"}>
            <Button>Connect Wallet</Button>
          </Link>
        </>
      )
    }
  }
  //If user unauthed via Google
  else if (status === EAuthStatus.UNAUTHENTICATED) return <UnauthorizedStatus />

  return <Loading />
}

export default memo(BuyButton)
