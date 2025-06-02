import { ChakraProvider } from "@chakra-ui/react"
import { AppProps as NextAppProps } from "next/app"
import { WalletProvider } from "src/components/wallet/WalletProvider"
import { ComponentWithWallet } from "src/lib/types"
import "../styles/global.css"

import { Session } from "next-auth"
import { GoogleAnalytics } from "nextjs-google-analytics"
import Auth0Layout from "src/components/Auth0Layout"
import { BlockchainAndNiftoryWrapper } from "src/components/BlockchainAndNiftoryWrapper"
import RouterHistory from "src/components/RouterHistory"
import AuthSessionProvider from "src/components/auth/AuthSessionProvider"
import AuthGuard from "src/guard/AuthGuard"
import CustodialWalletGuard from "src/guard/CustodialWallet"
import WalletGuard from "src/guard/WalletGuard"
import usePWA from "src/hooks/usePWA"
import { useScrollRestoration } from "src/hooks/useScrollRestoration"
import { ReactQueryProvider } from "src/lib/ReactQueryClientProvider"
import theme from "src/lib/chakra-theme"

type AppProps<P = { session: Session; dehydratedState?: unknown }> = NextAppProps<P> & {
  Component: ComponentWithWallet
}

const App = ({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps): JSX.Element => {
  useScrollRestoration()
  usePWA()

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <RouterHistory>
      <ReactQueryProvider state={dehydratedState}>
        <Auth0Layout>
          <AuthSessionProvider>
            <ChakraProvider theme={theme}>
              <WalletProvider>
                <BlockchainAndNiftoryWrapper>
                  <AuthGuard isActive={Component.requireAuth}>
                    <WalletGuard isActive={Component.requireWallet}>
                      <CustodialWalletGuard isActive={Component.requiredCustodialWallet}>
                        {getLayout(<Component {...pageProps} />)}
                      </CustodialWalletGuard>
                    </WalletGuard>
                  </AuthGuard>
                </BlockchainAndNiftoryWrapper>
              </WalletProvider>
            </ChakraProvider>
          </AuthSessionProvider>
        </Auth0Layout>
      </ReactQueryProvider>
      <GoogleAnalytics trackPageViews />
    </RouterHistory>
  )
}

export default App
