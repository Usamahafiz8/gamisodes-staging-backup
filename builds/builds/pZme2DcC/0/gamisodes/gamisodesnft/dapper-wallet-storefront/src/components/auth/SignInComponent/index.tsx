import { useAuth0 } from "@auth0/auth0-react"
import Image from "next/image"
import { memo } from "react"
import img from "src/icon/android-chrome-192x192.png"

function SignInComponent() {
  const { loginWithRedirect } = useAuth0()

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="min-w-[210px] gap-2 cursor-pointer flex justify-center px-6 items-center py-3 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow-lg outline-none hover:border-header focus:outline-none"
    >
      <Image src={img.src} width={25} height={25} alt="Logo Gamisodes" />
      <span>Sign in to Gamisodes</span>
    </button>
  )
}

export default memo(SignInComponent)
