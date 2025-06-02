import * as fcl from "@onflow/fcl"
import { DavisCollection } from "src/const/GamisodesCollection"
import { DAPPER_TO_CUSTODIAL } from "src/flow/DapperToCustodial"
import { EServerType, SERVER_TAG } from "src/lib/const"
import { FlowCollections } from "src/lib/flowConnector"
function waitforme(millisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("")
    }, millisec)
  })
}

const flow = FlowCollections.create()

const AVAILABLE_LIST = [EServerType.PREPORD, EServerType.PRODUCTION]

export const BlockchainRequest = {
  async getList(wallet: string) {
    if (process.env.NODE_ENV === "development") {
      await waitforme(3000)
      return DavisCollection
    } else if (AVAILABLE_LIST.includes(SERVER_TAG)) {
      const response = await flow.getCollectionsData(
        wallet,
        process.env.NEXT_PUBLIC_COLLECTION_PATH.split(";")
      )
      return response["GamisodesCollection"]
    }
    console.log("not available")
    return []
  },
  async getMagicWalletNFTSFromBlockchain(magicWalletAddress: string) {
    const listToArray = process.env.NEXT_PUBLIC_NIFTORY_GAMISODES_PATH.split(";")
    const response = await flow.getCollectionsData(magicWalletAddress, listToArray)
    return response[listToArray[0]]
  },

  async getNiftoryNFTSFromDapper(dapperWallet: string) {
    const listToArray = process.env.NEXT_PUBLIC_NIFTORY_GAMISODES_PATH.split(";")
    const response = await flow.getCollectionsData(dapperWallet, listToArray)
    return response[listToArray[0]]
  },
  /**
   *
   * @param custodialWalletAddress - Niftory custodial wallet
   * @param nftsToMint - might start from **0**
   */
  async transferNFTFromDapperToCustodial(custodialWalletAddress: string, nftsToMint: number = 0) {
    const transactionId = await fcl.mutate({
      cadence: DAPPER_TO_CUSTODIAL,
      args: (arg, t) => [arg(custodialWalletAddress, t.Address), arg(nftsToMint, t.Int)],
      proposer: fcl.currentUser as any,
      payer: fcl.currentUser as any,
      authorizations: [fcl.currentUser as any],
      limit: 9999,
    })
    const transaction = await fcl.tx(transactionId).onceSealed()
    return transaction
  },
}
