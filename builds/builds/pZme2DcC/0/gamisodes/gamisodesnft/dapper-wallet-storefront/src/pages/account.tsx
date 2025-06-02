import { useToast } from "@chakra-ui/react"
import { useWalletByIdQuery, WalletState } from "generated/graphql"
import { memo, useEffect } from "react"
import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"
import CustodialWallet from "src/components/wallet/CustodialWallet"
import NiftoryWalletComponent from "src/components/wallet/NiftoryWalletComponent"
import { WalletSetup } from "src/components/wallet/WalletSetup"
import img from "src/icon/android-chrome-192x192.png"
import { ComponentWithWallet } from "src/lib/types"
import { getCurrentUser, useAuth } from "src/store/users"
import { SectionHeader } from "src/ui/SectionHeader"
import { shallow } from "zustand/shallow"
import * as Sentry from "@sentry/nextjs";
import { SERVER_TAG, EServerType } from "src/lib/const"

const CustodialWalletWrapper = memo(function CustodialWalletWrapper() {
  const toast = useToast()
  const [user] = useAuth(getCurrentUser, shallow)
  const { data: walletData } = useWalletByIdQuery(
    { id: user?.custodialWallet?.niftoryWalletId },
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

  const custodialWallet = user?.custodialWallet

  useEffect(() => {
    if (walletData?.walletById?.state === WalletState.CreationFailed) {
      toast({
        title: "Something went wrong!",
        description: `Please, connect with administrator!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    }
  }, [walletData?.walletById?.state])

  if (custodialWallet) return <CustodialWallet walletData={walletData} />
  return <></>
})

const AccountPage = () => {
  const [user] = useAuth(getCurrentUser, shallow)
  if (SERVER_TAG === EServerType.PREPORD) {
    Sentry.setUser({ email: user?.email });
  }
  const name = user?.email

  const title = `${name}'s account | Gamisodes`

  return (
    <>
      <MetaTags title={title} />
      <AppLayout>
        <section className="mx-auto text-black flex flex-col items-center">
          <SectionHeader
            text={
              <section className="flex items-center space-x-5">
                {user?.image && (
                  <div>
                    <img
                      className="inline-block w-20 rounded-full ring-2 ring-white"
                      src={user?.image ? user?.image : img.src}
                    />
                  </div>
                )}
                {name && (
                  <p className="leading-[32px] text-[28px] lg:leading-[54px] lg:text-[48px]">
                    {name}'s account
                  </p>
                )}
              </section>
            }
          />
          <CustodialWalletWrapper />
          {user.magicWallet && (
            <NiftoryWalletComponent
              title="Marketplace Wallet:"
              walletAddress={user.magicWallet.address}
            />
          )}
          <WalletSetup />
        </section>
      </AppLayout>
    </>
  )
}

const MemoAccountPage: ComponentWithWallet = memo(AccountPage)

MemoAccountPage.requireAuth = true
export default MemoAccountPage
