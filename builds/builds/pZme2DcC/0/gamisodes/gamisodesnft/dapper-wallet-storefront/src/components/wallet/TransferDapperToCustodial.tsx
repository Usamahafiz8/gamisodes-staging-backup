import { useWalletByIdQuery } from "generated/graphql"
import { memo, useEffect, useMemo } from "react"
import { Loading } from "src/icon/Loading"
import {
  useGetNiftoryBlockchainNFT,
  useTransferFromDapperToCustodial,
} from "src/services/blockchain/hooks"
import { getCurrentUser, useAuth } from "src/store/users"
import Button from "src/ui/Button"
import { shallow } from "zustand/shallow"

function wrappedFunction<T>(WrappedComponent: React.ComponentType<T>) {
  return function HOCProtector(props): JSX.Element {
    const [user] = useAuth(getCurrentUser, shallow)

    const { data, isSuccess, isError } = useGetNiftoryBlockchainNFT(
      { dapperWallet: user?.wallet?.address },
      { enabled: !!user?.wallet?.address }
    )

    if (isError || !user?.wallet?.address) {
      return <></>
    }
    if (isSuccess) {
      if (data?.items?.length > 0) return <WrappedComponent {...props} />
      return <></>
    }

    return (
      <div className="flex items-center">
        <Loading /> Checking information from your Dapper wallet...{" "}
      </div>
    )
  }
}

// const NFTS_TO_MINT = 0

const QUANTITY_TO_MINT = 325

function TransferDapperToCustodial() {
  const [user] = useAuth(getCurrentUser, shallow)

  const custodialWallet = user?.custodialWallet
  const { data: walletByid } = useWalletByIdQuery(
    { id: custodialWallet.niftoryWalletId },
    { enabled: !!custodialWallet?.niftoryWalletId }
  )
  const { data: niftoryWallet, isFetching } = useGetNiftoryBlockchainNFT(
    { dapperWallet: user?.wallet?.address },
    { enabled: !!user?.wallet?.address }
  )

  const NFTS_TO_MINT =
    niftoryWallet?.items?.length <= QUANTITY_TO_MINT
      ? niftoryWallet?.items?.length - 1
      : QUANTITY_TO_MINT - 1

  const { isLoading, mutate, status, isError, error } = useTransferFromDapperToCustodial()

  useEffect(() => {
    if (isError && error) {
      console.error("Send this to administrator: ", error)
    }
  }, [isError, error, status])

  const buttonText = useMemo(() => {
    const callToAction = `Click PROCEED to transfer ${NFTS_TO_MINT + 1} / ${
      isFetching ? "..." : niftoryWallet?.items?.length
    } Items from Dapper to Gamisodes`

    const objectMsg = {
      success: callToAction,
      loading: (
        <div className="flex items-center">
          <Loading size="small" />
          Loading...
        </div>
      ),
      error: "Something went wrong. Please, contact with our administrator",
      idle: callToAction,
    }
    if (niftoryWallet?.items?.length > 0) return objectMsg[status]
    return "Successfully transferred"
  }, [status, NFTS_TO_MINT, niftoryWallet?.items?.length, isFetching])

  return (
    <>
      <div className="h-[1px] w-full bg-header" />
      <div className="flex flex-col gap-2 justify-start items-start">
        <Button
          className="text-white"
          disabled={
            !custodialWallet?.niftoryWalletId ||
            isLoading ||
            isError ||
            isFetching ||
            NFTS_TO_MINT > niftoryWallet?.items?.length - 1
          }
          onClick={() => {
            mutate({
              custodialWalletAddress: walletByid?.walletById?.address,
              nftsToMint: NFTS_TO_MINT,
            })
          }}
        >
          Proceed
        </Button>
        <p className="font-dosis text-lg text-left flex flex-col lg:flex-row items-start lg:items-center gap-2">
          <strong>Process:{"  "}</strong> <i className="font-normal">{buttonText}</i>
        </p>
      </div>
    </>
  )
}
export default wrappedFunction(memo(TransferDapperToCustodial))
