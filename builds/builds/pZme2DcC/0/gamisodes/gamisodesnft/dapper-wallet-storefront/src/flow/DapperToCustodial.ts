export const DAPPER_TO_CUSTODIAL = `import Gamisodes from ${process.env.NEXT_PUBLIC_GAMISODES_CONTRACT_ADDRESS}
import NonFungibleToken from ${process.env.NEXT_PUBLIC_NFT_ADDRESS}

transaction(recipient: Address, maxNumToTransfer: Int) {
  let Collection: &Gamisodes.Collection
  let Recipient: &{NonFungibleToken.Receiver}

  prepare(signer: AuthAccount) {
    self.Collection = signer.borrow<&Gamisodes.Collection>(from: Gamisodes.COLLECTION_STORAGE_PATH)
                          ?? panic("This wallet does not have a Gamisodes Collection set up.")
    self.Recipient = getAccount(recipient).getCapability(Gamisodes.COLLECTION_PUBLIC_PATH)
                        .borrow<&{NonFungibleToken.Receiver}>()
                        ?? panic("The recipient does not have a Gamisodes Collection set up.")
  }

  execute {
    for i, id in self.Collection.getIDs() {
      self.Recipient.deposit(token: <- self.Collection.withdraw(withdrawID: id))
      // don't transfer more than maxNumToTransfer to prevent gas limit problems
      if i == maxNumToTransfer {
        break
      }
    }
  }
}`
