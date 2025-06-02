import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { getCurrentUser, useAuth } from "src/store/users"
import { shallow } from "zustand/shallow"
import { authApi } from "../api/baseApi"
import { AuthRequest, IPostMailAuthLink } from "./request"

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
  mail: (nftModel?: string) => [...authKeys.all, "email", nftModel] as const,
}
type BaseError = {
  errors: string[]
  success: boolean
}

type IUseGetMyAuthStatus = {
  enabled?: boolean
}
export function useGetMyAuthStatus({ enabled = true }: IUseGetMyAuthStatus) {
  const auth0 = useAuth0()
  const [currentUser, setAuthData] = useAuth(getCurrentUser, shallow)
  const query = useQuery(authKeys.me(), AuthRequest.getMyAuthStatus, {
    enabled: false,
    placeholderData() {
      if (currentUser) return currentUser
      return undefined
    },
    refetchInterval() {
      return !currentUser ? false : 1 * 60 * 1000
    },
  })
  useEffect(() => {
    if (query.isFetched || query.isSuccess) {
      setAuthData(query?.data)
    }
  }, [query.isFetched, query.isSuccess])

  useEffect(() => {
    if (auth0.isLoading) return

    if (auth0.isAuthenticated) {
      const requestInterceptor = authApi.interceptors.request.use(async (config) => {
        const token = await auth0.getAccessTokenSilently()

        return {
          ...config,
          headers: { ...config.headers, Authorization: `Bearer ${token}` },
        } as any
      })
      query.refetch()
      return () => {
        authApi.interceptors.request.eject(requestInterceptor)
      }
    }
    query.refetch()
  }, [auth0.isLoading, auth0.isAuthenticated])

  return query
}

type ISuccessResponseAuthMailAuthLink = Awaited<ReturnType<typeof AuthRequest.getMailAuthLink>>

export function useMailAuthLink(nftModel?: string) {
  return useMutation<
    ISuccessResponseAuthMailAuthLink,
    BaseError,
    Omit<IPostMailAuthLink, "nftModelId">
  >(authKeys.mail(nftModel), (variables) =>
    AuthRequest.getMailAuthLink({ ...variables, nftModelId: nftModel })
  )
}

export function useLogout() {
  const [currentUser, setAuthData] = useAuth(getCurrentUser, shallow)

  const { logout: logoutMutation } = useAuth0()

  return useMutation<void, BaseError, void>(
    authKeys.me(),
    (variables) => logoutMutation({ logoutParams: { returnTo: window?.location?.origin } }),
    {
      onSuccess() {
        setAuthData(undefined)
      },
    }
  )
}
