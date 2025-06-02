import { AppState, Auth0Provider } from "@auth0/auth0-react"
import { useRouter } from "next/router"
import { PropsWithChildren, memo, useCallback } from "react"

function Auth0Layout(props: PropsWithChildren) {
  const router = useRouter()
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
  const redirectUrl = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE

  const onRedirectCallback = useCallback((appState: AppState) => {
    router.replace(
      appState?.returnTo || redirectUrl || typeof window === "undefined"
        ? window.location.pathname
        : ""
    )
  }, [])

  return (
    <Auth0Provider
      cacheLocation="localstorage"
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience,
        redirect_uri: redirectUrl,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {props?.children}
    </Auth0Provider>
  )
}

export default memo(Auth0Layout)
