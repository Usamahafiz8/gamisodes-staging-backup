import moment from "moment"
import Link from "next/link"
import { memo, useMemo } from "react"
import Button from "src/ui/Button"
import TextBellowButton from "../TextBellowButton"

type WrapperGatewayButtonProps = {
  openWrapper: () => void
  transferIsLoading: boolean
  transferIsSuccess: boolean
  selectedEditionNumber: number
  unPackagingDate: string
  nftEditionsCounter: number
  successRedirectLink: string
}

function WrapperGatewayButton({
  openWrapper,
  transferIsLoading,
  transferIsSuccess,
  selectedEditionNumber,
  unPackagingDate,
  nftEditionsCounter,
  successRedirectLink,
}: WrapperGatewayButtonProps) {
  const isBlockedByTime = useMemo(() => {
    return unPackagingDate ? !moment().isSameOrAfter(unPackagingDate) : false
  }, [unPackagingDate])

  const revealDate = useMemo(() => {
    return moment(unPackagingDate).format("MMM Do YY")
  }, [unPackagingDate])

  if (transferIsSuccess) {
    return (
      <Link href={successRedirectLink}>
        <Button className="text-white">
          Click here to see your's new NFT
        </Button>
      </Link>
    )
  }

  return (
    <>
      <Button
        onClick={openWrapper}
        isLoading={transferIsLoading}
        disabled={
          //if some NFT is delivering right now
          transferIsLoading ||
          //if not selected at all
          selectedEditionNumber === null ||
          //if selected edition number is in minting process
          selectedEditionNumber === 0 ||
          //if this NFT should be open after specific time period
          isBlockedByTime
        }
        className="text-white"
      >
        {transferIsLoading ? "Opening" : "Click to open"}
      </Button>
      <TextBellowButton transferIsLoading={transferIsLoading} nftEditionsCounter={nftEditionsCounter} isBlockedByTime={isBlockedByTime} />
      {isBlockedByTime && (
        <p className="pt-2">{`Please, wait for the reveal date ${revealDate}`}</p>
      )}
    </>
  )
}

export default memo(WrapperGatewayButton)
