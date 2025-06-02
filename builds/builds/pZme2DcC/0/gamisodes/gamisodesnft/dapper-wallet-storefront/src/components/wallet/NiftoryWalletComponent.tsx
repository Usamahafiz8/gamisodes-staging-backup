import { memo } from "react"
import { useGetNiftoryBlockchainNFT } from "src/services/blockchain/hooks"
import TransferDapperToCustodial from "./TransferDapperToCustodial"

interface INiftoryWalletComponent extends React.PropsWithChildren {
  title: string
  walletAddress?: string
}

const NiftoryWalletComponent: React.FC<INiftoryWalletComponent> = ({
  title,
  walletAddress,
  children,
}) => {
  const { data: dapperWallet, isFetching } = useGetNiftoryBlockchainNFT(
    { dapperWallet: walletAddress },
    { enabled: !!walletAddress }
  )

  return (
    <div className="text-base border border-[#9500CA] p-6 flex content-between flex-wrap gap-4 lg:w-[640px] w-screen-sm mb-4 lg:mx-0">
      <div className="font-dosis font-bold">
        {title}{" "}
        <span className="font-normal">
          {isFetching ? "..." : `${dapperWallet?.items?.length} Items total`}
        </span>
      </div>
      <div className="min-w-full font-normal flex items-start justify-between flex-col gap-1 lg:px-0 lg:pb-0 lg:flex-row lg:gap-4">
        <p>Flow address: </p>
        <p>
          <i>{walletAddress}</i>
        </p>
      </div>
      {children}
    </div>
  )
}

const DapperComponent: React.FC<INiftoryWalletComponent> = (props) => {
  return (
    <NiftoryWalletComponent {...props}>
      <TransferDapperToCustodial />
      <p className="font-normal">
        * It may take several hours for items to reappear in your Gamisodes My Collection viewer
      </p>
    </NiftoryWalletComponent>
  )
}

export default Object.assign(memo(NiftoryWalletComponent), {
  Dapper: DapperComponent,
})
