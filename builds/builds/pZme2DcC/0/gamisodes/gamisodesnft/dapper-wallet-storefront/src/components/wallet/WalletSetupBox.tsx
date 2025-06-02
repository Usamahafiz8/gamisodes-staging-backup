import Link from "next/link"
import { useCallback, useMemo } from "react"
import { useWalletContext } from "src/hooks/useWalletContext"
import { Loading } from "src/icon/Loading"
import { useLogout } from "src/services/auth/hooks"
import Button from "src/ui/Button"
import * as Sentry from "@sentry/nextjs"
import { SERVER_TAG, EServerType } from "src/lib/const"

type WalletSetupBoxProps = {
  text: string | JSX.Element
  buttonText?: string
  isLoading: boolean
  error?: Error
  onClick?: () => void
}

export const WalletSetupBox = ({
  text,
  buttonText = '',
  isLoading,
  error,
  onClick,
}: WalletSetupBoxProps) => {
  useMemo(() => error && console.error(error), [error])

  const { signOut: signOutWallet } = useWalletContext()
  const { isLoading: isAuthLoading, mutateAsync } = useLogout()

  const logout = useCallback(async function () {
    if (SERVER_TAG === EServerType.PREPORD) {
      Sentry.setUser(null);
    }
    localStorage.removeItem('filter')
    await Promise.all([mutateAsync(), signOutWallet()])
  }, [])

  if (isLoading || isAuthLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="font-dosis text-center text-lg pb-4">
        Something went wrong. Please try again later!
      </div>
    )
  }

  return (
    <>
      {buttonText !== "View My Collection" && (<div className="flex flex-col gap-2 max-w-[270px] mb-3">
        <Link href={`/collection`}>
          <Button className="text-white">View My Collection</Button>
        </Link>
        <button
          onClick={logout}
          className="mt-2 uppercase font-dosis font-bold text-base p-2 px-16 text-white bg-black rounded-[5px]"
        >
          Sign Out
        </button>
      </div>)}
      <div className="font-dosis font-bold text-xl text-center mx-3 pb-4 lg:px-0">{text}</div>
      {buttonText && onClick &&
        (<div className="flex flex-col gap-2 max-w-[270px]">
          <button
            className="uppercase font-dosis font-bold text-base p-2 px-5 text-white transition-colors bg-header hover:bg-purple rounded-[5px]"
            onClick={onClick}
          >
            {buttonText}
          </button>
          {buttonText === "View My Collection" && (<button
            onClick={logout}
            className="mt-2 uppercase font-dosis font-bold text-base p-2 px-16 text-white bg-black rounded-[5px]"
          >
            Sign Out
          </button>)}
        </div>)}
    </>
  )
}
