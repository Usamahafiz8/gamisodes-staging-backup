import { PropsWithChildren } from "react"
import AppLayout from "src/components/AppLayout"
import SignInComponent from "src/components/auth/SignInComponent"
import { MetaTags } from "src/components/general/MetaTags"
import img from "src/icon/android-chrome-192x192.png"
import { EAuthStatus, getAuthStatus, useAuth } from "src/store/users"
import { SectionHeader } from "src/ui/SectionHeader"
type AuthGuardProps = PropsWithChildren & {
  isActive: boolean
}

function AuthGuard({ children, isActive = false }: AuthGuardProps) {
  const status = useAuth(getAuthStatus)

  if (!isActive || status === EAuthStatus.AUTHENTICATE) {
    return <>{children}</>
  }

  if (status === EAuthStatus.UNAUTHENTICATED) {
    return (
      <>
        <MetaTags />
        <AppLayout>
          <section className="mx-auto text-black">
            <SectionHeader text={<><span className="block">You need to Sign In </span><span className="block">to Collect with Gamisodes</span></>} />
            <div className="flex flex-col justify-center items-center">
              <SignInComponent />
            </div>
          </section>
        </AppLayout>
      </>
    )
  }

  return (
    <>
      <MetaTags />
      <AppLayout>
        <section className="mx-auto text-black">
          <SectionHeader text="Loading user..." />
        </section>
      </AppLayout>
    </>
  )
}

export default AuthGuard
