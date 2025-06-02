import {
  useGetBlockchainNFT,
  useGetMagicWalletNFTSFromBlockchain,
} from "src/services/blockchain/hooks"
import { useAuth } from "src/store/users"

export function useGetFromBlockchain() {
  const { user } = useAuth()
  const query = useGetBlockchainNFT(
    {
      wallet: user?.magicWallet?.address ?? "",
    },
    {
      enabled: !!user?.magicWallet?.address,
      networkMode: "offlineFirst",
      refetchInterval: 1000 * 60 * 10, // every 10 minutes,
    }
  )
  return query
}

export function useGetMagicWalletBlockchain() {
  const { user } = useAuth()
  const query = useGetMagicWalletNFTSFromBlockchain(
    {
      magicWalletAddress: user?.magicWallet?.address ?? "",
    },
    {
      enabled: !!user?.magicWallet?.address,
      networkMode: "offlineFirst",
      refetchInterval: 1000 * 60 * 10, // every 10 minutes,
    }
  )
  return query
}
