import { Text } from "@chakra-ui/react"
import Link from "next/link"
import { EErrorIdentity } from "src/typings/NftModelDetail"
import UIButton from "src/ui/Button"
import useCheckout from "../checkout/CheckoutProvider"
import Free from "./Free"
import Paid from "./Paid"

export interface IBuyButton {
  nftAvailableToBuy: number
  errorState?: string
}
type BuyButtonProps = {
  checkoutStatusMessages: string[]
  nftAvailableToBuy: number
}
export function NftBuyButton({ checkoutStatusMessages, nftAvailableToBuy }: BuyButtonProps) {
  const { checkout, error, checkoutProgress } = useCheckout()
  if (nftAvailableToBuy > 0)
    return (
      <>
        <p className="font-dosis text-lg mb-3">{checkoutStatusMessages[checkoutProgress]}</p>
        <UIButton
          disabled={error && error === EErrorIdentity.NFT_LIMIT_REACHED}
          isLoading={checkoutProgress > 0}
          onClick={checkout}
          className="w-fit"
        >
          Checkout
        </UIButton>
      </>
    )
  return (
    <UIButton className="w-fit" disabled>
      <Text>Not Available</Text>
    </UIButton>
  )
}

export function UnauthorizedStatus() {
  return (
    <>
      <p className="font-dosis text-lg mb-3">
        The proceed with checkout, please Sign In. If you've already signed in, please refresh this
        page.
      </p>
      <Link href="/sign-in">
        <UIButton>Sign In</UIButton>
      </Link>
    </>
  )
}

function Button() {
  throw new Error(`It's not a component!`)
}

export default Object.assign(Button, { Paid, Free })
