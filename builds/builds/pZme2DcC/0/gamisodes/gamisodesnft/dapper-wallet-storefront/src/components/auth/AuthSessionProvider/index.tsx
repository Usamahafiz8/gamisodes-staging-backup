import { PropsWithChildren, memo } from "react"
import { useGetMyAuthStatus } from "src/services/auth/hooks"

type SessionProviderProps = PropsWithChildren

function SessionProvider({ children }: SessionProviderProps) {
  useGetMyAuthStatus({})

  return <>{children}</>
}

export default memo(SessionProvider)
